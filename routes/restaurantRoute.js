const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurantController'); // Import the controller

router.post('/', restaurantController.addRestaurant);
router.get('/', restaurantController.getRestaurantsWithSorting);
router.get('/cuisine/:cuisine', restaurantController.getRestaurantsByCuisine);
router.get('/:cuisine', restaurantController.getRestaurantsByCuisineExcludeCity);

module.exports = router;
