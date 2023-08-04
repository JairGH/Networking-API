const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../../controllers/userController");

router.route("/").get(getUsers);
router.route("/:userId").get(getSingleUser);
router.route("/").post(createUser);
router.route("/").put(updateUserById);
router.route("/:userId").delete(deleteUserById);

module.exports = router;
