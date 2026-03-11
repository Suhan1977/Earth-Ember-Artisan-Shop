import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  available: boolean;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Hand-Thrown Terracotta Vase",
    price: "$45.00",
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1578749553371-882adbb74002?q=80&w=800&auto=format&fit=crop",
    available: true
  },
  {
    id: 2,
    name: "Abstract Canvas 'Ocean Mist'",
    price: "$120.00",
    category: "Paintings",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    available: true
  },
  {
    id: 3,
    name: "Silver Filigree Earrings",
    price: "$65.00",
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    available: true
  },
  {
    id: 4,
    name: "Hand-Carved Oak Serving Board",
    price: "$85.00",
    category: "Woodwork",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
    available: true
  },
  {
    id: 5,
    name: "Speckled Ceramic Mug Set",
    price: "$38.00",
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    available: true
  },
  {
    id: 6,
    name: "Woven Macramé Wall Hanging",
    price: "$55.00",
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1528459105426-b9548367069b?q=80&w=800&auto=format&fit=crop",
    available: true
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-artisan-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
          <div className="w-10 h-10 bg-artisan-clay rounded-full flex items-center justify-center text-white">
            <ShoppingBag size={20} />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-artisan-ink">Earth & Ember</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Products', 'Custom Orders', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
              className="text-sm font-medium uppercase tracking-widest hover:text-artisan-clay transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-artisan-ink" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-artisan-cream border-b border-black/5 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Home', 'Products', 'Custom Orders', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                className="text-lg font-serif text-left hover:text-artisan-clay"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard: React.FC<{ product: Product; onEnquire: (name: string) => void }> = ({ product, onEnquire }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-artisan group"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-artisan-cream/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-artisan-clay">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 group-hover:text-artisan-clay transition-colors">{product.name}</h3>
        <p className="text-artisan-clay font-serif text-lg mb-4">{product.price}</p>
        <button 
          onClick={() => onEnquire(product.name)}
          className="w-full py-3 border border-artisan-olive rounded-full text-sm font-bold uppercase tracking-widest hover:bg-artisan-olive hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          Enquire Now
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};

