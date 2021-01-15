const bodyParser = require('body-parser');
const app = require('express')();
module.exports = { path: '/api', handler: app };
let dbd = require('./dbd.js');

app.use(bodyParser.json());

let wrapper = (data)=>({done: !!data, code: !!data?200:500, data});

// Auth
app.use((req,res,next)=>{
    if(req.headers.bncicdpassword == dbd.config.settings.getPassword()) return next();
    return res.status(403).send("Unauthorized");
});

// Project

app.get('/project/list', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.config.project.list() );
    return next();
});

// PM2

app.get('/pm2/list', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.pm2.process.list() );
    return next();
});

app.post('/pm2/restart', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.pm2.process.restart( req.body.pname ) );
    return next();
});

app.post('/pm2/stop', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.pm2.process.stop( req.body.pname ) );
    return next();
});

app.post('/pm2/start', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.pm2.process.start( req.body.script_path, req.body.pname ) );
    return next();
});

// Settings

app.get('/settings', (req,res,next)=>{
    req.wrapped = wrapper( dbd.config.settings.get() );
    return next();
});

app.use((req,res)=>{
    return res.status(req.wrapped.code).send(req.wrapped.done?req.wrapped.data:"error_ocured");
});