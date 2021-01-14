let fs = require("fs");
let path = require("path");




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
        add: function(_new){
            let projects = this.list();
            let new_project = {..._new, id: (new Date()).getTime()+"_"+Math.floor(Math.random()*999999)};
            projects.push(new_project);
            config.write('projects', projects);
            return true;
        },
        update: function(id, values){
            let projects = this.list();
            let project_index = projects.findIndex(x=>x.id==id);
            if(project_index === -1) return false;
            projects[project_index] = values;
            return projects[project_index];
        },
        remove: function(id){
            let new_projects = this.list().filter(x=>x.id!=id);
            config.write('projects', new_projects);
            return new_projects;
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



let e = {
    config
};

module.exports = e;