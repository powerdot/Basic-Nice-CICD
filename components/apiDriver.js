let axios = require("axios").default;

let api_link = document.location.origin + "/api";

let getToken = () => localStorage.bncicdpassword;

let route = r => api_link + (r[0] == "/" ? r : `/${r}`);

/**
 * GET-запрос к API
 * @param {*} r - route, transactions/list
 * @param {*=} params - параметры запроса
 */
async function GET(r, params, clear=true) {
    if (!params) params = {};
    try {
        let data = (await axios.get(route(r), { params, headers: {bncicdpassword: getToken()} })).data;
        if (data.done === false) {
            console.error("apiDriver error:", r, data.error);
            if(clear) return false;
            return data;
        }
        return data;
    } catch (e) {
        if(e.response.data == "access_denied" && document.location.pathname.indexOf("/login") != 0){
            document.location.href = '/login?redirect='+document.location.href;
            return;
        }
        if(clear) return false;
        return e.response.data;
    }
}

/**
 * POST-запрос к API
 * @param {*} r - route, transactions/list
 * @param {*=} params - параметры запроса
 */
async function POST(r, params, clear=true) {
    if (!params) params = {};
    try {
        let data = (await axios.post(route(r), params, {headers: {bncicdpassword: getToken()}})).data;
        if (data.done === false) {
            console.error("apiDriver error:", r, data.error);
            if(clear) return false;
            return data;
        }
        return data;
    } catch (e) {
        if(e.response.data == "access_denied" && document.location.pathname.indexOf("/login") != 0){
            document.location.href = '/login?redirect='+document.location.href;
            return;
        }
        if(clear) return false;
        return e.response.data;
    }
}

let e = {
    settings: {
        get: async()=>{
            return await GET('settings');
        }
    },
    project: {
        list: async()=>{
            return await GET('project/list');
        }
    },
    pm2: {
        list: async()=>{
            return await GET('pm2/list');
        },
        restart: async(pname)=>{
            return await POST('pm2/restart', {pname});
        },
        stop: async(pname)=>{
            return await POST('pm2/stop', {pname});
        },
        start: async(script_path, pname)=>{
            return await POST('pm2/start', {script_path, pname});
        }
    },
    nginx: {
        getParams: async()=>{
            return await GET('nginx/params');
        },
        getConfig: async()=>{
            return await GET('nginx/config');
        },
        status: async()=>{
            return await GET('nginx/status');
        },
        writeConfg: async(content)=>{
            return await POST('nginx/config', {content});
        },
        start: async()=>{
            return await POST('nginx/start');
        },
        restart: async()=>{
            return await POST('nginx/restart');
        },
        stop: async()=>{
            return await POST('nginx/stop');
        },
    }
}

module.exports = e;