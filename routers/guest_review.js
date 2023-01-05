const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const {Op} = require('sequelize');
const {Review} = require("../models");
const {Guest} = require("../models");
const {Cloth} = require("../models");

const app = express();
app.use(cookieParser());

router.post('/review/guest',async (req, res) => {
    try {
        const  guestId =  String( req.query.login_id )
        const guest = await Guest.findOne({where: { login_id : guestId }})
        const guestPk = guest.guest_id
        const cloth = await Cloth.findOne({where: {guest_id : guestPk, status : "리뷰중" }});
        const owner_id = cloth.owner_id

        const { guest_id, rate, comment } = req.body; //데이터 들고오는 것
        console.log(guest_id, owner_id, rate, comment);
        const viewReview = await Review.create({guest_id, owner_id, rate, comment}); //db데이터 입력
        console.log(viewReview)
        res.status(201).send({"massage" : "리뷰 작성을 완료했습니다."});
                
      }

         catch (error) {
        console.error(error);
        res.status(400).send({"errorMessage":"실패하였습니다."});
        }
    });

    router.get('/review/guest', async (req, res) => {
        const  guestId =  String( req.query.login_id )
    
        // const guestName = res.locals.guest.login_id
        
    
        try {
            const guest = await Guest.findOne({
              where: { login_id : guestId },
            });
            
            const guestName = guest.guest_name
            const guest_id = guest.guest_id
        
            return res.json({"guestName" : guestName, "guest_id" : guest_id});
          } catch (err) {
            return res.status(400).send({ errorMessage: "실패하였습니다." });
          }
        });
    
module.exports = router;    