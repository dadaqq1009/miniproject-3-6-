const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const authMiddleware = require('../middlewares/auth-middleware')



const app = express();
app.use(cookieParser());

const OwnerReviewController = require("../controllers/owner_review.controller");
const ownerReviewController = new OwnerReviewController();

router.get('/review/owner/:login_id', authMiddleware,  ownerReviewController.ownerR )





module.exports = router;
