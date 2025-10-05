import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
// Assuming Card, CardContent, CardFooter are components styled with neutral tones
import { Card, CardContent, CardFooter } from '@/components/ui/card';
// Assuming Button is a base component that needs color overriding
import { Button } from '@/components/ui/button'; 
import { Product } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        // 1. Updated Card Background and Border to match the theme
        className="overflow-hidden transition-all hover:shadow-xl h-full bg-amber-50 border border-amber-200"
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          {/* 3a. Updated Product Name text color */}
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 text-amber-900">
            {product.name}
          </h3>
          {/* 3b. Updated Description text color */}
          <p className="text-sm line-clamp-2 mb-2 text-amber-700">
            {product.description}
          </p>
          {/* 3c. Updated Price text color for emphasis */}
          <p className="text-2xl font-bold text-amber-800">
            ${product.price}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart} 
            className="w-full 
              // 4. Updated Button style to match the Login button color scheme
              bg-amber-700 hover:bg-amber-900 text-amber-50 font-semibold
            "
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};