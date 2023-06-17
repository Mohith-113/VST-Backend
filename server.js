const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const user = require('./routes/user');
const mve = require('./model/SchemaAddNve');
const addmve = require('./routes/addmve');

// Initialize express.js
const app = express();
// To receive JSON data
app.use(express.json());
// Initialize CORS
app.use(cors({
  origin: '*'
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://Mohith-Anabathula:Mohith-Anabathula@cluster0.2z0nmuv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB is connected');
}).catch((error) => {
  console.log('DB connection error:', error);
});

// Auth API's
app.use('/api/auth', auth);
// Users API's
app.use('/api/user', user);
// Mve API's
app.use('/api/addmve', addmve);
app.post('/api/addmves', (req, res) => {
  const { title, flexiUrl, posterUrl, description, videoUrl, language } = req.body;
  const newMovie = new mve({
    title,
    flexiUrl,
    posterUrl,
    description,
    videoUrl,
    language
  });

  newMovie.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
      console.log(error);
    });
});

//play mve
app.get('/api/addmves/:id', (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


// Run server
app.listen(5000, () => console.log('Server is running'));
