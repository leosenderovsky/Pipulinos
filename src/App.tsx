import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Product, PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { SizeGuideModal } from './components/SizeGuideModal';
import { MobileFilterDrawer } from './components/MobileFilterDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
// DEMO ONLY — borrar este import y esta línea, más PrototypeBanner.tsx y demoBanner.config.ts, para pasar este proyecto a un cliente real
import { PrototypeBanner } from './components/PrototypeBanner';

export default function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'product-detail' | 'cart' | 'checkout' | 'size-guide'>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [checkoutInitialMethod, setCheckoutInitialMethod] = useState<'mercadopago' | 'whatsapp'>('mercadopago');
  const [completedOrder, setCompletedOrder] = useState<{ orderId: string; method: string } | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(35000);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  // Count active filters
  const activeFiltersCount =
    (selectedCategory !== 'todos' ? 1 : 0) +
    (selectedAgeGroup !== 'all' ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (maxPrice < 35000 ? 1 : 0) +
    selectedFabrics.length;

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSelectedAgeGroup('all');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(35000);
    setSelectedFabrics([]);
    setSearchQuery('');
  };

  const handleToggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  // Navigation handlers
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCart = () => {
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (method: 'mercadopago' | 'whatsapp' = 'mercadopago') => {
    setCheckoutInitialMethod(method);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync hash routing if desired
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#producto/')) {
        const prodId = hash.replace('#producto/', '');
        const found = PRODUCTS.find((p) => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setCurrentView('product-detail');
        }
      } else if (hash === '#carrito') {
        setCurrentView('cart');
      } else if (hash === '#checkout') {
        setCurrentView('checkout');
      } else if (hash === '#talles') {
        setIsSizeGuideModalOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#1E2046]">
        <div className="sticky top-0 z-50 [&>header]:static">
          <PrototypeBanner />
          {/* Navigation Bar */}
          <Header
            currentView={currentView}
            onNavigate={(view) => {
              if (view === 'catalog') handleBackToCatalog();
              else if (view === 'cart') handleOpenCart();
              else if (view === 'size-guide') setIsSizeGuideModalOpen(true);
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedAgeGroup={selectedAgeGroup}
            onSelectAgeGroup={setSelectedAgeGroup}
          />
        </div>

        {/* Dynamic Main View */}
        <main className="flex-1">
          {currentView === 'catalog' && (
            <CatalogView
              onOpenProduct={handleOpenProduct}
              onOpenSizeGuideModal={() => setIsSizeGuideModalOpen(true)}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedAgeGroup={selectedAgeGroup}
              onSelectAgeGroup={setSelectedAgeGroup}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              activeFiltersCount={activeFiltersCount}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedFabrics={selectedFabrics}
              onToggleFabric={handleToggleFabric}
              onResetFilters={handleResetFilters}
            />
          )}

          {currentView === 'product-detail' && selectedProduct && (
            <ProductDetailView
              product={selectedProduct}
              onBackToCatalog={handleBackToCatalog}
              onOpenSizeGuideModal={() => setIsSizeGuideModalOpen(true)}
            />
          )}

          {currentView === 'cart' && (
            <CartPage
              onBackToCatalog={handleBackToCatalog}
              onProceedToCheckout={handleProceedToCheckout}
              onOpenSizeGuideModal={() => setIsSizeGuideModalOpen(true)}
              onOpenProduct={handleOpenProduct}
            />
          )}

          {currentView === 'checkout' && (
            <CheckoutPage
              initialMethod={checkoutInitialMethod}
              onBackToCart={handleOpenCart}
              onOrderSuccess={(orderId, method) => {
                setCompletedOrder({ orderId, method });
                setCurrentView('catalog');
              }}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onOpenSizeGuideModal={() => setIsSizeGuideModalOpen(true)}
          onNavigateHome={handleBackToCatalog}
        />

        {/* Global Modals & Drawers */}
        <SizeGuideModal
          isOpen={isSizeGuideModalOpen}
          onClose={() => setIsSizeGuideModalOpen(false)}
        />

        <MobileFilterDrawer
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          filteredCount={PRODUCTS.length}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedAgeGroup={selectedAgeGroup}
          onSelectAgeGroup={setSelectedAgeGroup}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          selectedFabrics={selectedFabrics}
          onToggleFabric={handleToggleFabric}
          onResetFilters={handleResetFilters}
          activeFiltersCount={activeFiltersCount}
          onOpenSizeGuide={() => {
            setIsMobileFiltersOpen(false);
            setIsSizeGuideModalOpen(true);
          }}
        />

        {completedOrder && (
          <OrderSuccessModal
            orderId={completedOrder.orderId}
            paymentMethod={completedOrder.method}
            onClose={() => setCompletedOrder(null)}
          />
        )}
      </div>
    </CartProvider>
  );
}
