const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const {Op} = require('sequelize');
const {Cloth} = require('../models');
const {Guest} = require('../models');
const authMiddleWare = require("../middlewares/auth-middleware");
const app = express();
app.use(cookieParser());

// 손님이 [세탁물 상태]를 볼 수 있는 페이지
router.get('/order/status/guest',async (req, res) => {
    const guestId = String(req.query.login_id);
    // const {status} = req.body;
    try {
        const guest = await Guest.findOne({
          where: { login_id : guestId },
        });
        const guestPk = guest.guest_id;
        const cloth = await Cloth.findOne({where: {guest_id : guestPk, status : {[Op.notIn]: ["리뷰중", "리뷰완료"]}}});
        const clothStatus = cloth.status;

        return res.json({"clothStatus" : clothStatus});
      } catch (err) {
        return res.status(400).send({ errorMessage: "실패하였습니다." });
      }
    });

    router.put('/order/status/guest',async (req, res) => {
      const guestId = String(req.query.login_id);
      const {status} = req.body;

      try {
          const guest = await Guest.findOne({
            where: { login_id : guestId },
          });
          const guestPk = guest.guest_id;
          const cloth = await Cloth.findOne({where: {guest_id : guestPk, status : {[Op.in]: ["배송완료"]}, owner_id : {[Op.not]: null}}});
          console.log(1111)
          console.log(cloth)
          await cloth.update( {status: status});
  
          return res.json({"message": "이용해주셔서 감사합니다!"});
        } catch (err) {
          return res.status(400).send({ errorMessage: "실패하였습니다." });
        }
      });
    
    module.exports = router;