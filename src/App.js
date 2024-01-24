import React, { useState } from 'react';
import './App.css';


const CoffeeVendingMachine = () => {
  const [orders, setOrders] = useState([]);
  const [currentSize, setCurrentSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const coffeeSizes = ['Small', 'Medium', 'Large'];

  const handleSizeChange = (size) => {
    setCurrentSize(size);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleAddOrder = () => {
    if (currentSize && quantity > 0) {
      setOrders([...orders, { size: currentSize, quantity }]);
      setCurrentSize('');
      setQuantity(0);
    }
  };

  const handleShowBill = () => {
    const amount = orders.reduce((total, order) => {
      switch (order.size) {
        case 'Small':
          return total + order.quantity * 2;
        case 'Medium':
          return total + order.quantity * 3;
        case 'Large':
          return total + order.quantity * 4;
        default:
          return total;
      }
    }, 0);

    setTotalAmount(amount);
    setShowBill(true);
  };

  return (
    <div>
      <h1>Coffee Vending Machine</h1>
      {orders.length > 0 ? (
        <div>
          <h2>Order Summary</h2>
          <ul>
            {orders.map((order, index) => (
              <li key={index}>{`${order.quantity} ${order.size} coffee${order.quantity > 1 ? 's' : ''}`}</li>
            ))}
          </ul>
          <p>Total Amount: ${totalAmount}</p>
        </div>
      ) : (
        <div>
          <h2>Make Your Selection</h2>
          <div>
            <label>Select Size:</label>
            <select onChange={(e) => handleSizeChange(e.target.value)}>
              <option value="">Select Size</option>
              {coffeeSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={handleQuantityChange} />
          </div>
          <button onClick={handleAddOrder}>Add to Order</button>
        </div>
      )}

      {orders.length > 0 && !showBill && (
        <button onClick={handleShowBill}>Show Bill</button>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CoffeeVendingMachine />
    </div>
  );
}

export default App;