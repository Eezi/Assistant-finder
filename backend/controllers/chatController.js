import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

const getUserChats = asyncHandler(async (req, res) => {
  const {
    _id,
  } = req.user;
 const chats = await Chat.find({ $or: [{ participatedUser: _id },{ createdBy: _id }] });

  res.status(201).json(chats);
});

const getChatById = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);

  if (chat) {
    res.json(chat);
  } else {
    res.status(404);
    throw new Error("Chat not found");
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

const createChat = asyncHandler(async (req, res) => {

  const {
    createdAt,
    messages,
    createdBy,
    participatedUser,
  } = req.body;

  const chatExists = await Chat.findOne({
    $and: [
        { $or: [ { participatedUser }, { participatedUser: createdBy } ] },
        { $or: [ { createdBy }, { createdBy: participatedUser } ] }
    ]
  });

  if (chatExists) {
    return res.status(201).json(chatExists);
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
  message.receiverHasRead = false;
  const chat = await Chat.findById(message.chatId);
  const userId = message.createdBy === chat.createdBy ? chat.participatedUser : chat.createdBy;
  const user = await User.findById(userId);
  if (!user.unreadMessages || user.unreadMessages === 0) {
    user.unreadMessages = 1;
  } else {
    user.unreadMessages++;
  }
  user.save();

  if (!chat.messages) {
    chat.messages = [];
  }

  if (chat) {
    chat.messages.push(message);
    await chat.save()
    return { messages: chat.messages, chatId: message.chatId } || [];
    //res.status(201).json({ message: 'Review added' })
  }
});

const readChatMessages = asyncHandler(async(args) => {
  // Muutetaan ne viestit luettu jossa createdBy !== useId
  const { userId, chatId } = args;

  const chat = await Chat.findById(chatId);
  const user = await User.findById(userId);
  let unreadMessages = user.unreadMessages;
  const newMessages = chat.messages.map((message) => {
    if (message.createdBy !== userId) {
      message.receiverHasRead = true;
      if (unreadMessages > 0) {
        unreadMessages--;
      }
    }
    return message;
  });
  chat.messages = newMessages;
  user.unreadMessages = unreadMessages;
  await user.save();
  await chat.save();
  return chat.messages;

  /*Chat.update({
    _id: chatId,
    //'messages.createdBy': { $ne: userId }
    messages: { $elemMatch: { createdBy: { $ne: userId }  }}
  }, { 
    $set: {'messages.$.receiverHasRead': true }
  })  */

});

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
  getUserChats,
  getChatById,
  deleteProduct,
  createChat,
  addNewMessage,
  updateProduct,
  createProductReview,
  getTopProducts,
  readChatMessages,
};
