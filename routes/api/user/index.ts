import express from 'express';
import { userController } from "../../../controller";
const router = express.Router();

// matches /api/user
router.route("/")
  .post(userController.create)
  .put(userController.login);

// matches /api/user/*
router.route("/:id")
  .delete(userController.remove);

// export routes
export default router;