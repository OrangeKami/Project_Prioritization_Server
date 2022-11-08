import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    ticket_id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    initialtive: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    target: {
      type: String,
      required: true,
    },

    dueDate: {
      type: Date,
    },

    ice:{ 
      type: Schema.Types.ObjectId,
      ref: "Ice",
      required: true
    },
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    isSubmitted: {
      type: Boolean,
      default: false,
    },

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
