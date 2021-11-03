const reviewController = require("../controllers/reviewController");
const router = require("express").Router();

router.post("/:id/add", reviewController.addReview);

module.exports = router;
