import React, { useState, useEffect } from 'react';
    import '../index.css';

    function NGODashboard() {
      const [foodItems, setFoodItems] = useState([]);
      const [message, setMessage] = useState('');
      const [error, setError] = useState('');

      useEffect(() => {
        fetchFoodItems();
      }, []);

      const fetchFoodItems = async () => {
        try {
          const response = await fetch('/api/foodItems');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setFoodItems(data);
        } catch (error) {
          setError(error.message);
        }
      };

      return (
        <div className="container ngo-container">
          <h2 className="dashboard-title">NGO Dashboard</h2>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <h3 className="food-items-title">Available Food Surplus for Donation</h3>
          {foodItems.length === 0 ? (
            <p className="no-items-message">No food items available.</p>
          ) : (
            <ul className="food-items-list">
              {foodItems.map((item) => (
                <li key={item.id} className="food-item">
                  <div className="food-item-details">
                    <span className="food-item-name">{item.name}</span> - Quantity: <span className="food-item-quantity">{item.quantity}</span> - Expiry: <span className="food-item-expiry">{item.expiry}</span>
                  </div>
                  <button className="donate-button">Donate</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    export default NGODashboard;
