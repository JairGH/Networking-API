const router = require("express").Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require("../../controllers/thoughtController");

router.route("/").get(getThought);
router.route("/thought:Id").get(getSingleThought);
router.route("/").post(createThought);
router.route("/").put(updateThoughtById);
router.route("/thought:Id").delete(deleteThoughtById);

module.exports = router;