const EnquiryForm = ({ selectedProduct }: { selectedProduct: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: selectedProduct || '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, product: selectedProduct }));
    }
  }, [selectedProduct]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.product) newErrors.product = 'Product is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const response = await fetch('https://formspree.io/f/mwvrlgay', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', product: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-black/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-artisan-clay/5 rounded-bl-full -mr-16 -mt-16" />
      
      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-3xl font-serif mb-4">Thank You!</h3>
          <p className="text-artisan-ink/60 mb-8">Your enquiry has been received. We'll get back to you within 24-48 hours.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="btn-artisan"
          >
            Send Another Enquiry
          </button>
        </motion.div>
      ) : (
        <>
          <h2 className="text-3xl font-serif mb-2">Custom Order & Enquiry</h2>
          <p className="text-artisan-ink/60 mb-8">Have a specific request or want to learn more about a piece? Let us know.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-artisan-ink/40">Full Name *</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full bg-artisan-cream/50 border-b-2 px-4 py-3 focus:outline-none transition-colors ${errors.name ? 'border-red-400' : 'border-artisan-olive/20 focus:border-artisan-clay'}`}
                  placeholder="Jane Doe"
                />
                {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-artisan-ink/40">Email Address *</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-artisan-cream/50 border-b-2 px-4 py-3 focus:outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-artisan-olive/20 focus:border-artisan-clay'}`}
                  placeholder="jane@example.com"
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-artisan-ink/40">Phone Number</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-artisan-cream/50 border-b-2 border-artisan-olive/20 focus:border-artisan-clay px-4 py-3 focus:outline-none transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-artisan-ink/40">Product Name *</label>
                <input 
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className={`w-full bg-artisan-cream/50 border-b-2 px-4 py-3 focus:outline-none transition-colors ${errors.product ? 'border-red-400' : 'border-artisan-olive/20 focus:border-artisan-clay'}`}
                  placeholder="e.g. Terracotta Vase"
                />
                {errors.product && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.product}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-artisan-ink/40">Custom Request / Message</label>
              <textarea 
                rows={4}
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-artisan-cream/50 border-b-2 border-artisan-olive/20 focus:border-artisan-clay px-4 py-3 focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your custom requirements..."
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full btn-artisan flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Submit Enquiry'}
            </button>
            
            {status === 'error' && (
              <p className="text-center text-red-500 text-sm font-medium">Something went wrong. Please try again.</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const enquiryRef = useRef<HTMLDivElement>(null);

  const handleEnquire = (productName: string) => {
    setSelectedProduct(productName);
    const element = document.getElementById('custom-orders');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen textured-bg">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-artisan-cream/0 via-artisan-cream/50 to-artisan-cream" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-artisan-clay font-hand text-3xl mb-4"
          >
            Handcrafted with Soul
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight"
          >
            Artisanal Beauty for <br /> <span className="italic text-artisan-olive">Modern Living</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-artisan-ink/70 mb-12 max-w-2xl mx-auto"
          >
            Discover a curated collection of handmade pottery, paintings, and woodwork crafted by local artisans who pour their heart into every piece.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="btn-artisan">
              Explore Collection
            </button>
            <button onClick={() => document.getElementById('custom-orders')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-full border border-artisan-ink/20 hover:bg-white transition-all font-medium">
              Custom Commissions
            </button>
          </motion.div>
        </div>

        {/* Decorative Brush Stroke */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-artisan-cream" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 80%)' }} />
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "The Pottery Studio", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop", desc: "Earthy textures and organic forms." },
            { title: "Fine Art Gallery", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop", desc: "Original paintings that tell a story." },
            { title: "Wooden Heritage", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop", desc: "Timeless pieces carved from local oak." }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img src={cat.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-serif mb-2">{cat.title}</h3>
                <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-artisan-clay font-bold uppercase tracking-widest text-xs mb-4 block">Our Collection</span>
              <h2 className="text-5xl font-serif font-bold">Handmade Treasures</h2>
              <p className="text-artisan-ink/60 mt-4">Each piece is unique, bearing the marks of the maker's hands. Browse our current selection of available works.</p>
            </div>
            <div className="flex gap-4">
              {['All', 'Pottery', 'Jewelry', 'Woodwork'].map(filter => (
                <button key={filter} className="px-4 py-2 rounded-full text-sm font-medium hover:bg-artisan-olive hover:text-white transition-colors">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} onEnquire={handleEnquire} />
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section id="custom-orders" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-artisan-clay font-bold uppercase tracking-widest text-xs block">Bespoke Creations</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">Bring Your Vision <br /> to Life</h2>
            <p className="text-lg text-artisan-ink/70 leading-relaxed">
              Looking for something truly one-of-a-kind? Our artisans accept custom commissions for weddings, home decor, and special gifts. Share your ideas with us, and we'll help you create something timeless.
            </p>
            
            <div className="space-y-6 pt-4">
              {[
                { icon: <CheckCircle2 className="text-artisan-olive" />, title: "Personalized Design", desc: "Collaborate directly with the artist on sketches and materials." },
                { icon: <CheckCircle2 className="text-artisan-olive" />, title: "Sustainable Sourcing", desc: "We use locally sourced clay, wood, and recycled metals." },
                { icon: <CheckCircle2 className="text-artisan-olive" />, title: "Gift Packaging", desc: "All custom orders include hand-wrapped eco-friendly packaging." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-artisan-ink">{item.title}</h4>
                    <p className="text-sm text-artisan-ink/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={enquiryRef}>
            <EnquiryForm selectedProduct={selectedProduct} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-artisan-ink text-artisan-cream pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-artisan-clay rounded-full flex items-center justify-center text-white">
                  <ShoppingBag size={16} />
                </div>
                <span className="text-2xl font-serif font-bold tracking-tight">Earth & Ember</span>
              </div>
              <p className="text-artisan-cream/50 text-sm leading-relaxed">
                Celebrating the art of the handmade. We connect discerning collectors with local artisans dedicated to their craft.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-artisan-clay transition-colors"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-artisan-clay transition-colors"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-artisan-clay transition-colors"><Twitter size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-xl mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-artisan-cream/60">
                <li><button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Our Products</button></li>
                <li><button onClick={() => document.getElementById('custom-orders')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Custom Orders</button></li>
                <li><button className="hover:text-white transition-colors">About the Artisans</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-artisan-cream/60">
                <li className="flex gap-3"><MapPin size={18} className="text-artisan-clay shrink-0" /> 123 Artisan Lane, Craft Village, CV 45678</li>
                <li className="flex gap-3"><Phone size={18} className="text-artisan-clay shrink-0" /> +1 (555) 123-4567</li>
                <li className="flex gap-3"><Mail size={18} className="text-artisan-clay shrink-0" /> hello@earthandember.com</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex justify-center items-center text-[10px] font-bold uppercase tracking-widest text-artisan-cream/30">
            <p>© 2026 Earth & Ember Artisan Shop. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
