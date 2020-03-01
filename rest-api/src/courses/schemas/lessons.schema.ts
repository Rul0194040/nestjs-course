import * as mongoose  from "mongoose";

export const lessonsschema = new mongoose.Schema({
  description: String,
  duration: String,
  seqNo: Number,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  } 
})