const { User } = require("../models");

const userCount = async () => {
  const numberOfUsers = await User.aggregate().sortByCount("userCount");
  return numberOfUsers;
};

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("friends");

      const userObj = {
        users,
        allUsers: userCount(),
      };
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.json(500).json(err);
    }
  },
  async updateUserById(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.json(404), json({ message: "User not found" });
      }

      res.json({ message: "User updated successfully" });
    } catch (err) {
      res.json(500).json(err);
    }
  },
  async deleteUserById(req, res) {
    try {
      const user = await User.findByIdAndDelete({
        _id: req.params.userId,
      });
      if (!user) {
        res.json(404).json({ message: "No users with that ID" });
      }
    } catch (err) {
      res.json(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      await User.findByIdAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet: { friends: req.params.friendId },
        }
      );
      res.json({ message: "Nice" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      await User.findByIdAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: { friends: req.params.friendId },
        }
      );
      res.json({ message: "Bye" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
