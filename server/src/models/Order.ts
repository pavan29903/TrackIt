import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deliveryPartnerId: {
    type: mongoose.Schema.Types.ObjectId,
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

const Order = mongoose.model('Order', orderSchema);

export default Order;
