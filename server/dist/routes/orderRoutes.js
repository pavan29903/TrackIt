"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, orderController_1.createOrder);
router.post('/assign', authMiddleware_1.protect, orderController_1.assignDeliveryPartner);
router.get('/vendor', authMiddleware_1.protect, orderController_1.getVendorOrders);
router.get('/delivery', authMiddleware_1.protect, orderController_1.getDeliveryOrders);
router.post('/delivered', authMiddleware_1.protect, orderController_1.markDelivered);
router.post('/location', authMiddleware_1.protect, orderController_1.updateLocation);
router.get('/track/:orderId', orderController_1.trackOrder);
exports.default = router;
