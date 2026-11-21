
import { useState, useEffect } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Baby Boy T-Shirt",
    price: 399,
    category: "Boys",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Cute Baby Frock",
    price: 599,
    category: "Girls",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600",
    badge: "New",
  },
  {
    id: 3,
    name: "Kids Casual Outfit",
    price: 499,
    category: "Boys",
    image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Baby Pink Dress",
    price: 699,
    category: "Girls",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Kids Shoes",
    price: 799,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    badge: "New",
  },
  {
    id: 6,
    name: "Cute Teddy Toy",
    price: 299,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600",
    badge: "Sale",
  },
];

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kidsCart")) || [];
    } catch {
      return [];
    }
  });

  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("kidsCart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", "Boys", "Girls", "Shoes", "Toys"];

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  }

  function increaseQuantity(id) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeProduct(id) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  }

  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Thank you for shopping with Little Stars!");
    setCart([]);
    setCartOpen(false);
  }

  return (
    <div className="app">
      <div className="top-bar">
        Free Delivery on Orders Above ₹999! 🎁
      </div>

      <header className="navbar">
        <a href="#home" className="logo">
          Little<span>Stars</span> ⭐
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <button
          className="cart-icon"
          onClick={() => setCartOpen(!cartOpen)}
        >
          🛒 Cart ({totalItems}) | ₹{totalAmount}
        </button>
      </header>

      {cartOpen && (
        <div className="cart-details">
          <h2>My Shopping Cart 🛒</h2>

          <button onClick={() => setCartOpen(false)}>
            ✕ Close
          </button>

          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>

                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>

                  <p>Subtotal: ₹{item.price * item.quantity}</p>

                  <button onClick={() => removeProduct(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          <h3>Total Amount: ₹{totalAmount}</h3>

          <button onClick={checkout}>
            Checkout
          </button>
        </div>
      )}

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO LITTLE STARS</p>

          <h1>
            Little Fashion,
            <br />
            <span>Big Happiness!</span>
          </h1>

          <p>
            Discover adorable clothes, shoes and toys
            for your little ones.
          </p>

          <a href="#products" className="shop-btn">
            Shop Now →
          </a>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900"
            alt="Kids fashion collection"
          />
        </div>
      </section>

      <section className="categories section" id="categories">
        <div className="section-heading">
          <p>SHOP BY CATEGORY</p>
          <h2>Find Something Cute ❤️</h2>
        </div>

        <div className="category-grid">
          <button onClick={() => setCategory("Boys")}>👦 Boys</button>
          <button onClick={() => setCategory("Girls")}>👧 Girls</button>
          <button onClick={() => setCategory("Shoes")}>👟 Shoes</button>
          <button onClick={() => setCategory("Toys")}>🧸 Toys</button>
        </div>
      </section>

      <section className="products section" id="products">
        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Popular Products</h2>
        </div>

        <div className="filter-buttons">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "filter active" : "filter"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span>{product.badge}</span>
              </div>

              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>₹{product.price}</strong>
                  <button onClick={() => addToCart(product)}>
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="offer">
        <p>✨ SPECIAL OFFER ✨</p>
        <h2>Make Every Day Colorful!</h2>
        <p>Explore our adorable kids collection today.</p>
        <a href="#products" className="shop-btn">
          Shop Collection
        </a>
      </section>

      <footer id="contact">
        <h2>Little<span>Stars</span> ⭐</h2>
        <p>Making childhood more colorful and beautiful.</p>
        <p>© 2026 Little Stars. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
