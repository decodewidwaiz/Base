import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100">
      <div className="container mx-auto py-12 px-4">
        {/* Main Header */}
        <h1 className="text-4xl font-extrabold text-amber-900 mb-8 tracking-tight">Shop All Products</h1>

        {/* Filter and Search Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 p-6 bg-amber-50 border border-amber-200 rounded-lg shadow-md">
          <div className="relative flex-1">
            {/* Updated icon color to a darker amber shade */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600" />
            <input
              // Using standard <input> for a cleaner example, applying professional amber styles
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-amber-300 rounded-md text-amber-900 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all pl-10"
            />
          </div>
          
          {/* Select Component (assuming a styled Select component) */}
          {/* Note: In a real app, you'd apply the same focus/border styles to the SelectTrigger */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px] border-amber-300 bg-white text-amber-900 focus:ring-amber-600">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* --- */}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* The ProductCard content will now inherit the new color scheme */}
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl font-semibold text-amber-700">No products found matching your criteria. 🛍️</p>
          </div>
        )}
      </div>
    </div>
  
    </div>
  );
}
export default Shop;
