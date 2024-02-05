const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurantRoute'); 

const app = express();
app.use(express.json());

// Connecting to MongoDB Atlas
mongoose.connect('mongodb+srv://101381860:Alis1520.@cluster1.nymporx.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));


app.use('/restaurants', restaurantRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));