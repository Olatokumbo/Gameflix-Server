const router = require("express").Router();
const adminController = require("../controllers/adminControllers");
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); //{ dest: "uploads/" }//

router.get("/", verifyTokenAdmin, adminController.getAdminInfoByToken);
router.post("/signin", adminController.adminLogin);
// router.post("/password", adminController.getPassword);
router.get("/game/list", verifyTokenAdmin, adminController.gameList);
router.get("/game/:id", verifyTokenAdmin, adminController.gameInfo);
router.post("/game/:id/edit", verifyTokenAdmin, adminController.editGame);
router.post("/game/:id/delete", verifyTokenAdmin, adminController.deleteGame);
router.post("/game/:id/review/delete", verifyTokenAdmin, adminController.deleteReview);
router.get("/game/image/:key", adminController.getImage);
router.post(
  "/game/upload",
  verifyTokenAdmin,
  upload.fields([
    {
      name: "posterPhoto",
      maxCount: 1,
    },
    {
      name: "coverPhoto",
      maxCount: 1,
    },
  ]),
  adminController.uploadImage
);

module.exports = router;
