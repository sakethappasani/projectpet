import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './view.css'; 
import config from '../config';

export default function ViewPets() {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const response = await axios.get(`${config.url}viewallpets`); 
      setPets(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
        <br/><br/><br/>
    <div className="users-container">
      <h1 className="users-header">PETS</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>PetID</th>
              <th>Pet Name</th>
              <th>Category</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Added By</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pets) && pets.length > 0 ? (
              pets.map((pet, index) => (
                <tr key={index}>
                  <td>{pet.petID}</td>
                  <td>{pet.petname}</td>
                  <td>{pet.category}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.gender}</td>
                  <td>{pet.age}</td>
                  <td>{pet.addedby}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" align='center'>Data Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
