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

// router.post("/upload", upload.single("img"), (req, res) => {
//     const image = '/image/' + req.file.filename;
    
//     Cloth.create({img : image})
//   });

// router.post("/order/guest", upload.single("img"), (req, res) => {
//     const image = '/image/' + req.file.filename;
    
//     Cloth.create({img : image})
//   });

router.post('/order/guest',  upload.single("img"),  async (req, res) => {
  try { 
      const guest_id = req.body.guest_id
      // const { address, ask, status, guest_id } = req.body;
      console.log(1)
      const tel = req.body.tel
      const address = req.body.address
      const ask = req.body.ask
      const status = req.body.status
      console.log(tel)
      console.log(2)
      console.log(address)
      console.log(3)
      
      // console.log(JSON.stringify(req.file));
      // console.log(req.file.filename)
      // const img = '/image/' + req.file.filename;
      const img = "img/다운로드.jpg"
      

     
      await Cloth.create({tel, address,ask, status, guest_id, img});

      const guest = await Guest.findOne({where : {guest_id : guest_id}});

      if (guest.guest_point < 10000) {
        return res.status(412).send({"errorMessage": "마이포인트가 부족합니다!"})
    }

      const usePoint = 10000

      const updatePoint = guest.guest_point - usePoint

      await guest.update( {guest_point : updatePoint});
      
      return res.status(201).json({"massage" : "세탁을 신청했습니다!"});
 
      } catch (error) {
      console.error(error);
      return res.status(400).json({"errorMessage":"실패하였습니다."});
      }
  });

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



 
    
module.exports = router;