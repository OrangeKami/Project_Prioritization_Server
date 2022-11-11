import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
  {
    context: { type: String, required: true },
    feedbackBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
