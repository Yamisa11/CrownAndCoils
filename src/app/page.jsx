"use client";

import { useState, useRef } from 'react';



function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const featuredProducts = [
    {
      id: 1,
      name: "Intensive Moisture Mask",
      price: 45,
      image: "/product1.jpg",
    },
    {
      id: 2,
      name: "Hydrating Leave-in Conditioner",
      price: 28,
      image: "/product2.jpg",
    },
  ];
  const services = [
    {
      category: "Haircuts and Styling",
      items: [
        {
          name: "Haircut",
          description: "For men, women, and children",
          image: "/haircut.jpg",
        },
        {
          name: "Blowout",
          description: "Styling with a blow dryer",
          image: "/blowout.jpg",
        },
        {
          name: "Hair Styling",
          description: "Updos, braids, curls, and more",
          image: "/styling.jpg",
        },
      ],
    },
    {
      category: "Hair Treatments",
      items: [
        {
          name: "Deep Conditioning",
          description: "Moisturizing treatment",
          image: "/deep-conditioning.jpg",
        },
        {
          name: "Keratin Treatment",
          description: "Smoothing and straightening",
          image: "/keratin.jpg",
        },
        {
          name: "Protein Treatment",
          description: "Strengthening treatment",
          image: "/protein.jpg",
        },
      ],
    },
    {
      category: "Extensions and Weaves",
      items: [
        {
          name: "Clip-In Extensions",
          description: "Temporary hair extensions",
          image: "/clip-in.jpg",
        },
        {
          name: "Sew-In Weaves",
          description: "Long-lasting weave installation",
          image: "/sew-in.jpg",
        },
        {
          name: "Micro-Link Extensions",
          description: "Semi-permanent extensions",
          image: "/micro-link.jpg",
        },
      ],
    },
    {
      category: "Chemical Services",
      items: [
        {
          name: "Perms",
          description: "Permanent waves or curls",
          image: "/perm.jpg",
        },
        {
          name: "Relaxers",
          description: "Straightening treatments",
          image: "/relaxer.jpg",
        },
      ],
    },
  ];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
    serviceType: "",
  });
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const handleCheckout = () => {
    setShowSuccess(true);
    setShowCart(false);
    setCartItems([]);
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Booking submitted successfully!");
  };
  const bookingRef = useRef(null);
  const scrollToBooking = (serviceName = "") => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
      if (serviceName) {
        setFormData((prev) => ({
          ...prev,
          serviceType: serviceName,
        }));
      }
    }
  };

  return (
    <div className="min-h-screen font-montserrat">
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-candara-light">
                Crown & Coils
              </h1>
            </div>

            <div className="hidden md:flex space-x-4 lg:space-x-8">
              <a
                href="#"
                className="text-sm lg:text-base text-gray-600 hover:text-gray-900"
              >
                Home
              </a>
              <a
                href="#"
                className="text-sm lg:text-base text-gray-600 hover:text-gray-900"
              >
                Services
              </a>
              <a
                href="#"
                className="text-sm lg:text-base text-gray-600 hover:text-gray-900"
              >
                Book an Appointment
              </a>
              <a
                href="#"
                className="text-sm lg:text-base text-gray-600 hover:text-gray-900"
              >
                Shop Products
              </a>
              <a
                href="#"
                className="text-sm lg:text-base text-gray-600 hover:text-gray-900"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-sm lg:text-base text-gray-600 hover:text-gray-900"
              >
                Contact
              </a>
              <button
                onClick={() => setShowCart(!showCart)}
                className="text-gray-600 hover:text-gray-900 relative"
              >
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d4a373] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setShowCart(!showCart)}
                className="text-gray-600 hover:text-gray-900 relative"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d4a373] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-gray-600">
                Home
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600">
                Services
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600">
                Book an Appointment
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600">
                Shop Products
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600">
                Blog
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-600">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-16">
        <div className="relative h-[400px] md:h-[600px]">
          <img
            src="https://ucarecdn.com/25ae63e4-2884-4328-b3b1-2ece39241177/"
            alt="Artistic illustration of a woman with flowing natural curls adorned with floral elements"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              Transform Your Hair
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8">
              Experience the ultimate moisture treatment
            </p>
            <div className="flex flex-col space-y-4 w-full max-w-md px-4">
              <button
                onClick={() => scrollToBooking("Deep Conditioning")}
                className="bg-[#d4a373] text-white px-4 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg hover:bg-[#b08b5d] w-full"
              >
                Book a Deep Conditioning Treatment Today!
              </button>
              <button className="bg-white text-[#d4a373] px-4 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg hover:bg-gray-100 w-full">
                Shop Our Moisture Essentials!
              </button>
            </div>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {services.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white p-4 rounded-lg shadow-md w-full"
              >
                <h3 className="text-lg font-bold text-[#d4a373] mb-3">
                  {category.category}
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  {category.items.map((service, serviceIndex) => (
                    <li
                      key={serviceIndex}
                      onClick={() => scrollToBooking(service.name)}
                      className="cursor-pointer hover:text-[#d4a373] transition-colors duration-300"
                    >
                      {service.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={bookingRef}
          className="max-w-7xl mx-auto px-4 py-16 bg-white"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Book an Appointment
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-6 bg-[#faf3e0] p-8 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4a373]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4a373]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4a373]"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4a373]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="time">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4a373]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="serviceType">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4a373]"
                required
              >
                <option value="">Select a service</option>
                {services.map((category) =>
                  category.items.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#d4a373] text-white px-6 py-3 rounded-full hover:bg-[#b08b5d] transition-colors text-lg"
            >
              Book Appointment
            </button>
          </form>
        </section>

        <section className="bg-[#faf3e0] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 md:p-6 rounded-lg shadow-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 md:h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-bold">
                    {product.name}
                  </h3>
                  <p className="text-[#d4a373] font-bold mt-2">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full md:w-auto mt-4 bg-[#d4a373] text-white px-4 md:px-6 py-2 rounded-full hover:bg-[#b08b5d]"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full md:w-[400px] h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-[#d4a373]">${item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-xl">
                        ${calculateTotal()}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#d4a373] text-white py-3 rounded-full hover:bg-[#b08b5d]"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-[#d4a373] text-white px-6 py-3 rounded-lg shadow-lg z-50">
            <i className="fas fa-check-circle mr-2"></i>
            Item added to cart!
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-green-500 text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold mb-4">Order Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been confirmed.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-[#d4a373] text-white px-6 py-3 rounded-full hover:bg-[#b08b5d]"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;