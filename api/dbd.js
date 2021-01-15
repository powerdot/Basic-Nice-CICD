let fs = require("fs");
let path = require("path");
const pm2Client = require("pm2");


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
        list: ()=>config.read().projects,
        add: function(id, _new){
            let projects = this.list();
            projects[id] = _new;
            config.write('projects', projects);
            return true;
        },
        update: function(id, values){
            let projects = this.list();
            projects[id] = values;
            config.write('projects', projects);
            return projects[id];
        },
        remove: function(id){
            let projects = this.list();
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




/*  */
let pm2 = {
    _get: {
        connect: function(){
            return new Promise(function(resolve){
                pm2Client.connect(function(err) {
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
            return new Promise(function(resolve){
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
            return new Promise(function(resolve){
                pm2Client.restart(pname,(err) => {
                    if(err) {
                        console.error("PM2:", err)
                        return resolve(false)
                    }
                    resolve(true);
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
        }
    }
};




// pm2Client.connect(function(err) {
//     if (err) {
//         console.error("PM2:", e)
//         process.exit(2);
//     }

//     pm2Client.restart("easyren", function(e){
//         if(e) return console.error("PM2:", e)
//     });

//     pm2Client.list((e, list) => {
//         if(e) return console.error("PM2:", e)
//         console.log('list:',list)
//     })
// });




let e = {
    config,
    pm2
};

module.exports = e;