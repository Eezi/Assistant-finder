import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// delete product
// Route DELETE /api/products/:id
// Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create new product
// POST /api/products
// Access admin
const createChat = asyncHandler(async (req, res) => {

  const {
    createdAt,
    messages,
    createdBy,
    participatedUser,
  } = req.body;

  const chatExists = await Chat.findOne({ createdBy, participatedUser });
  if (chatExists) {
    res.status(400);
    throw new Error("Chat already exists");
  }

  const createdChat = await Chat.create({
    createdAt,
    messages,
    createdBy,
    participatedUser,
  });
  res.status(201).json(createdChat);
});

// Update product
// PUT /api/products/:id
// Access admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const addNewMessage = asyncHandler(async(message) => {
  console.log('MESSAGE', message)

  const chat = await Chat.findById('614f4ec4976db14d9525e0a1')

  if (!chat.messages) {
    chat.messages = [];
  }

  if (chat) {
    chat.messages.push(message);
  console.log('chat', chat)
    await chat.save()
    //res.status(201).json({ message: 'Review added' })
  }
})
// Create new review
// POST /api/products/:id/revuews
// Access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    } 

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save();
    res.status(201).json({ message: 'Review added' })

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Get top rated products
// GET /api/products/top
// Access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products)
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createChat,
  addNewMessage,
  updateProduct,
  createProductReview,
  getTopProducts
};
