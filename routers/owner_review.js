const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Owner} = require('../models');
const {Guest} = require('../models');
const {Review} = require('../models');
const {Cloth} = require('../models');

const authMiddleWare = require("../middlewares/auth-middleware");

const app = express();
app.use(cookieParser());

// 사장님 전체 리뷰 조회
router.get("/review/:ownerId", authMiddleWare, async (req, res) => {
  try {
    const posts = await Review.findAll({ order: [["createdAt", "desc"]] });
    // 오류 예제
    // try catch 있을때/없을때
    // const posts = await NonexistentCollection.find({});

    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});



// 게스트 리뷰 작성
//db guest table login_id unique 로 설정
// guest_id + owner_id + cloth_id 
router.post("/review/:guestId", authMiddleWare, async (req, res) => {
  const {guestId} = req.params; //<--guest의 login_id
  const {rate , comment} = req.body;
  const guest_Id_token = res.locals.guest.login_id;
  const owner_id = Owner.owner_id;


  try {
    const posts = await Review.create({   //review라는 table column: owner_id, guest_id, rate, comment 
      rate,
      comment,
      owner_id,
      guest_id : guestId, 
    });

    // res.json({posts});
    // res.json(posts);
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});



module.exports = router;
