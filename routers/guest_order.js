const express = require("express");
const router = express.Router();
const {Op} = require('sequelize');
const {Cloth} = require("../models");
const {Guest} = require("../models");




const multer = require('multer');

const upload = multer({dest : './upload'})

const app = express();
app.use(express.json());

router.use('/image', express.static('./upload'));


  router.get('/order/guest', async (req, res) => {
    const  guestId =  String( req.query.login_id )
  
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

    router.post('/order/guest',  upload.single("img"),  async (req, res) => {
      try { 
          console.log(1)
          const tel = req.body.tel
          const address = req.body.address
          const ask = req.body.ask
          const status =  "대기중"
          const guest_id = req.body.guest_id

          const img = '/image/' + req.file.filename;
          await Cloth.create({tel, address,ask, status, guest_id, img});
    
          const guest = await Guest.findOne({where : {guest_id : guest_id}});

          const login_id = guest.login_id
          console.log(login_id)
    
          if (guest.guest_point < 10000) {
            return res.status(412).send({"errorMessage": "마이포인트가 부족합니다!"})
        }
    
          const usePoint = 10000
    
          const updatePoint = guest.guest_point - usePoint
    
          await guest.update( {guest_point : updatePoint});
          
        return res.redirect(`/mypage/guest?login_id=${login_id}`);
     
          } catch (error) {
          console.error(error);
          return res.status(400).json({"errorMessage":"실패하였습니다."});
          }
      });



 
    
module.exports = router;