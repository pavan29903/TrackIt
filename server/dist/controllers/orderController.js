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
exports.trackOrder = exports.updateLocation = exports.getDeliveryOrders = exports.getVendorOrders = exports.assignDeliveryPartner = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerName, customerAddress } = req.body;
        const vendorId = req.userId;
        const order = yield Order_1.default.create({ vendorId, customerName, customerAddress });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: 'Create order failed' });
    }
});
exports.createOrder = createOrder;
const assignDeliveryPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, deliveryPartnerId } = req.body;
        const order = yield Order_1.default.findByIdAndUpdate(orderId, { deliveryPartnerId, status: 'assigned' }, { new: true });
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ error: 'Assignment failed' });
    }
});
exports.assignDeliveryPartner = assignDeliveryPartner;
const getVendorOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ vendorId: req.userId }).populate('deliveryPartnerId');
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Fetch failed' });
    }
});
exports.getVendorOrders = getVendorOrders;
const getDeliveryOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ deliveryPartnerId: req.userId });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Fetch failed' });
    }
});
exports.getDeliveryOrders = getDeliveryOrders;
const updateLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lng } = req.body;
        yield Order_1.default.findOneAndUpdate({ deliveryPartnerId: req.userId }, { location: { lat, lng } });
        res.status(200).json({ message: 'Location updated' });
    }
    catch (error) {
        res.status(500).json({ error: 'Update failed' });
    }
});
exports.updateLocation = updateLocation;
const trackOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield Order_1.default.findById(orderId);
        res.status(200).json({ location: order === null || order === void 0 ? void 0 : order.location });
    }
    catch (error) {
        res.status(500).json({ error: 'Track failed' });
    }
});
exports.trackOrder = trackOrder;
