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

app.get('/project/list', (req,res,next)=>{
    req.wrapped = wrapper( dbd.config.project.list() );
    return next();
});

app.get('/settings', (req,res,next)=>{
    req.wrapped = wrapper( dbd.config.settings.get() );
    return next();
});

app.use((req,res)=>{
    return res.status(req.wrapped.code).send(req.wrapped.done?req.wrapped.data:"error_ocured");
});