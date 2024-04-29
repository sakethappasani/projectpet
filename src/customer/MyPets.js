import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customerview.css';
import image from './sample.jpg'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config';

const MyPets = () => {
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
        const response = await axios.get(`${config.url}mypets/${customerData.custID}`);
        setPets(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const deletePet = async(petID) =>{
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this pet ?")
      if(confirmDelete)
      {
        await axios.delete(`${config.url}deletepet/${petID}`)
        fetchPets()
        toast.success("Pet Deleted Successfully")
      }
      else{
        toast.error("Deletion Cancelled")
      }
    } catch (error) {
      toast.error('Failed to Delete Pet')
    }
  }
  useEffect(() => {
    fetchPets();
  });

  return (
    <div>
      <br/><br/><br/><br/>
      <div className="responses-container">
        <h1 className="responses-header">My Pets</h1>
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
                      <button className="adopt-button" onClick={() => deletePet(pet.petID)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p align="center" style={{fontWeight: "bold"}}>Pets Not Found</p>
          )}
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default MyPets;
