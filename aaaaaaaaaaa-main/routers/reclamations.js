const express = require('express');
const Reclamation = require('../models/Reclamation');
const User = require('../models/User'); // Import the User model
const auth = require ('../middleware/auth');
const crypto = require('crypto');

const router = express.Router();

function decryptReclamation(encryptedReclamation, key) {
    const iv = Buffer.from(encryptedReclamation.iv, 'hex');
    const encryptionKey = "98232bac1c8ecb4af5c704a6636c671da65bde195e5ef38bbe1b6feadd60e3f0";
    const decipher = crypto.createDecipher("aes-256-cbc", encryptionKey, Buffer.from(key, 'hex'), iv);
    let decryptedReclamation = decipher.update(encryptedReclamation.encryptedReclamation, "hex", "utf8");
    decryptedReclamation += decipher.final("utf8");
    return decryptedReclamation;
}

router.get('/', async (req, res) => {
  try {
      // Fetch all reclamation records from the database
      const reclamations = await Reclamation.find({});

      if (!reclamations || reclamations.length === 0) {
          return res.status(404).json({ message: "No reclamation records found" });
      }

      // Debugging: Log the data from MongoDB
      console.log("Reclamation data from MongoDB:", reclamations);

      // Decrypt the reclamation data for each record
      // Inside your GET route for retrieving reclamation records
const decryptedReclamations = reclamations.map((reclamation) => ({
    user: reclamation.user,
  id: reclamation._id,
  titre: decryptReclamation({ iv: '16-byte-iv-hex-string', encryptedReclamation: reclamation.titre }, 'votre_clé_secrète'),
  description: decryptReclamation({ iv: '16-byte-iv-hex-string', encryptedReclamation: reclamation.description }, 'votre_clé_secrète'),
}));


      res.status(200).json(decryptedReclamations);
  } catch (error) {
      console.error('Error fetching reclamation records:', error);
      res.status(500).json({ message: "Server error" });
  }
});

router.get('/:userId', async (req, res) => {
    try {
        // Fetch reclamation records for the specific user from the database
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        } 

        // Fetch reclamation records associated with the specified user
        const reclamations = await Reclamation.find({ user: userId });

        if (!reclamations || reclamations.length === 0) {
            return res.status(404).json({ message: "No reclamation records found for the user" });
        }

        // Debugging: Log the data from MongoDB
        console.log("Reclamation data from MongoDB:", reclamations);

        // Decrypt the reclamation data for each record
        const decryptedReclamations = reclamations.map((reclamation) => ({
            user: userId,
            id: reclamation._id,
            titre: decryptReclamation({ iv: '16-byte-iv-hex-string', encryptedReclamation: reclamation.titre }, 'votre_clé_secrète'),
            description: decryptReclamation({ iv: '16-byte-iv-hex-string', encryptedReclamation: reclamation.description }, 'votre_clé_secrète'),
        }));

        res.status(200).json(decryptedReclamations);
    } catch (error) {
        console.error('Error fetching reclamation records:', error);
        res.status(500).json({ message: "Server error" });
    }
});

function encryptReclamation(reclamation,key) {
    const iv = crypto.randomBytes(16);

    const encryptionKey =
      "98232bac1c8ecb4af5c704a6636c671da65bde195e5ef38bbe1b6feadd60e3f0";
    const cipher = crypto.createCipher("aes-256-cbc", encryptionKey, Buffer.from(key, 'hex'), iv);
    let encryptedReclamation = cipher.update(reclamation, "utf8", "hex");
    encryptedReclamation += cipher.final("hex");
    return {
        iv: iv.toString('hex'),

        encryptedReclamation
    }
  }

// POST a reclamation for a specific user
router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { titre, description } = req.body;

    try {
        const encryptedTitre = encryptReclamation(titre, 'votre_clé_secrète');
        const encryptedDescription = encryptReclamation(description, 'votre_clé_secrète');

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const newReclamation = new Reclamation({
            titre: encryptedTitre.encryptedReclamation, // Utilisez la propriété `encryptedReclamation`
            description: encryptedDescription.encryptedReclamation, // Utilisez la propriété `encryptedReclamation`
            user: userId,
        });

        // Ajoutez la réclamation à la liste des réclamations de l'utilisateur
        user.reclamations.push(newReclamation);

        await user.save(); // Sauvegardez l'utilisateur avec la nouvelle réclamation

        // Sauvegardez la réclamation séparément si nécessaire
        await newReclamation.save();

        res.status(201).json(newReclamation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la réclamation" });
    }
});

//POST
router.post('/', (req, res) => {
    const newReclamation =   new Reclamation(req.body);
    newReclamation.save()
      .then(reclamation => res.send(newReclamation))
      .catch(err => res.status(400).send(err));
  });


  


// PUT update a reclamation
router.put('/:id', (req, res) => {
    Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(reclamation => {
            if (!reclamation) {
                res.status(404).json({ error: 1 });
            } else {
                res.send(reclamation);
            }
        })
        .catch(err => res.status(400).send(err));
});

// DELETE a reclamation
router.delete('/:id', (req, res) => {
    Reclamation.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(404).json(err));
});

module.exports = router;