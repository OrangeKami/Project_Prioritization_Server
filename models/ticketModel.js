import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    initialtive: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      required: true,
      default: "?",
      enum: ["Small", "Medium", "Large", "Xlarge", "?"],
      // todo my need a default value
    },
    confidence: {
      type: String,
      required: true,
      default: "?",
      enum: ["Small", "Medium", "Large", "Xlarge", "?"],
      // todo my need a default value
    },
    effort: {
      type: String,
      required: true,
      default: "?",
      enum: ["Small", "Medium", "Large", "Xlarge", "?"],
    },

    isSubmitted: {
      type: Boolean,
      default: false,
    },
    //  todo ticket status  when link to manger side
    // status: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Status"
    // }
    //  todo future support
    // target: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Target",
    // },
    //  todo future support
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // todo future function Comment
    // comment: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Comment",
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
