import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Create new Order
// POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    itemsPrice,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      itemsPrice,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      createdAt: new Date()
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});


// Get order by id
// GET /api/order/order._id
// Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await await Order.findById(req.params.id).populate('user', 'name email');

  if(order){
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Get order by id
// GET /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await await Order.findById(req.params.id);

  if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Get user orders
// GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await await Order.find({ user: req.user._id });

  if(orders){
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('User orders not found');
  }
});

// Get all orders
// GET /api/orders
// Admin 
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await await Order.find({}).populate('user', 'id name');

  if(orders){
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Orders not found');
  }
});

// Update order to delivered
// GET /api/orders/:id/deliver
// Admin 
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await await Order.findById(req.params.id);

  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered }
