// 복붙
const jwt = require("jsonwebtoken");
const { Guest } = require("../models");
const SECRET_KEY = "1234";

module.exports = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  console.log(req.headers);

  if (!token) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { login_id } = jwt.verify(token, SECRET_KEY);
    Guest.findByPk(login_id).then((guest) => {
      res.locals.guest = guest;
      return next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
