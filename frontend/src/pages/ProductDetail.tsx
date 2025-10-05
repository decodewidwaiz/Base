import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Note: product IDs are usually numbers, ensure your actual data matches the comparison type (id === p.id)
  const product = products.find(p => p.id === id); 

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-12 text-center bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 min-h-[calc(100vh-64px)]">
          <p className="text-xl text-amber-900">Product not found</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* 1. Page Background */}
      <div className="bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100">
        <div className="container py-12">
          {/* 3. Back Button Styling */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-8 text-amber-800 hover:bg-amber-200/50 hover:text-amber-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>

          <div className="grid md:grid-cols-2 gap-12 bg-amber-50 p-8 rounded-xl shadow-2xl border border-amber-200">
            {/* Image Section */}
            <div className="aspect-square overflow-hidden rounded-lg shadow-xl border border-amber-300">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div>
              {/* 3. Badge (Category) Styling */}
              <Badge 
                className="mb-4 bg-amber-200 text-amber-800 hover:bg-amber-300/80 font-semibold uppercase tracking-wider"
              >
                {product.category}
              </Badge>

              {/* 2. Title Text Color */}
              <h1 className="text-5xl font-extrabold mb-4 text-amber-900 tracking-tight">
                {product.name}
              </h1>
              
              {/* 2. Price Text Color */}
              <p className="text-4xl font-bold mb-8 text-amber-800">
                ${product.price}
              </p>
              
              <div className="mb-8">
                {/* 2. Description Header Text Color */}
                <h2 className="text-xl font-semibold mb-3 text-amber-900">
                  Description
                </h2>
                {/* 2. Description Content Text Color */}
                <p className="text-lg text-amber-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-10 p-4 border-t border-b border-amber-200">
                {/* 2. Stock Text Color */}
                <p className="text-md text-amber-600">
                  Stock: 
                  <span className="font-bold text-amber-800 ml-1">
                    {product.stock} units available
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {/* 3. "Add to Cart" Button (Outline) Styling */}
                <Button 
                  onClick={handleAddToCart} 
                  variant="outline" 
                  className="flex-1 text-amber-800 border-amber-400 hover:bg-amber-100/70 hover:border-amber-500 transition-colors py-3 h-auto"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                {/* 3. "Buy Now" Button (Primary) Styling */}
                <Button 
                  onClick={handleBuyNow} 
                  className="flex-1 
                    bg-amber-800 hover:bg-amber-700 text-amber-50 font-semibold shadow-lg py-3 h-auto
                  "
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;