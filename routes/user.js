const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.get("/:id", userController.getUserInfo);
router.get("/", verifyToken, userController.getUserInfoByToken);

module.exports = router;
