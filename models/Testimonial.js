import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
    approved: { type: Boolean, default: false } ,
});

export default mongoose.model("Testimonial", testimonialSchema);
