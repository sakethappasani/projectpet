import React from 'react';
import './Home.css';
const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Pet Adoption & Accessories</h1>
        <p>Find your new furry friend and everything they need!</p>
      </header>
      <main className="main-content">
        <section className="section section-pets">
          <h2>Pet Adoption</h2>
          <p>Explore our selection of adorable pets waiting for their forever homes.</p>
          <p>Learn more about our pet adoption process</p>
        </section>
        <section className="section section-accessories">
          <h2>Pet Accessories</h2>
          <p>Discover a wide range of accessories to keep your pet happy and healthy.</p>
          <p>Check out our variety of accessories for your furry friends</p>
        </section>
      </main>
    </div>
  );
}
export default Home;