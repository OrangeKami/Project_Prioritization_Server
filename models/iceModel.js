import mongoose, { Schema } from "mongoose";

const iceSchema = new Schema({
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
});

export default mongoose.model("Ice", iceSchema);
