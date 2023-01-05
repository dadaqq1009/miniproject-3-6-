const GuestLoginService = require("../services/guest_login.service");

class GuestLoginController {
    guestLoginService = new GuestLoginService();

    guestLogin = async (req,res) => {
        const { login_id, login_pw } = req.body;
        
        try {
            const guest = await Guest.findOne({
            where: { login_id },
            });
            
            const pwCheck = await bcrypt.compare(login_pw,guest.login_pw);
        
            if (!guest || !pwCheck) {
            return res
                .status(412)
                .send({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
            }
        
            const token = jwt.sign(
            { login_id: login_id, guest_id: guest.guest_id },
            SECRET_KEY,
            {
                expiresIn: "1h",
            }
            );
        
            res.cookie("token", token);
        
            return res.json({ "token": token });
        } catch (err) {
            return res.status(400).send({ errorMessage: "로그인에 실패하였습니다." });
        }
        };
        }
        
        
        
        module.exports = GuestLoginController;




    


