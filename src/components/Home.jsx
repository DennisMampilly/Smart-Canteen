import React from 'react';
    import '../index.css';

    function Home() {
      return (
        <div className="container home-container">
          <div className="home-content">
            <h1 className="home-title">Reduce Food Waste, Feed the Future</h1>
            <p className="home-description">
              Join us in creating a sustainable food ecosystem. Our platform connects
              canteen staff, students, and NGOs to efficiently manage and distribute
              surplus food. We aim to minimize waste, provide affordable meals, and
              support those in need.
            </p>
            <div className="home-buttons">
              <a href="/canteen" className="home-button canteen-button">Canteen Dashboard</a>
              <a href="/student" className="home-button student-button">Student Dashboard</a>
              <a href="/ngo" className="home-button ngo-button">NGO Dashboard</a>
            </div>
            <div className="home-additional-info">
              <p><b>Key Features:</b></p>
              <ul>
                <li>Real-time Food Surplus Tracking</li>
                <li>Discounted Food Purchase for Students</li>
                <li>Donation to NGOs & Local Communities</li>
                <li>Analytics Dashboard for Canteen Management</li>
                <li>Gamification & Incentives</li>
              </ul>
            </div>
          </div>
          <div className="home-image">
            <img src="/food-image.png" alt="Food Waste Reduction" className="home-image-img" />
          </div>
        </div>
      );
    }

    export default Home;
