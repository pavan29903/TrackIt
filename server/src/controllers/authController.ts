import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { JWT_SECRET } from '../config/env';

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

  res.status(201).json({ user, token });
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id.toString());

  res.status(200).json({ user, token });
};
