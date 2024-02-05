const Restaurant = require('../models/restaurantModel'); 
// Function to add a new restaurant
exports.addRestaurant = async (req, res) => {
  try {
    const { restaurant_id, name, cuisine, address, city} = req.body;

    
    const restaurant = new Restaurant({
        restaurant_id,
        name,
        cuisine,
        address,
        city
    });

    console.log(restaurant)
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find({});
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


// Function to get restaurants with selected columns and sorting
exports.getRestaurantsWithSorting = async (req, res) => {
    try {
      const sortQuery = req.query.sortBy === 'DESC' ? '-restaurant_id' : 'restaurant_id';
      const restaurants = await Restaurant.find({}, 'name cuisine city restaurant_id') // Select specific fields
                                           .sort(sortQuery);
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

  exports.getRestaurantsByCuisine = async (req, res) => {
    try {
      const { cuisine } = req.params; 
      const restaurants = await Restaurant.find({ cuisine: cuisine });
      if (restaurants.length === 0) {
        return res.status(404).send('No restaurants found with the specified cuisine.');
      }
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

 
exports.getRestaurantsByCuisineExcludeCity = async (req, res) => {
    try {
      const { cuisine } = req.params; 
      const { excludeCity } = req.query; 
  
      
      let query = { cuisine: cuisine };
      if (excludeCity) {
        query.city = { $ne: excludeCity }; 
      }
  
      const restaurants = await Restaurant.find(query, 'cuisine name city -_id') // Exclude the id
                                          .sort('name'); 
  
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  