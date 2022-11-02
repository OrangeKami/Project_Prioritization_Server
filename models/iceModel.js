 import mongoose, { Schema } from 'mongoose';
 
 const iceSchema = new Schema({
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
 });

 export default mongoose.model('Ice', iceSchema);
 