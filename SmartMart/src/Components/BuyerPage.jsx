import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, Trash2, LogOut } from 'lucide-react';

export default function BuyerPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', basePrice: 79.99, currentPrice: 89.99, stock: 45, demand: 8.5, image: '🎧' },
    { id: 2, name: 'USB-C Cable', basePrice: 12.99, currentPrice: 14.99, stock: 120, demand: 7.2, image: '🔌' },
    { id: 3, name: 'Phone Stand', basePrice: 15.99, currentPrice: 17.49, stock: 32, demand: 6.1, image: '📱' },
    { id: 4, name: 'Laptop Cooling Pad', basePrice: 45.99, currentPrice: 52.99, stock: 28, demand: 8.2, image: '❄️' },
    { id: 5, name: 'Wireless Mouse', basePrice: 24.99, currentPrice: 28.99, stock: 67, demand: 7.8, image: '🖱️' },
    { id: 6, name: 'USB Hub', basePrice: 19.99, currentPrice: 23.49, stock: 41, demand: 6.9, image: '🔗' },
  ]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(prev => prev.map(p => {
        const variation = (Math.random() - 0.5) * 5;
        const demandFactor = p.demand / 10;
        const newPrice = Math.max(p.basePrice * 0.8, p.basePrice + (p.basePrice * demandFactor * 0.15) + variation);
        return { ...p, currentPrice: parseFloat(newPrice.toFixed(2)) };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950 backdrop-blur-sm bg-opacity-95 shadow-2xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SmartMart</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-600 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64 transition"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-900 hover:bg-opacity-30 text-red-400 font-semibold transition">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Browse Products</h2>
              <p className="text-slate-400">Prices update in real-time based on demand</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl hover:shadow-2xl transition duration-500 overflow-hidden transform hover:-translate-y-1 border border-slate-700 hover:border-cyan-500"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s backwards`
                  }}
                >
                  <style>{`
                    @keyframes fadeInUp {
                      from {
                        opacity: 0;
                        transform: translateY(20px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>
                  <div className="bg-gradient-to-br from-slate-700 to-slate-800 h-48 flex items-center justify-center relative overflow-hidden border-b border-slate-600">
                    <span className="text-6xl group-hover:scale-125 transition duration-500">{product.image}</span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition duration-300 ${
                        wishlist.includes(product.id)
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-700 text-red-400 hover:bg-slate-600'
                      }`}
                    >
                      <Heart size={20} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-3">{product.name}</h3>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-3xl font-bold text-cyan-400">${product.currentPrice.toFixed(2)}</span>
                      <span className="text-sm text-slate-500 line-through mb-1">${product.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-400 mb-4">
                      <span>Stock: <span className="font-bold text-cyan-400">{product.stock}</span></span>
                      <span>Demand: <span className="font-bold text-orange-400">{product.demand.toFixed(1)}/10</span></span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={20} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-6 border border-slate-700 transform transition duration-500 hover:shadow-cyan-500/20 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Shopping Cart</h3>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-slate-600 mb-3" />
                  <p className="text-slate-400 font-semibold">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="border-b border-slate-600 pb-4 hover:bg-slate-700 hover:bg-opacity-50 p-2 rounded transition">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-white text-sm flex-1">{item.name}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600 transition font-bold text-white"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="bg-slate-700 px-2 py-1 rounded hover:bg-slate-600 transition font-bold text-white"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right text-sm font-bold text-cyan-400">
                          ${(item.currentPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-slate-600 pt-4">
                    <div className="flex justify-between mb-4 text-xl font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-cyan-400">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition duration-300">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}