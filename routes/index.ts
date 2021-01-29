import express from 'express';
import path from 'path';
import api from './api';

const router = express.Router();

// connect api routers
router.use("/api", api);

// send index.html for production build
if (process.env.NODE_ENV === "production") {
  router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
// export routes
export default router;