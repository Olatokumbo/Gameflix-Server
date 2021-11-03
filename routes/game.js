const gameController = require("../controllers/gameController");
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

router.post("/add", gameController.addGame);
router.get("/list/:genre", verifyToken, gameController.genreList);
router.get("/:id", verifyToken, gameController.gameInfo);
router.get("/image/:key", gameController.getImage);

module.exports = router;
