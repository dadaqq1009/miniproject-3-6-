const {Op} = require('sequelize');
const {Owner} = require('../models');
const {Guest} = require('../models');
const {Review} = require('../models');
const {Cloth} = require('../models');

class OwnerReviewRepository{
    findAll = async (ownerId) => {
         const owner = await Owner.findOne({
        where: { login_id : ownerId },
      }); 

    const owner_id = owner.owner_id

    

    const review = await Review.findAll({where: {owner_id : owner_id }});

    return review
    }
    
    findOne = async (guest_id) => {
        let guest = await Guest.findOne({where: {guest_id : guest_id }})

        return guest
    }


}



module.exports = OwnerReviewRepository