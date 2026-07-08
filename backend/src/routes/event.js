import express from "express";
import eventController from "../controllers/eventController.js";

const router = express.Router();

router.route("/")
.post(eventController.getEvents);

router.route("/insert")
.post(eventController.insertEvent);

router.route("/:id")
.put(eventController.updateEvent)
.delete(eventController.deleteEvent);

export default router;