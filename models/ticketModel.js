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

    isSubmitted: {
      type: Boolean,
      default: false,
    },

    ice: {
      type: Schema.Types.ObjectId,
      ref: "Ice",
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
