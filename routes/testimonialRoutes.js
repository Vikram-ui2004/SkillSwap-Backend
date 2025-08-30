import express from "express";
import { getTestimonials, addTestimonial, approveTestimonial } from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", getTestimonials);       // only approved
router.post("/", addTestimonial);       // submit testimonial
router.patch("/:id/approve", approveTestimonial); // ✅ admin approval

export default router;
