const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
