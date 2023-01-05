
const OwnerReviewRepository = require('../repositories/owner_review.repository');

class OwnerReviewService{ 

    ownerReviewRepository = new OwnerReviewRepository();

    findAll = async(ownerId) => {

        const reviews = await this.ownerReviewRepository.findAll(ownerId)
        
        let rows = []

        for (let i=0; i< reviews.length; i++){
            const review = reviews[i].dataValues
            rows.push(review)
            
        }


          let id_list =[]
      
          for (let i =0; i < rows.length; i++){
            let row = rows[i]
            let guest_id = row['guest_id']
            id_list.push(guest_id)
          };

          let guests = []
      
          for (let i =0; i < rows.length ; i++){
            let guest_id = id_list[i]
            let guest = await this.ownerReviewRepository.findOne(guest_id)
            let guest_name = guest.guest_name
            guests.push(guest_name)
          }


    
        return({"review" : rows, "guests": guests });
       
    }
    

}



module.exports = OwnerReviewService