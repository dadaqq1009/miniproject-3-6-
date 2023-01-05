const {Guest} = require("../models");
const GuestLoginRepository = require("../repositories/guest_login.repository");

class GuestLoginService {
    guestLoginService = new GuestLoginService(Guest);
    loginService = async (login_id,login_pw) => {
        const guestLogin = await this.guestLoginService.loginService(login_id,login_pw);
        return guestLogin;
    }
}

module.exports = GuestLoginRepository;