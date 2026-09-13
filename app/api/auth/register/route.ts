import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { setTokenCookie, setUserCookie } from '@/lib/cookies';
import Settings from '@/models/Settings';



export async function POST(req: NextRequest) {
  try {

    const settings = await (Settings as any).findOne();

    if (settings && settings.allowRegistration === false) {
      return NextResponse.json(
        { success: false, error: 'Registration is currently disabled' },
        { status: 403 }
      );
    }
    await connectDB();
    
    const body = await req.json();
    const { name, email, password, role, vendorType } = body;
    
    // Input validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Name validation
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2-100 characters' },
        { status: 400 }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }
    
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      return NextResponse.json(
        { success: false, error: 'Password must include uppercase, lowercase, and number' },
        { status: 400 }
      );
    }
    
    // Role validation
    if (role && !['admin', 'vendor', 'customer'].includes(role)) {
      return NextResponse.json(
        { success: false, error: 'Invalid role' },
        { status: 400 }
      );
    }
    
    // Prevent admin registration
    if (role === 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin registration not allowed' },
        { status: 403 }
      );
    }
    
    const existingUser = await (User as any).findOne({ email: email.toLowerCase().trim() });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    const user = await (User as any).create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'customer',
      vendorType: role === 'vendor' ? vendorType : null,
      isApprovedVendor: role === 'vendor' ? false : true
    });
    
    const token = generateToken(user._id.toString(), user.role);
    
    await setTokenCookie(token);
    
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isBanned: false,           // ✅ Add
      isActive: true,            // ✅ Add
      role: user.role,
      vendorType: user.vendorType,
      isApprovedVendor: user.isApprovedVendor
    };
    
    await setUserCookie(userData);
    
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        data: { user: userData }
      },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}