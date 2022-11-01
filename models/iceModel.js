import mongoose from "mongoose";

const iceSchema = new mongoose.Schema({
  impact: {
    type: String,
    enum: ["Small", "Medium", "Large", "Xlarge", "?"],
    required: true,
    default: "?",
    // todo my need a default value
  },
  confidence: {
    type: String,
    enum: ["Small", "Medium", "Large", "Xlarge", "?"],
    required: true,
    default: "?",
    // todo my need a default value
  },
  effort: {
    type: String,
    enum: ["Small", "Medium", "Large", "Xlarge", "?"],
    required: true,
    default: "?",
    // todo my need a default value
  },
  score: {
    type: Number,
    required: true,
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
  },
});

export default mongoose.model("Ice", iceSchema);
