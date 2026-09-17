// models/User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  // Basic Info
=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
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
<<<<<<< HEAD
  
  // Earnings
=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
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
<<<<<<< HEAD
  pendingIncome: {
    type: Number,
    default: 0
  },
  pendingWithdrawal: {
=======
  pendingIncome: {          // ✅ Add - order approved হয়নি
    type: Number,
    default: 0
  },
  pendingWithdrawal: {      // ✅ Add - withdrawal request করা
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
    type: Number,
    default: 0
  },
  withdrawnEarnings: {
    type: Number,
    default: 0
  },
<<<<<<< HEAD
  
  // Email Verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationOTP: {
    type: String,
    default: null
  },
  emailVerificationExpires: {
    type: Date,
    default: null
  },
  
  // ✅ Password Reset (ADDED)
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  
  // Contact Info
=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
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
<<<<<<< HEAD
  
  // Profile
=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
  avatar: {
    type: String,
    default: null
  },
<<<<<<< HEAD
  avatarId: {
    type: String,
    default: null
  },
=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
  bio: {
    type: String,
    default: null
  },
  website: {
    type: String,
    default: null
  },
<<<<<<< HEAD
  
  // Stats
=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
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
<<<<<<< HEAD
  
  // Account Status
=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
  isActive: {
    type: Boolean,
    default: true
  },
  isBanned: {
    type: Boolean,
    default: false
  },
<<<<<<< HEAD
  banReason: {
    type: String,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
=======
  lastLogin: {
    type: Date,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
  }
}, {
  timestamps: true
});

<<<<<<< HEAD
// ✅ Hash password before save
userSchema.pre('save', async function() {
  const user = this as any;
  
  // Only hash if password is modified
  if (!user.isModified('password')) return;
  
=======
// Hash password
userSchema.pre('save', async function() {
  const user = this as any;
  if (!user.isModified('password')) return;
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

<<<<<<< HEAD
// Compare password method
=======
// Compare password
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
userSchema.methods.comparePassword = async function(password: string) {
  const user = this as any;
  return await bcrypt.compare(password, user.password);
};
<<<<<<< HEAD

=======
>>>>>>> ff1561bd4dcfd741532ddaff69f417bdc86a7dd8
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;