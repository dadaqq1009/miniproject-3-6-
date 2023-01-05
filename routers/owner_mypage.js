const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const {Op} = require('sequelize');
const {Owner} = require('../models');
const {Guest} = require('../models');
const {Cloth} = require('../models');
const authMiddleWare = require("../middlewares/auth-middleware");

const app = express();
app.use(cookieParser());



router.get('/mypage/owner', async (req, res) => {
    const  ownerId =  String( req.query.login_id )

    // const guestName = res.locals.guest.login_id
    

    try {
        const owner = await Owner.findOne({
          where: { login_id : ownerId },
        });
        
        const ownerName = owner.owner_name
        const ownerPoint = owner.owner_point
        const owner_id = owner.owner_id
        const cloth = await Cloth.findAll({where: { owner_id: owner_id , status : {[Op.notIn]: ["리뷰중", "리뷰완료", "배송완료"]} }})
    
        return res.json({"ownerName" : ownerName, "ownerPoint" : ownerPoint, "cloth" : cloth});
      } 
      catch (err) {
        return res.status(400).send({ errorMessage: "실패하였습니다." });
      }
    });
    
    module.exports = router;