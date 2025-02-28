import React, { useState, useEffect } from 'react';
    import '../index.css';

    function CanteenDashboard() {
      const [foodItems, setFoodItems] = useState([]);
      const [newFoodItem, setNewFoodItem] = useState({ name: '', quantity: 0, expiry: '' });
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

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFoodItem({ ...newFoodItem, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/foodItems', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFoodItem),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setFoodItems([...foodItems, data]);
          setMessage('Food item added successfully!');
          setNewFoodItem({ name: '', quantity: 0, expiry: '' });
          setError('');
        } catch (error) {
          setError(error.message);
          setMessage('');
        }
      };

      return (
        <div className="container canteen-container">
          <h2 className="dashboard-title">Canteen Dashboard</h2>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <div className="dashboard-content">
            <div className="form-section">
              <h3 className="form-section-title">Add Food Surplus</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Food Item:</label>
                  <input type="text" id="name" name="name" value={newFoodItem.name} onChange={handleInputChange} className="form-input" required />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity:</label>
                  <input type="number" id="quantity" name="quantity" value={newFoodItem.quantity} onChange={handleInputChange} className="form-input" required />
                </div>
                <div className="form-group">
                  <label htmlFor="expiry" className="form-label">Expiry Date:</label>
                  <input type="date" id="expiry" name="expiry" value={newFoodItem.expiry} onChange={handleInputChange} className="form-input" required />
                </div>
                <button type="submit" className="form-button">Add Food</button>
              </form>
            </div>
            <div className="food-items-section">
              <h3 className="food-items-title">Current Food Surplus</h3>
              {foodItems.length === 0 ? (
                <p className="no-items-message">No food items available.</p>
              ) : (
                <ul className="food-items-list">
                  {foodItems.map((item) => (
                    <li key={item.id} className="food-item">
                      <div className="food-item-details">
                        <span className="food-item-name">{item.name}</span> - Quantity: <span className="food-item-quantity">{item.quantity}</span> - Expiry: <span className="food-item-expiry">{item.expiry}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      );
    }

    export default CanteenDashboard;
