// models/User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'vendor', 'customer'],
    default: 'customer'
  },
  vendorType: {
    type: String,
    enum: ['digital_products', 'website_demo', 'both'],
    default: null
  },
  isApprovedVendor: {
    type: Boolean,
    default: false
  },
  commissionRate: {
    type: Number,
    default: 10
  },
  totalSales: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  pendingEarnings: {
    type: Number,
    default: 0
  },
  pendingIncome: {          // ✅ Add - order approved হয়নি
    type: Number,
    default: 0
  },
  pendingWithdrawal: {      // ✅ Add - withdrawal request করা
    type: Number,
    default: 0
  },
  withdrawnEarnings: {
    type: Number,
    default: 0
  },
  phone: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  postalCode: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  website: {
    type: String,
    default: null
  },
  totalProducts: {
    type: Number,
    default: 0
  },
  totalWebsiteDemos: {
    type: Number,
    default: 0
  },
  activeProducts: {
    type: Number,
    default: 0
  },
  activeWebsiteDemos: {
    type: Number,
    default: 0
  },
  pendingProducts: {
    type: Number,
    default: 0
  },
  pendingWebsiteDemos: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password
userSchema.pre('save', async function() {
  const user = this as any;
  if (!user.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function(password: string) {
  const user = this as any;
  return await bcrypt.compare(password, user.password);
};
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;