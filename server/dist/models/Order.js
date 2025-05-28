"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    vendorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deliveryPartnerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    customerName: String,
    customerAddress: String,
    status: {
        type: String,
        enum: ['pending', 'assigned', 'delivering', 'delivered'],
        default: 'pending',
    },
    location: {
        lat: Number,
        lng: Number,
    }
}, { timestamps: true });
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
