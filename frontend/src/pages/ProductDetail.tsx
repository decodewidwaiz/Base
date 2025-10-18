import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Define the product interface to match backend response
interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  discount?: number;
  category: string; // Made required to match CartContext
  bgColor?: string;
  panelColor?: string;
  textColor?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/product/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        // Map _id to id for compatibility with cart context
        // Extract image URL to match CartContext Product interface
        const productData = {
          ...data,
          id: data._id,
          image: data.image?.url || data.image || '', // Handle both object and string formats
          category: data.category || 'General' // Provide default category if missing
        };
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-8 flex items-center justify-center min-h-[50vh]">
          <p className="text-2xl font-semibold text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-500 mb-4">{error}</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-8 text-center">
          <p className="text-xl">Product not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
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
      
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image || '/placeholder-image.jpg'}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <Badge className="mb-4">{product.category || 'General'}</Badge>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-6">₹{product.price}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Stock: <span className="font-semibold text-foreground">{product.stock} units available</span>
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddToCart} variant="outline" className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button onClick={handleBuyNow} className="flex-1">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;