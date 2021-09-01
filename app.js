const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

<<<<<<< Updated upstream
mongoose.connect('mongodb+srv://@cluster0.mc40q.mongodb.net/test?retryWrites=true&w=majority',
=======
mongoose.connect('mongodb+srv://newUser26:42xgMdb65@cluster0.mc40q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
>>>>>>> Stashed changes
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));  
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
     
module.exports = app;
