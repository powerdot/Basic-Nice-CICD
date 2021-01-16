let fs = require("fs");
let path = require("path");
const pm2Client = require("pm2");
const { spawnSync, spawn, exec } = require('child_process');
const readLastLines = require('read-last-lines');


/* Configuration driver */

let config = {
    dir: path.join(__dirname, "../cicd.config.json"),
    read: ()=>JSON.parse(fs.readFileSync(config.dir, {encoding: 'utf-8'})),
    write: function(key, value){
        let data = this.read();
        data[key] = value;
        fs.writeFileSync(this.dir, JSON.stringify(data), {encoding: 'utf-8'});
        return data;
    },
    project: {
        list: async ()=>{
            let pm2_list = await pm2.process.list();
            let projects = config.read().projects;
            for(let project_id in projects){
                let project = projects[project_id];
                project.info = {};
                project.info.pm2 = pm2_list.find(x=>x.name==project.pm2);
            }
            return projects;
        },
        add: async function(id, _new){
            let projects = await this.list();
            projects[id] = _new;
            config.write('projects', projects);
            return true;
        },
        update: async function(id, values){
            let projects = await this.list();
            projects[id] = values;
            config.write('projects', projects);
            return projects[id];
        },
        remove: async function(id){
            let projects = await this.list();
            delete projects[id];
            config.write('projects', projects);
            return projects;
        }
    },
    settings: {
        get: ()=>config.read().system,
        update: function(values){
            config.write('settings', values);
            return values;
        },
        updateOne: function(key, value){
            let settings = this.get();
            settings[key] = value;
            config.write('settings', settings);
            return settings;
        },
        getPassword: ()=>config.settings.get().password,
    }
};




/* PM2 */
let pm2 = {
    _get: {
        connect: function(){
            return new Promise(function(resolve){
                pm2Client.connect((err)=>{
                    if (err) {
                        console.error("PM2:", e);
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
        },
        list: async function(){
            await this.connect();
            return new Promise((resolve)=>{
                pm2Client.list((err, list) => {
                    if(err) {
                        console.error("PM2:", err)
                        return resolve(false)
                    }
                    resolve(list);
                })
            });
        },
        restart: async function(pname){
            await this.connect();
            return new Promise((resolve)=>{
                pm2Client.restart(pname,(err) => {
                    if(err) {
                        console.error("PM2:", err)
                        return resolve(false)
                    }
                    resolve(true);
                })
            });
        },
        stop: async function(pname){
            await this.connect();
            return new Promise((resolve)=>{
                pm2Client.stop(pname,(err) => {
                    if(err) {
                        console.error("PM2:", err)
                        return resolve(false)
                    }
                    resolve(true);
                })
            });
        },
        start: async function(script_path, name){
            await this.connect();
            return new Promise((resolve)=>{
                pm2Client.start({name: name, script: script_path}, (err) => {
                    if(err) {
                        console.error("PM2:", err)
                        return resolve(false)
                    }
                    resolve(true);
                })
            });
        },
        logs: async function(name, lines=1000){
            await this.connect();
            return new Promise((resolve)=>{
                pm2Client.describe(name, async (err, data) => {
                    if(err) {
                        console.error("PM2:", err)
                        return resolve(false)
                    }
                    let process = data[0];
                    if(!process) return resolve(false);
                    let log_file_path = process.pm2_env.pm_out_log_path;
                    let errlog_file_path = process.pm2_env.pm_err_log_path;
                    let logs = await readLastLines.read(log_file_path, lines);
                    let errlogs = await readLastLines.read(errlog_file_path, lines);
                    resolve({
                        err: {
                            path: errlog_file_path,
                            data: errlogs
                        },
                        out: {
                            path: log_file_path,
                            data: logs
                        },
                        lines
                    });
                })
            });
        }
    },
    process: {
        list: async function(){
            return await pm2._get.list();
        },
        restart: async function(pname){
            return await pm2._get.restart(pname);
        },
        stop: async function(pname){
            return await pm2._get.stop(pname);
        },
        start: async function(script_path, pname){
            return await pm2._get.start(script_path, pname);
        },
        logs: async function(pname, lines){
            return await pm2._get.logs(pname, lines);
        }
    }
};





/* NGINX */
let nginx = {
    _get: {
        version: function(){
            return new Promise(function(resolve){
                exec("nginx -V 2>&1", (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return resolve(false);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return resolve(false);
                    }
                    return resolve(stdout);
                });
            });
        },
        parseParams: function(version_string){
            if(!version_string) return false;
            let p = version_string.split('--');
            let params = {
                version: p[0].replace('arguments: ', ''),
                arguments: {}
            }
            for(let i=1; i<p.length; i++) params.arguments[p[i].split('=')[0].trim().replace('\\n','')] = (p[i].split('=')[1]||"").trim()||true ;
            return params;
        },
        start: function(){
            return new Promise(function(resolve){
                exec("sudo nginx", (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return resolve(false);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return resolve(false);
                    }
                    return resolve(true);
                });
            });
        },
        restart: function(){
            return new Promise(function(resolve){
                exec("sudo nginx -s reload", (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return resolve(false);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return resolve(false);
                    }
                    return resolve(true);
                });
            });
        },
        stop: function(){
            return new Promise(function(resolve){
                exec("sudo nginx -s stop", (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return resolve(false);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return resolve(false);
                    }
                    return resolve(true);
                });
            });
        },
        processList: function(){
            return new Promise(function(resolve){
                exec("ps aux | grep nginx", (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return resolve(false);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return resolve(false);
                    }
                    return resolve(stdout);
                });
            });
        }
    },
    getParams: async function(){
        let params = this._get.parseParams( await this._get.version() );
        return params;
    },
    getConfigPath: async function(){
        let params = this._get.parseParams( await this._get.version() );
        return params.arguments['conf-path'];
    },
    getConfig: async function(){
        let p = await this.getConfigPath();
        let content = fs.readFileSync(p, {encoding: 'utf-8'});
        return content;
    },
    writeConfig: async function(content){
        let p = await this.getConfigPath();
        fs.writeFileSync(p, content, {encoding: 'utf-8'});
        return content;
    },
    status: async function(){
        let list = await nginx._get.processList();
        let status = {
            active: false,
            list: []
        };
        status.active = list.includes("root") && list.includes("nginx: master");
        status.list = list.split('\n').filter(x=>!!x); // temp
        return status;
        let splitted = list.split('\n').filter(x=>!!x);
        for(let l of splitted){
            if(!l) continue;
            let values = l.split(/\s\s+/g);
            let columns = ['USER','PID','CPU','MEM','VSZ','RSS','TTY','STAT', 'STARTED','TIME','COMMAND']
            let row = {};
            for(let c_i in columns) row[columns[c_i]] = values[c_i];
            status.list.push(row)
        }
        return status;
    }
};


(async ()=>{
    // let x = await nginx.getConfigPath();
    // console.log("getConfigPath:", x);
    // let x = await nginx._get.restart();
    // console.log('output:', x);
    // let x = await nginx.getConfig();
    // console.log('output:', x);
    // let x = await nginx._get.processList();
    // console.log("output:", x);
    // let x = await nginx.status();
    // console.log("output:", x);
    // let x = await pm2._get.logs("easyren");
    // console.log("output:", x);
})();






let e = {
    config,
    pm2,
    nginx
};

module.exports = e;