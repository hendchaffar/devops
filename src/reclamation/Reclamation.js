// AddReclamation.jsx
import React, { useState, useEffect } from "react";
import "./reclamation.css";
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddReclamation = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reclamations, setReclamations] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updateTitre, setUpdateTitre] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddReclamation = async () => {
    if (!titre || !description) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/reclamations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titre, description }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      fetchReclamations();
      setShowModal(false);
      setTitre("");
      setDescription("");
    } catch (error) {
      console.error("Error adding reclamation:", error);
      alert("Failed to add reclamation. Please try again later.");
    }
  };

 
  const handleDeleteReclamation = id => {
    const confirmDelete = window.confirm("Are you sure you want to delete this reclamation?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3002/api/reclamations/${id}`)
        .then(() => {
          setReclamations(reclamations.filter(reclamation => reclamation._id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  const handleUpdateReclamation = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/reclamations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titre: updateTitre, description: updateDescription }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchReclamations();
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating reclamation:", error);
      alert("Failed to update reclamation. Please try again later.");
    }
  };

  const openUpdateModal = (reclamation) => {
    setUpdateId(reclamation._id);
    setUpdateTitre(reclamation.titre);
    setUpdateDescription(reclamation.description);
    setShowUpdateModal(true);
  };

  const openDetailsModal = (reclamation) => {
    setSelectedReclamation(reclamation);
    setShowDetailsModal(true);
  };

  const fetchReclamations = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/reclamations");
      const data = await response.json();
      if (Array.isArray(data)) {
        setReclamations(data);
      }
    } catch (error) {
      console.error("Error fetching reclamations:", error);
    }
  };

  useEffect(() => {
    fetchReclamations();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="add-reclamation-container">
        <button className="show-form-button" onClick={openModal}>
          Add Reclamation
        </button>
        {showModal && (
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Reclamation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="input-field"
                type="text"
                placeholder="Titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="add-reclamation-button" onClick={handleAddReclamation}>
                Add Reclamation
              </button>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </Modal.Body>
          </Modal>
        )}

        {showUpdateModal && (
          <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Reclamation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                className="input-field"
                type="text"
                placeholder="Titre"
                value={updateTitre}
                onChange={(e) => setUpdateTitre(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Description"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
              <button className="update-reclamation-button" onClick={() => handleUpdateReclamation(updateId)}>
                Update
              </button>
              <button className="cancel-button" onClick={() => setShowUpdateModal(false)}>
                Cancel
              </button>
            </Modal.Body>
          </Modal>
        )}

        {showDetailsModal && selectedReclamation && (
          <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Details Reclamation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Title: {selectedReclamation.titre}</p>
              <p>Description: {selectedReclamation.description}</p>
            </Modal.Body>
          </Modal>
        )}

        <div className="reclamations-list">
          {reclamations.map((reclamation) => (
            <div key={reclamation._id} className="reclamation-card">
              <h3>{reclamation.titre}</h3>
              <p>{reclamation.dateCreation}</p>
              <div className="button-container">
                <button className="details-button" onClick={() => openDetailsModal(reclamation)}>
                  Details
                </button>
                <button className="update-button" onClick={() => openUpdateModal(reclamation)}>
                  Update
                </button>
                <button onClick={() => handleDeleteReclamation(reclamation._id)}>Delete</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddReclamation