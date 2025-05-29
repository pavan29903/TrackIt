"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryBoy = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const env_1 = require("../config/env");
const Order_1 = __importDefault(require("../models/Order"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.JWT_SECRET, {
        expiresIn: '7d',
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const userExists = yield User_1.default.findOne({ email });
    if (userExists)
        return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield User_1.default.create({
        name,
        email,
        password: hashedPassword,
        role,
    });
    const token = generateToken(user._id.toString());
    if (user.role === 'vendor') {
        const sampleNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace'];
        const sampleStreets = ['Maple Ave', 'Sunset Blvd', 'Broadway', 'King St', 'Elm Rd', 'Main St'];
        const randomOrders = Array.from({ length: 2 }).map(() => ({
            vendorId: user._id,
            customerName: sampleNames[Math.floor(Math.random() * sampleNames.length)],
            customerAddress: `${Math.floor(Math.random() * 999)} ${sampleStreets[Math.floor(Math.random() * sampleStreets.length)]}`,
        }));
        yield Order_1.default.insertMany(randomOrders);
    }
    res.status(201).json({ user, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id.toString());
    if (user.role === 'vendor') {
        const existingOrders = yield Order_1.default.find({ vendorId: user._id });
        if (existingOrders.length === 0) {
            const sampleNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace'];
            const sampleStreets = ['Maple Ave', 'Sunset Blvd', 'Broadway', 'King St', 'Elm Rd', 'Main St'];
            const randomOrders = Array.from({ length: 2 }).map(() => ({
                vendorId: user._id,
                customerName: sampleNames[Math.floor(Math.random() * sampleNames.length)],
                customerAddress: `${Math.floor(Math.random() * 999)} ${sampleStreets[Math.floor(Math.random() * sampleStreets.length)]}`,
            }));
            yield Order_1.default.insertMany(randomOrders);
        }
    }
    res.status(200).json({ user, token });
});
exports.login = login;
const deliveryBoy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching delivery boys");
        const deliveryBoys = yield User_1.default.find({ role: 'delivery' }).select('_id name');
        res.json(deliveryBoys);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deliveryBoy = deliveryBoy;
