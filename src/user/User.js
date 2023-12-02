import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import "./user.css";

const AddUser = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updateFullname, setUpdateFullname] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateGrade, setUpdateGrade] = useState("");
  const [updatePoste, setUpdatePoste] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [users, setUsers] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [poste, setPoste] = useState("");
  const [grade, setGrade] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!fullname || !username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/api/users", {
        fullname,
        username,
        email,
        poste,
        grade,
        password,
        phone,
        image
      });
      fetchUsers();
      setShowModal(false);
      setFullname("");
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setImage("");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again later.");
    }
  };

  const handleDeleteUser = id => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3002/api/users/${id}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3002/api/users/${id}`, {
        fullname: updateFullname,
        username: updateUsername,
        email: updateEmail,
        grade: updateGrade,
        poste: updatePoste,
        password: updatePassword,
        phone: updatePhone,
        image: updateImage,
      });
      fetchUsers();
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="add-user-container">
        <button className="show-form-button" onClick={() => setShowModal(true)}>
          Add User
        </button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h2>Add User</h2>
              <input
                className="input-field"
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                className="input-field"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="Ingénieur Principal">Ingénieur Principal</option>
                <option value="Ingénieur Major">Ingénieur Major</option>
                <option value="Technicien">Technicien</option>
              </select>
              <select
                className="input-field"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
              >
                <option value="">Select Poste</option>
                <option value="Architecte Logiciel">Architecte Logiciel</option>
                <option value="Analyste Fonctionnel">Analyste Fonctionnel</option>
                <option value="Chef de Mission">Chef de Mission</option>
                <option value="Chef de Projet">Chef de Projet</option>
                <option value="Développeur">Développeur</option>
                <option value="Testeur">Testeur</option>
                <option value="Maintenance Applicative et Spécialiste en Gestion de Projet">
                  Maintenance Applicative et Spécialiste en Gestion de Projet
                </option>
              </select>
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <button className="add-user-button" onClick={handleAddUser}>
                Add User
              </button>
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {showUpdateModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowUpdateModal(false)}>
                &times;
              </span>
              <h2>Update User</h2>
              <input
                className="input-field"
                type="text"
                placeholder="Full Name"
                value={updateFullname}
                onChange={(e) => setUpdateFullname(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Username"
                value={updateUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Email"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
              />
              <select
                className="input-field"
                value={updateGrade}
                onChange={(e) => setUpdateGrade(e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="Ingénieur Principal">Ingénieur Principal</option>
                <option value="Ingénieur Major">Ingénieur Major</option>
                <option value="Technicien">Technicien</option>
              </select>
              <select
                className="input-field"
                value={updatePoste}
                onChange={(e) => setUpdatePoste(e.target.value)}
              >
                <option value="">Select Poste</option>
                <option value="Architecte Logiciel">Architecte Logiciel</option>
                <option value="Analyste Fonctionnel">Analyste Fonctionnel</option>
                <option value="Chef de Mission">Chef de Mission</option>
                <option value="Chef de Projet">Chef de Projet</option>
                <option value="Développeur">Développeur</option>
                <option value="Testeur">Testeur</option>
                <option value="Maintenance Applicative et Spécialiste en Gestion de Projet">
                  Maintenance Applicative et Spécialiste en Gestion de Projet
                </option>
              </select>
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Phone"
                value={updatePhone}
                onChange={(e) => setUpdatePhone(e.target.value)}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Image"
                value={updateImage}
                onChange={(e) => setUpdateImage(e.target.value)}
              />
              <button className="update-user-button" onClick={() => handleUpdateUser(updateId)}>
                Update
              </button>
            </div>
          </div>
        )}

        {showDetailsModal && selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowDetailsModal(false)}>
                &times;
              </span>
              <h2>User Details</h2>
              <p>Full Name: {selectedUser.fullname}</p>
              <p>Username: {selectedUser.username}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Poste: {selectedUser.poste}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Grade: {selectedUser.grade}</p>
            </div>
          </div>
        )}

        <div className="users-list">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.fullname}</h3>
              <p>{user.username}</p>
              {user.image && <img src={user.image} alt="User" style={{ maxWidth: "100%", height: "auto" }} />}
              <div className="button-container">
                <button
                  className="details-button"
                  onClick={() => {
                    setShowDetailsModal(true);
                    setSelectedUser(user);
                  }}
                >
                  Details
                </button>
                <button
                  className="update-button"
                  onClick={() => {
                    setShowUpdateModal(true);
                    setUpdateId(user._id);
                    setUpdateFullname(user.fullname);
                    setUpdateUsername(user.username);
                    setUpdateEmail(user.email);
                    setUpdateGrade(user.grade);
                    setUpdatePassword(user.password);
                    setUpdatePhone(user.phone);
                    setUpdateImage(user.image);
                    setUpdatePoste(user.poste);
                  }}
                >
                  Update
                </button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
