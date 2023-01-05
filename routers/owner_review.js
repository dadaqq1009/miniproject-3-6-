const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const {Op} = require('sequelize');
const {Owner} = require('../models');
const {Guest} = require('../models');
const {Review} = require('../models');
const {Cloth} = require('../models');

const authMiddleWare = require("../middlewares/auth-middleware");

const app = express();
app.use(cookieParser());

router.get('/review/owner', async(req,res) =>{
  try {
    const  ownerId =  String( req.query.login_id )
    console.log(ownerId)

    const owner = await Owner.findOne({
      where: { login_id : ownerId },
    });

    console.log(owner)

    console.log(owner.owner_id)

    
    // const ownerName = owner.owner_name
    const owner_id = owner.owner_id


    
    const review = await Review.findAll({where: {owner_id : owner_id }});

   let rows = review

    let guests = []
    let id_list =[]

    console.log(555)

    for (let i =0; i < rows.length; i++){
      let row = rows[i]
      let guest_id = row['guest_id']
      id_list.push(guest_id)
    };


    for (let i =0; i < rows.length; i++){

      let guest_id = id_list[i]
      console.log(guest_id)
      let guest = await Guest.findOne({where: {guest_id : guest_id }})
      console.log(guest)
      let guest_name = guest.guest_name
      guests.push(guest_name)
    }

    // const guest = await Guest.findAll({where: {guest_id : guest_id }});

    //const guest_name = guest.guest_name



      // 오류 예제
      // try catch 있을때/없을때
      // const posts = await NonexistentCollection.find({});
  
      return res.send({"review" : review, "guests": guests });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }); 





module.exports = router;
