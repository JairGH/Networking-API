const express = require("express");
const router = express.Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require("../../controllers/thoughtController");

router.route("/").get(getThought).post(createThought);;
router.route("/thoughtId").get(getSingleThought);
router.route("/").put(updateThoughtById);
router.route("/thoughtId").delete(deleteThoughtById);

module.exports = router;
