const bodyParser = require('body-parser');
const app = require('express')();
var http = require('http');
var httpServer = http.createServer(app);
module.exports = { path: '/api', handler: app };
let dbd = require('./dbd.js');
var svnc = require('simplevnc');

app.use(bodyParser.json());

let wrapper = (data)=>({done: !!data, code: !!data?200:500, data});

var server = new svnc.Server(httpServer);
server.on('connect', function(client){
  console.log('svnc client connected');
})
server.on('disconnect', function(client){
  console.log('svnc client disconnected');
})
server.on('error', function(err){
  console.error('svnc error', err)
})

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

app.get('/pm2/logs', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.pm2.process.logs(req.query.pname, req.query.lines) );
    return next();
});

// NGINX

app.post('/nginx/start', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.nginx._get.start() );
    return next();
});

app.post('/nginx/stop', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.nginx._get.stop() );
    return next();
});

app.post('/nginx/restart', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.nginx._get.restart() );
    return next();
});

app.get('/nginx/params', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.nginx.getParams() );
    return next();
});

app.get('/nginx/config', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.nginx.getConfig() );
    return next();
});

app.post('/nginx/config', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.nginx.writeConfig( req.body.content ) );
    return next();
});

app.get('/nginx/status', async (req,res,next)=>{
    req.wrapped = wrapper( await dbd.nginx.status() );
    return next();
});

// Settings

app.get('/settings', (req,res,next)=>{
    req.wrapped = wrapper( dbd.config.settings.get() );
    return next();
});

app.use((req,res)=>{
    return res.status(req.wrapped.code).send(req.wrapped.done?req.wrapped.data:"error_occurred");
});