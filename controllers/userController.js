const { ObjectId } = require("mongoose").Types;
const { text } = require("express");
const { User } = require("../models");

const userCount = async () => {
    const numberOfUsers = await User.aggregate().sortByCount("userCount");
    return numberOfUsers
}

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        allUsers: await userCount(),
      };
      res.json(userObj);
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
    },
    async getSingleUsers(req, res) {
        try {
          const user = await User.findOne({
            _id: req.params.userId,
          }).select("-__v");
         
        } catch (err) {
            res.json(500).json({ message: "No user with that ID" });
        }
    }
};
