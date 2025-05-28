import { Request, Response } from 'express';
import Order from '../models/Order';

export const createOrder = async (req: any, res: Response) => {
  try {
    const { customerName, customerAddress } = req.body;
    const vendorId = req.userId;

    const order = await Order.create({ vendorId, customerName, customerAddress });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Create order failed' });
  }
};

export const assignDeliveryPartner = async (req: Request, res: Response) => {
  try {
    const { orderId, deliveryPartnerId } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { deliveryPartnerId, status: 'assigned' },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Assignment failed' });
  }
};

export const getVendorOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find({ vendorId: req.userId }).populate('deliveryPartnerId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

export const getDeliveryOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find({ deliveryPartnerId: req.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

export const updateLocation = async (req: any, res: Response) => {
  try {
    const { lat, lng } = req.body;
    await Order.findOneAndUpdate({ deliveryPartnerId: req.userId }, { location: { lat, lng } });
    res.status(200).json({ message: 'Location updated' });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

export const trackOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    res.status(200).json({ location: order?.location });
  } catch (error) {
    res.status(500).json({ error: 'Track failed' });
  }
};
