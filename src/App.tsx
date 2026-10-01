import React, { useState, useEffect, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { Product, PRODUCTS, MAX_CATALOG_PRICE } from './data/products';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { SizeGuideModal } from './components/SizeGuideModal';
import { MobileFilterDrawer } from './components/MobileFilterDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { applyCatalogFilters } from './lib/catalogFilters';
// DEMO ONLY — borrar este import y esta línea, más PrototypeBanner.tsx y demoBanner.config.ts, para pasar este proyecto a un cliente real
import { PrototypeBanner } from './components/PrototypeBanner';

export default function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'product-detail' | 'cart' | 'checkout' | 'size-guide'>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [checkoutInitialMethod, setCheckoutInitialMethod] = useState<'mercadopago' | 'whatsapp'>('mercadopago');
  const [completedOrder, setCompletedOrder] = useState<{ orderId: string; method: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(MAX_CATALOG_PRICE);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  const activeFiltersCount =
    (selectedCategory !== 'todos' ? 1 : 0) +
    (selectedAgeGroup !== 'all' ? 1 : 0) +
    (selectedTag ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (maxPrice < MAX_CATALOG_PRICE ? 1 : 0) +
    selectedFabrics.length +
    (searchQuery.trim() ? 1 : 0);

  const filteredCount = applyCatalogFilters(PRODUCTS, {
    searchQuery,
    category: selectedCategory,
    ageGroup: selectedAgeGroup,
    size: selectedSize,
    color: selectedColor,
    maxPrice,
    fabrics: selectedFabrics,
    tag: selectedTag,
  }).items.length;

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSelectedAgeGroup('all');
    setSelectedTag(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(MAX_CATALOG_PRICE);
    setSelectedFabrics([]);
    setSearchQuery('');
  };

  const handleToggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

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

  const handleSubmitSearch = () => {
    setCurrentView('catalog');
    requestAnimationFrame(() => {
      const anchor = document.getElementById('catalogo-anchor');
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.6) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const hasScrolledOnCatalogRef = useRef(false);
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

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (currentView !== 'catalog') return;
    const hasActiveFilters =
      Boolean(searchQuery.trim()) ||
      selectedCategory !== 'todos' ||
      selectedAgeGroup !== 'all' ||
      Boolean(selectedTag) ||
      Boolean(selectedSize) ||
      Boolean(selectedColor) ||
      maxPrice < MAX_CATALOG_PRICE ||
      selectedFabrics.length > 0;

    if (!hasScrolledOnCatalogRef.current && hasActiveFilters) {
      hasScrolledOnCatalogRef.current = true;
      return;
    }

    if (!hasScrolledOnCatalogRef.current) {
      hasScrolledOnCatalogRef.current = true;
      return;
    }

    if (!hasActiveFilters) return;

    const anchor = document.getElementById('catalogo-anchor');
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.6) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentView, searchQuery, selectedCategory, selectedAgeGroup, selectedTag, selectedSize, selectedColor, maxPrice, selectedFabrics]);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#1E2046]">
        <div className="sticky top-0 z-50 [&>header]:static">
          <PrototypeBanner />
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
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            onSubmitSearch={handleSubmitSearch}
          />
        </div>

        <main className="flex-1">
          {currentView === 'catalog' && (
            <CatalogView
              onOpenProduct={handleOpenProduct}
              onOpenSizeGuideModal={() => setIsSizeGuideModalOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedAgeGroup={selectedAgeGroup}
              onSelectAgeGroup={setSelectedAgeGroup}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
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

        <Footer
          onOpenSizeGuideModal={() => setIsSizeGuideModalOpen(true)}
          onNavigateHome={handleBackToCatalog}
        />

        <SizeGuideModal
          isOpen={isSizeGuideModalOpen}
          onClose={() => setIsSizeGuideModalOpen(false)}
        />

        <MobileFilterDrawer
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          filteredCount={filteredCount}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedAgeGroup={selectedAgeGroup}
          onSelectAgeGroup={setSelectedAgeGroup}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
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
