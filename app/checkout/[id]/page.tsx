'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  Loader2,
  Package,
  Shield,
  Zap,
  CheckCircle,
  DollarSign,
  User,
  Mail,
  Lock,
  Smartphone,
  CreditCard,
  Info,
  Copy,
  Check
} from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  price: number;
  salePrice: number | null;
  thumbnailUrl: string;
  category: string;
  productType: string;
  vendor: {
    name: string;
  };
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [downloadToken, setDownloadToken] = useState('');
  const [orderId, setOrderId] = useState('');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Demo payment info
  const paymentInfo = {
    bkash: {
      number: '01800000000',
      accountType: 'Merchant',
      accountName: 'Wahisnova',
    },
    nagad: {
      number: '01800000000',
      accountType: 'Merchant',
      accountName: 'Wahisnova',
    }
  };

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${params.id}`);
        if (response.data.success) {
          setProduct(response.data.data.product);
        }
      } catch (error: any) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  // Copy number
  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    toast.success('Number copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Validate payment
  const validatePayment = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!transactionId.trim()) {
      newErrors.transactionId = 'Transaction ID required';
    } else if (transactionId.length < 8) {
      newErrors.transactionId = 'Enter valid transaction ID';
    }
    
    if (!senderNumber.trim()) {
      newErrors.senderNumber = 'Your bKash/Nagad number required';
    } else if (!/^01[0-9]{9}$/.test(senderNumber.trim())) {
      newErrors.senderNumber = 'Enter valid 11-digit number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle purchase
  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      router.push(`/login?redirect=/checkout/${params.id}`);
      return;
    }

    if (!validatePayment()) {
      toast.error('Please fill payment details correctly');
      return;
    }

    setProcessing(true);
    try {
      const response = await axios.post('/api/orders/create', {
        productId: params.id,
        productType: product?.productType || 'digital',
        paymentMethod: paymentMethod,
        transactionId: transactionId.trim(),
        senderNumber: senderNumber.trim()
      });

      if (response.data.success) {
        setOrderId(response.data.data.order.orderId);
        setDownloadToken(response.data.data.downloadToken);
        setOrderComplete(true);
        toast.success('Purchase successful!');
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast.error(error.response?.data?.error || 'Purchase failed');
    } finally {
      setProcessing(false);
    }
  };

  // Loading
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  // Order complete
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Your order has been confirmed</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-mono text-sm font-semibold text-gray-900">{orderId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <p className="font-semibold text-gray-900 uppercase">{paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="font-mono text-sm font-semibold text-gray-900">{transactionId}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href={`/download/${downloadToken}`}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
              >
                Download Now
              </Link>
              <Link
                href="/orders"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const finalPrice = product.salePrice || product.price;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

        {/* Product Summary */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                {product.thumbnailUrl ? (
                  <img src={product.thumbnailUrl} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Package className="w-8 h-8 text-white/50" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-500">by {product.vendor?.name}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {product.salePrice && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Original Price</span>
                  <span className="text-gray-400 line-through">${product.price}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="text-green-600">
                  {product.salePrice ? `-$${product.price - product.salePrice}` : '$0'}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Payable</span>
                <span className="text-2xl font-bold text-indigo-600">${finalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* bKash */}
            <button
              onClick={() => setPaymentMethod('bkash')}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                paymentMethod === 'bkash'
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-pink-600 mb-1">bKash</div>
              <p className="text-xs text-gray-500">Send Money</p>
            </button>

            {/* Nagad */}
            <button
              onClick={() => setPaymentMethod('nagad')}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                paymentMethod === 'nagad'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-orange-600 mb-1">Nagad</div>
              <p className="text-xs text-gray-500">Send Money</p>
            </button>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Step 1: Send money to our {paymentMethod} number
            </p>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-lg font-bold text-gray-900">${finalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{paymentMethod} Number</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-semibold text-gray-900">
                    {paymentMethod === 'bkash' ? paymentInfo.bkash.number : paymentInfo.nagad.number}
                  </p>
                  <button
                    onClick={() => copyNumber(paymentInfo[paymentMethod].number)}
                    className="p-1 text-gray-400 hover:text-indigo-600"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Step 2: Enter Transaction ID *
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  if (errors.transactionId) setErrors({ ...errors, transactionId: undefined });
                }}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.transactionId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 9HJ8KLMN3P"
              />
              {errors.transactionId && (
                <p className="text-xs text-red-500 mt-1">{errors.transactionId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Step 3: Your {paymentMethod} Number *
              </label>
              <input
                type="tel"
                value={senderNumber}
                onChange={(e) => {
                  setSenderNumber(e.target.value);
                  if (errors.senderNumber) setErrors({ ...errors, senderNumber: undefined });
                }}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.senderNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="01XXXXXXXXX"
              />
              {errors.senderNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.senderNumber}</p>
              )}
            </div>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-lg">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Admin will verify your payment and approve your order. You'll get download access after verification.
            </p>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Buyer Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{user?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 justify-center">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Secure</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600">Instant</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Lock className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Protected</span>
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={processing}
          className={`w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors ${
            processing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Smartphone className="w-5 h-5" />
              Confirm Payment - ${finalPrice}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}