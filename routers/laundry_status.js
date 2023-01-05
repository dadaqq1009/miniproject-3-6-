const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Cloth} = require('../models');
const {Owner} = require('../models');

router.put('/laundry/status/owner', async (req, res) => {
    const  ownerId =  String( req.query.login_id )
    const {status} = req.body;

    try {
        const owner = await Owner.findOne({
          where: { login_id : ownerId },
        });
        const ownerPk = owner.owner_id

        const cloth = await Cloth.findOne({where: {owner_id : ownerPk , status : {[Op.notIn]: ["리뷰중", "리뷰완료", "배송완료"]}  }});
        await cloth.update( {status: status});

        return res.json({"message": "세탁물 상태가 변경되었습니다."});
      } 
      catch (err) {
        return res.status(400).send({ errorMessage: "실패하였습니다." });
      }
    });
    
  


  module.exports = router;