import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  // --- Empty Cart State ---
  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        {/* Themed background for the empty state */}
        <div className="bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 min-h-[calc(100vh-64px)]">
          <div className="container py-16 text-center">
            {/* Themed icon color */}
            <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-amber-500" />
            {/* Themed text colors */}
            <h2 className="text-3xl font-bold mb-2 text-amber-900">Your cart is empty</h2>
            <p className="text-amber-700 mb-6">Add some products to get started</p>
            {/* Themed primary button */}
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold shadow-md"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- Populated Cart State ---
  return (
    <div className="min-h-screen">
      <Header />
      {/* Themed page background */}
      <div className="bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100">
        <div className="container py-12">
          {/* Themed main title */}
          <h1 className="text-4xl font-extrabold mb-8 text-amber-900 tracking-tight">Shopping Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <Card 
                  key={item.id} 
                  // Themed card container
                  className="bg-amber-50 border border-amber-200 shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4 items-center">
                      
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded shadow-sm border border-amber-100"
                      />
                      
                      <div className="flex-1">
                        {/* Themed item name and price */}
                        <h3 className="font-semibold text-lg mb-1 text-amber-900">{item.name}</h3>
                        <p className="text-amber-800 font-bold text-xl">${item.price}</p>
                      </div>

                      <div className="flex flex-col items-end justify-between h-24">
                        
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          // Themed remove button
                          className="text-amber-600 hover:bg-amber-200 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            // Themed quantity buttons
                            className="border-amber-300 text-amber-800 hover:bg-amber-100"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-bold text-amber-900">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            // Themed quantity buttons
                            className="border-amber-300 text-amber-800 hover:bg-amber-100"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary Card */}
            <div>
              <Card 
                className="sticky top-24 
                  // Themed card container
                  bg-amber-50 border border-amber-300 shadow-xl"
              >
                <CardContent className="p-6">
                  {/* Themed title */}
                  <h2 className="text-2xl font-bold mb-6 text-amber-900">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      {/* Themed secondary text */}
                      <span className="text-amber-700">Subtotal ({cart.length} items)</span>
                      {/* Themed value text */}
                      <span className="font-semibold text-amber-900">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      {/* Themed secondary text */}
                      <span className="text-amber-700">Shipping</span>
                      {/* Themed value text */}
                      <span className="font-semibold text-amber-800">Free</span>
                    </div>
                  </div>

                  {/* Themed separator */}
                  <Separator className="my-6 bg-amber-300" />

                  <div className="flex justify-between mb-8">
                    <span className="text-2xl font-extrabold text-amber-900">Total</span>
                    {/* Themed total price */}
                    <span className="text-2xl font-extrabold text-amber-800">${total.toFixed(2)}</span>
                  </div>

                  {/* Themed primary button */}
                  <Button 
                    className="w-full 
                      bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold shadow-lg py-3 h-auto" 
                    size="lg"
                    onClick={() => navigate('/checkout/shipping')}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;