import express from "express";
const router = express.Router();

import upload from "../../middlewares/upload.js";

import {
  addChild,
  getChildren,
  updateChild,
} from "../../controllers/volunteer/volunteerChildController.js";

// Upload photo while submitting child details
router.post("/", upload.single("photo"), addChild);

// Get all children submitted
router.get("/", getChildren);

// Update child info (including admin approval)
router.put("/:id", upload.single("photo"), updateChild);


export default router;
