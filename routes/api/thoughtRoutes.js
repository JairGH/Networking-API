const express = require("express");
const router = express.Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThought).post(createThought);
router.route("/:thoughtId").get(getSingleThought);
router.route("/").put(updateThoughtById);
router.route("/:thoughtId").delete(deleteThoughtById);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;
