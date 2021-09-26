import express from "express";
const router = express.Router();
import {
  getProducts,
  getChatById,
  deleteProduct,
  createChat,
  updateProduct,
  createProductReview,
  getTopProducts
} from "../controllers/chatController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, createChat);
//router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getChatById)
//.delete(protect, admin, deleteProduct)
// .put(protect, admin, updateProduct);

//router.route("/:id/reviews").post(protect, createProductReview);

export default router;
