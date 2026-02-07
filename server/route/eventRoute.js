const express = require("express");
const upload = require("../middleware/multer");
const { getSingleEvent, createEvent, deleteEvent, updateEvents, getAllEvents } = require("../controller/eventController");


const router = express.Router();

router.post("/create", upload.single('image'),createEvent);
router.get("/all", getAllEvents);
router.put("/update/:id", upload.single("image"), updateEvents);
router.delete("/delete/:id", deleteEvent);
router.get('/:id',getSingleEvent)


module.exports = router;