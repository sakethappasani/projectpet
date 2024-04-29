import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './customerview.css'; 
import image from './sample.jpg' 
import { ToastContainer, toast } from 'react-toastify';
import config from '../config';

export default function ViewAllPets() {
  const [customerData, setCustomerData] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  const fetchPets = async () => {
    if (customerData && customerData.custID) {
      try {
        const response = await axios.get(`${config.url}viewallpets`);
        const availablePets = response.data.filter(pet => pet.adptstatus === "available" && pet.customerID !== customerData.custID);
        setPets(availablePets);
      } catch (err) {
        toast.error("Failed to fetch pets. Please try again later.");
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    fetchPets();
  });

  const adoptPet = async (petId, customerId) => {
    try {
      const confirmAdopt = window.confirm(`Are you sure you want to adopt this pet?`);
      if (confirmAdopt) {
        const response = await axios.post(
          `${config.url}adoptpet`,
          {
            "adoptedBy": `${customerData.firstname} ${customerData.lastname}`,
            "customerID": customerId,
            "petID": petId
          }
        );
        await fetchPets();
        toast.success(response.data);
      } else {
        toast.error("Adoption process canceled.");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      <br/><br/><br/><br/>
      <div className="responses-container">
        <h1 className="responses-header">PETS</h1>
        <div className="card-container">
          {Array.isArray(pets) && pets.length > 0 ? (
            pets.map((pet, index) => (
              <div className="card" key={index}>
                <div className="inner">
                  <div className="front">
                    <div className="pet-image">
                      <img src={image} alt={pet.petname} />
                      <h2 align="center">{pet.petname}</h2>
                    </div>
                  </div>
                  <div className="back">
                    <div className="details">
                      <p><strong>Category:</strong> {pet.category}</p>
                      <p><strong>Breed:</strong> {pet.breed}</p>
                      <p><strong>Gender:</strong> {pet.gender}</p>
                      <p><strong>Age:</strong> {pet.age}</p>
                      <p><strong>Added By:</strong> {pet.addedby}</p>
                      <button className="adopt-button" onClick={() => adoptPet(pet.petID, pet.customerID)}>Adopt</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <p align="center" style={{fontWeight:"bold"}}>Pets Not Found</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
