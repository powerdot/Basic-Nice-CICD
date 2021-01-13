const bodyParser = require('body-parser');
const app = require('express')();
module.exports = { path: '/api', handler: app };

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    return res.send("api ok");
})