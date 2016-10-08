var express = require("express");
var router = express.Router();
var db = require('./queries');

router.get('/api/restaurants', db.getAllRestaurants);
router.get('/api/restaurants/:name', db.getRestaurantByName);
router.post('/api/restaurants',db.createRestaurant);
router.delete('/api/restaurants/:id', db.removeRestaurant);
router.put('/api/restaurants/:id', db.updateRestaurant);
router.post('api/menus', db.createMenu);
router.get('api/menus/:id', db.getMenuByRestaurant);
router.delete('api/menus/:ide', db.removeMenu);

module.exports = router;