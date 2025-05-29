import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { JWT_SECRET } from '../config/env';
import Order from '../models/Order';

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const register = async (req: any, res: any) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user._id.toString());

    if (user.role === 'vendor') {

await Order.insertMany([{
    vendorId: user._id,
    customerName: 'Alice',
    customerAddress: '123 Wonderland',
  },
  {
    vendorId: user._id,
    customerName: 'Bob',
    customerAddress: '456 Builder St',
  },]);

  }

  res.status(201).json({ user, token });
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id.toString());

  if (user.role === 'vendor') {
    const existingOrders = await Order.find({ vendorId: user._id });
    if (existingOrders.length === 0) {
await Order.insertMany([{
    vendorId: user._id,
    customerName: 'Alice',
    customerAddress: '123 Wonderland',
  },
  {
    vendorId: user._id,
    customerName: 'Bob',
    customerAddress: '456 Builder St',
  },]);

    }
  }

  res.status(200).json({ user, token });
};

export const deliveryBoy = async (req: any, res: any ) =>{
    try {
    console.log("Fetching delivery boys");
    const deliveryBoys = await User.find({ role: 'delivery' }).select('_id name');
    res.json(deliveryBoys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
