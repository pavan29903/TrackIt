import express from 'express';
import {
  createOrder,
  assignDeliveryPartner,
  getVendorOrders,
  getDeliveryOrders,
  updateLocation,
  trackOrder,
  markDelivered
} from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createOrder);
router.post('/assign', protect, assignDeliveryPartner);
router.get('/vendor', protect, getVendorOrders);
router.get('/delivery', protect, getDeliveryOrders);
router.post('/delivered', protect, markDelivered);
router.post('/location', protect, updateLocation);
router.get('/track/:orderId', trackOrder);

export default router;
