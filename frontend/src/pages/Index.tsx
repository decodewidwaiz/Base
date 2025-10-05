import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      
      
      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-amber-900">
            Welcome to VendorCart
          </h1>
          <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Your one-stop shop for quality electronics and accessories.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 text-lg bg-amber-800 hover:bg-amber-900 text-amber-50 rounded-md font-medium transition-colors shadow-lg flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </button>
            <button className="px-8 py-3 text-lg bg-stone-700 hover:bg-stone-800 text-stone-50 rounded-md font-medium transition-colors shadow-lg">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 px-4 bg-stone-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-600 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-amber-900 mb-4 italic">
                  "The wireless headphones I purchased exceeded my expectations. Sound quality is pristine and the battery life lasts for days. Worth every penny!"
                </p>
                <div className="border-t border-amber-200 pt-4">
                  <p className="font-semibold text-amber-900">Sarah Mitchell</p>
                  <p className="text-sm text-amber-700">Verified Purchase - Premium Headphones</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-600 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-amber-900 mb-4 italic">
                  "Exceptional service from start to finish. My laptop arrived perfectly packaged and works flawlessly. The customer support team was incredibly helpful with setup."
                </p>
                <div className="border-t border-amber-200 pt-4">
                  <p className="font-semibold text-amber-900">James Robertson</p>
                  <p className="text-sm text-amber-700">Verified Purchase - Gaming Laptop</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-600 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-amber-900 mb-4 italic">
                  "I've been shopping here for over a year now. The quality is consistently excellent and delivery is always prompt. My go-to store for electronics!"
                </p>
                <div className="border-t border-amber-200 pt-4">
                  <p className="font-semibold text-amber-900">Emily Chen</p>
                  <p className="text-sm text-amber-700">Verified Purchase - Smart Watch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="shop" className="py-20 px-4 bg-gradient-to-br from-amber-800 to-amber-900 text-amber-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers today
          </p>
          <button className="px-8 py-3 text-lg bg-stone-100 hover:bg-white text-amber-900 rounded-md font-medium transition-colors shadow-lg">
            Browse Products
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">VendorCart</span>
              </div>
              <p className="text-amber-200">
                Your trusted destination for quality electronics and accessories.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-amber-200">
                <li><a href="#" className="hover:text-amber-50">All Products</a></li>
                <li><a href="#" className="hover:text-amber-50">Electronics</a></li>
                <li><a href="#" className="hover:text-amber-50">Accessories</a></li>
                <li><a href="#" className="hover:text-amber-50">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-amber-200">
                <li><a href="#" className="hover:text-amber-50">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-50">Shipping Info</a></li>
                <li><a href="#" className="hover:text-amber-50">Returns</a></li>
                <li><a href="#" className="hover:text-amber-50">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-amber-200">
                <li><a href="#" className="hover:text-amber-50">About Us</a></li>
                <li><a href="#" className="hover:text-amber-50">Careers</a></li>
                <li><a href="#" className="hover:text-amber-50">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-50">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-200">
            <p>&copy; 2025 VendorCart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
