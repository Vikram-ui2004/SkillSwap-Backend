import Testimonial from "../models/Testimonial.js";

// ✅ Only fetch approved testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add new testimonial (default: not approved)
export const addTestimonial = async (req, res) => {
  try {
    const { name, role, text } = req.body;
    const testimonial = new Testimonial({ name, role, text, approved: false });
    await testimonial.save();
    res.status(201).json({ message: "Submitted for review", testimonial });
  } catch (error) {
    res.status(400).json({ message: "Failed to add testimonial", error: error.message });
  }
};

// ✅ Admin: Approve a testimonial
export const approveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    if (!testimonial) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Testimonial approved", testimonial });
  } catch (error) {
    res.status(500).json({ message: "Error approving", error: error.message });
  }
};
// ✅ Admin: Delete a testimonial
export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Testimonial deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting", error: error.message });
    }
};