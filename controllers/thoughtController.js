const { ObjectId } = require("mongoose").Types;
const { text } = require("express");
const { Thought } = require("../models");

const thoughtCount = async () => {
  const numberOfThoughts = await Thought.aggregate().count("thoughtCount");
  return numberOfThoughts;
};

module.exports = {
  // * Get all thoughts
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
        allThoughts: await thoughtCount(),
      };
      res.json(thoughtObj);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  // * Get single thoughts
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        thought,
        // ? what is text doing?
        // text: text(req.params.thoughtId),
      });
    } catch (error) {
      console.log(err);
      res.status(500).json(error);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.json({ message: "Thought updated successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({
        _id: req.body.thoughtId
      });
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
