const { Schema, model } = require("mongoose");
const Schema = mongoose.Schema;
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    max_length: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (time) => new Date(time).toLocaleDateString(),
  },
  username: {
    type: String,
    required: true,
  },
  //* Nested Document
  reactions: [reactionSchema],
  toJSON: {
    virtuals: true,
    getters: true,
  },
});
postSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = mongoose.model("thought", thoughtSchema);
