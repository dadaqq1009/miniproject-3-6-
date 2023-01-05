const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const {Op} = require('sequelize');
const {Cloth} = require('../models');
const {Guest} = require('../models');
const authMiddleWare = require("../middlewares/auth-middleware");

const app = express();
app.use(cookieParser());



    router.get('/mypage/guest', async (req, res) => {
    const  guestId =  String( req.query.login_id )

    // const guestName = res.locals.guest.login_id
    

    try {
        const guest = await Guest.findOne({
          where: { login_id : guestId },
        });
        
        const guestName = guest.guest_name
        const guestPoint = guest.guest_point
        const guest_id = guest.guest_id

        const cloth = await Cloth.findAll({where: { guest_id: guest_id, status : {[Op.notIn]: ["리뷰중", "리뷰완료" ]} }});

        //status : { [Op.or]: {[Op.eq]:"대기중", [Op.eq]:"수거중",[Op.eq]:"수거완료",[Op.eq]: "배송중", [Op.eq]:"배송완료"}} 
        
        
        // "cloth":cloth
        return res.json({"guestName" : guestName, "guestPoint" : guestPoint, "cloth": cloth });
      } catch (err) {
        return res.status(400).send({ errorMessage: "실패하였습니다." });
      }
    });
    
    module.exports = router;
