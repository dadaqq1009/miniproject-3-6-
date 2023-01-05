const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Guest} = require('../models');
const {Cloth} = require('../models');

router.get('/order/owner', async(req,res) =>{
    try {
        // const  ownerId =  String( req.query.login_id )
        // console.log(ownerId)
        // const owner = await findOne({where: {owner_id: ownerId}});
        // const owner_id = owner.owner_id

        const cloth = await Cloth.findAll({where: {owner_id : null}});

      let rows = cloth


    let id_list =[]

    for (let i =0; i < rows.length; i++){
      let row = rows[i]
      let guest_id = row['guest_id']
      id_list.push(guest_id)
    };

    console.log(555)
    console.log(id_list)

    let guests = []

    for (let i =0; i < rows.length; i++){
      let guest_id = id_list[i]
      console.log(guest_id)
      let guest = await Guest.findOne({where: {guest_id : guest_id }})
      console.log(guest)
      let guest_name = guest.guest_name
      guests.push(guest_name)
    }

    console.log(guests)
    
    //const name = await Guest.findAll({where: {guest_name : guest_name}})



        // 오류 예제
        // try catch 있을때/없을때
        // const posts = await NonexistentCollection.find({});
    
        return res.send({"cloth" : cloth, "guests" : guests});
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
      }
    }); 

router.put('/order/owner', async(req,res)=>{
  try{
      const cloth_put = await Cloth.update({status: "수거중",},{where :{status: "대기중"},});
      return res.send({"cloth_put" : cloth_put});
  } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
  }
});

module.exports = router;