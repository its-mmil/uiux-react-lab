import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [cart, setCart] = useState(new Map([]));

  const addToCart = (name, price) => {
    let cartCopy = new Map(cart);
    if (cartCopy.get(name) == undefined) {
      cartCopy.set(name, {amount: 1, price: price});
    } else {
      let currentData = cartCopy.get(name);
      cartCopy.set(name, {amount: currentData.amount + 1, price: currentData.price + price})
    }
    setCart(cartCopy);
  }

  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => total += item.price)
    return Math.round(total * 1000) / 1000;
  }

  return (
    <div className="App">
      <h1>My Bakery</h1>
      <div id = "columns">
        <div id="items">
          {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
          <>
            <BakeryItem key={item.name} addToCart={addToCart} name={item.name} price={item.price} image={item.image} description={item.description}></BakeryItem>
          </>
          ))}
        </div>
        <div id="cart">
          <h2 id="cart-header">Cart</h2>
          <ul>
          {
          Array.from(cart.keys()).map((name) =>  
            <li>{name} - {cart.get(name).amount}</li>
          )}
          </ul>
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
