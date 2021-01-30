import express from 'express';
import User from "./user";
const router = express.Router();

// set up future routes here
router.use("/user", User);

// export routes
export default router;