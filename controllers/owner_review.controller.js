const authMiddleware = require('../middlewares/auth-middleware');
const OwnerReviewService = require('../services/owner_review.service')
class OwnerReviewController {

    ownerReviewService = new OwnerReviewService();

    ownerR =  async(req,res) =>{
        
        const A = res.locals.guest
        
        try {
          const ownerId = A.dataValues.login_id
    
          const reviews = await this.ownerReviewService.findAll(ownerId)

          return res.status(200).send({"review" : reviews.review, "guests": reviews.guests });
           
          } catch (error) {
            console.error(error);
            return res.status(500).send({ message: error.message });
          }
        }};

        module.exports = OwnerReviewController