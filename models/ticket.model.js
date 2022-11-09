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

    impact: {
      type: String,
      required: true,
      default: "?",
      enum: ["Small", "Medium", "Large", "Xlarge", "?"],
    },
    confidence: {
      type: String,
      required: true,
      default: "?",
      enum: ["Small", "Medium", "Large", "Xlarge", "?"],
    },
    effort: {
      type: String,
      required: true,
      default: "?",
      enum: ["Small", "Medium", "Large", "Xlarge", "?"],
    },

    dueDate: {
      type: Date,
    },

    isSubmitted: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedbacks: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
