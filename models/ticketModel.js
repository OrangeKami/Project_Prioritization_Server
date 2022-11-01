import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    initialtive: {
      type: String,
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      ref: "Target",
    },
    //  todo future support
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    description: {
      type: String,
      required: true,
    },
    ice: {
      type: Schema.Types.ObjectId,
      ref: 'Ice',
    },
    // todo future function Comment
    // comment: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Comment",
    // },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
    //  todo ticket status  when link to manger side
    // status: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Status"
    // }
  },
  { timestamps: true }
);



export default mongoose.model("Ticket", ticketSchema);
