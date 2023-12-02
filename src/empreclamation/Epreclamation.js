// Reclamations.js

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./epreclamation.css";
import { NavLink } from "react-router-dom";

const Reclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [show, setShow] = useState(false);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Assuming the user is stored in localStorage after login

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchReclamations = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/reclamations/${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setReclamations(data);
      }
    } catch (error) {
      console.error("Error fetching reclamations:", error);
    }
  };

  const addReclamation = async () => {
    const newReclamation = {
      titre: titre,
      description: description,
      userId: user._id // Pass the logged-in user's ID
    };

    try {
      const response = await fetch(`http://localhost:3002/api/reclamations/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReclamation)
      });

      if (response.ok) {
        fetchReclamations(user._id); // Refresh the reclamations after adding a new one
        handleClose(); // Close the modal after successfully adding the reclamation
      }
    } catch (error) {
      console.error("Error adding reclamation:", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchReclamations(user._id);
    }
  }, [user]);

  return (
    <div>
    <nav className="navbar-container">
    <NavLink to="/homeemp" className="navbar-link">
  Home
</NavLink>
<NavLink to="/epreclamation" className="navbar-link">
  Reclamations
</NavLink>

<NavLink to="/" className="navbar-link">
  Logout
</NavLink>
</nav>
<button className="add-button" onClick={handleShow}>
        Add Reclamation
      </button>
    <div className="reclamations-container">
    <h2>
        Reclamations of
        {' '}
        <span style={{ color: 'red' }}>{user.email}</span>
      </h2>
      <div className="reclamation-row-container">
        {reclamations.map((reclamation, index) => {
          if (index % 5 === 0) {
            return (
              <div key={index} className="reclamation-row">
                {reclamations.slice(index, index + 5).map((rec, i) => (
                  <Card key={i} className="reclamation-card">
                    <Card.Body>
                      <Card.Title>Titre : {rec.titre}</Card.Title>
                      <Card.Text>Description : {rec.description}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
      <button className="add-button" onClick={handleShow}>
        Add Reclamation
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Add Reclamation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form.Group controlId="formTitre">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose} className="close-button">
            Close
          </Button>
          <Button variant="primary" onClick={addReclamation} className="save-button">
            Save Reclamation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default Reclamations;
