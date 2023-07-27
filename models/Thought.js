const { Schema, model } = require("mongoose");
const Schema = mongoose.Schema;

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
    // ? How can I start this?
    // * Use a getter method to format the timestamp on query
  },
  username: {
    type: String,
      required: true,
    // * or more like type: Schema.types.ObjectId?
  },
  //? Need help
  reactions: {},
  toJSON: {
    virtuals: true,
  },
});
 //? Is this correct?
postSchema.virtual("reactionCount").get(function () {
  return this.reactions.toString();
});

module.exports = mongoose.model("thought", thoughtSchema);
