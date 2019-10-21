const axios = require('axios');
const phisGlobals = require('../config/phisGlobals');

module.exports = class PhisLoginHandler {

    constructor () {
        this.session_token = null;
    }

    async getSessionToken () {
        if (this.sessionToken) {
            return this.sessionToken;
        } else {
            console.log("No SessionToken... attempting login")
            await this.login();
        }
        return this.sessionToken;
    }

    async login (username = phisGlobals.PHIS_USER, password = phisGlobals.PHIS_PASSWORD) {
        this.sessionToken = (await axios.get(phisGlobals.LOGIN_BASE_URL, {
            params: {
                username : username,
                password : password
            }
        })).data.session_token;
    }
}

