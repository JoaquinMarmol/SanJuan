function saveCart(cart) {
    if (Array.isArray(cart)) {
    
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    } else {
      console.error("El carrito debe ser un arreglo");
    }
  }

  function getCart() {
    const cart = localStorage.getItem("shoppingCart");
    return cart ? JSON.parse(cart) : [];
  }

  function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si ya existe, incrementa su cantidad
      existingProduct.quantity += 1;
    } else {
      // Si no existe, lo agrega con una cantidad inicial de 1
      cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
  }

  function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  }

  function incrementa(productId) {
    const cart = getCart();
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    saveCart(updatedCart);
  }

  function decrementa(productId) {
    const cart = getCart();
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    saveCart(updatedCart);
  }

export {saveCart, getCart, addToCart, removeFromCart, incrementa, decrementa};