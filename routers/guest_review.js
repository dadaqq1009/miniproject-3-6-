const express = require("express");
const router = express.Router();
const {Op} = require('sequelize');
const {Review} = require("../models");
​
​
router.post('/guest/review',async (req, res) => {
    try { 
        const { guest_id, owner_id, rate, comment } = req.body; //데이터 들고오는 것
    //    const guestId = req.params.guestId;
        console.log(guest_id, owner_id, rate, comment);
        // const guest = await Guest.findOne({where : {guest_id : guestId}}); //guestid값인걸 하나 찾아서 가져오겠다
        const viewReview = await Review.create({guest_id, owner_id, rate, comment}); //db데이터 입력
        console.log(viewReview)
        res.status(201).send({"massage" : "리뷰 작성을 완료했습니다."});
                
      }
​
         catch (error) {
        console.error(error);
        res.status(400).send({"errorMessage":"실패하였습니다."});
        }
    });
​
module.exports = router;    