import express from 'express';
import { userController } from "../../../controller";
const router = express.Router();

// route matches /api/user
router.route("/")
  .post(userController.create)
  .put(userController.login)

// export routes
export default router;