const { Schema, Types } = require("mongoose"); // Destructure Types from mongoose
const moment = require("moment");

// Schema to create Reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(), 
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Use a getter method to format the timestamp on query
reactionSchema.path("createdAt").get(function (timestamp) {
  return moment(timestamp).format("MMMM Do, YYYY [at] h:mm:ss a");
});

module.exports = reactionSchema;
