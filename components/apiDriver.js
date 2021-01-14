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
    }
}

module.exports = e;