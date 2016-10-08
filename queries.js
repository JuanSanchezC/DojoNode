var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://peskmpca:8zSxGhu5fKv8tGXNs_IoxWL49NskwPYy@elmer.db.elephantsql.com:5432/peskmpca';
var db = pgp(connectionString);

function getAllRestaurants(req,res,next){
	db.any('select * from restaurant')
	.then(function(data){
		res.status(200)
		.json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperados todos los restaurantes'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function getRestaurantByName(req,res,next){
	var name = req.params.name;
	db.any('select * from restaurant where name = $1', name)
	.then(function(data){
		res.status(200)
		.json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperado restaurante por nombre'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function createRestaurant(req,res,next){
	db.none('insert into restaurant(name, city, address, phone)'+'values($1, $2, $3, $4)',
		[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone)])
	.then(function(){
		res.status(200)
		.json({
			status: 'Exitoso',
			message: 'Creacion de restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function removeRestaurant(req,res,next){
	var restaurantID = parseInt(req.params.id);
	db.result('delete from restaurant where id = $1', restaurantID)
	.then(function(data){
		res.status(200)
		.json({
			status: 'Exitoso',
			message: 'Restaurante removido'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function updateRestaurant(req,res,next){
	db.none('update restaurant set name=$1, city=$2, address=$3, phone=$4 where id=$5',
		[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone), parseInt(req.params.id)])
	.then(function(){
		res.status(200)
		.json({
			status: 'Exitoso',
			message: 'Restaurante actualizado'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function createMenu(req, res, next){	
	db.any('insert into menu(id,name,description,price,restaurant)' + ' values($1,$2,$3,$4,$5)',
		[parseInt(req.body.id), req.body.name, req.body.description, parseInt(req.body.price),parseInt(req.body.restaurant)])
	.then(function(data){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Menu insetado'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function getMenuByRestaurant(req, res, next){
	var name = req.params.name;
	db.any('select * menu  where restaurant=$1',parseInt(req.params.id))
	.then(function(data){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Menu recuperado por restaurante'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function removeMenu(req, res, next){
	var menuId = parseInt(req.params.id);
	db.result('delete  from menu where id = $1', menuId)
	.then(function(){
	res.status(200)
	.json({
		status: 'Exitoso',
		data: data,
		message: 'Menu removido'
	});
	})
	.catch(function(err){
		return next(err);
		});

};

module.exports = {
	getAllRestaurants: getAllRestaurants,
	getRestaurantByName: getRestaurantByName,
	createRestaurant: createRestaurant,
	removeRestaurant: removeRestaurant,
	updateRestaurant: updateRestaurant,
	createMenu: createMenu,
	getMenuByRestaurant: getMenuByRestaurant,
	removeMenu: removeMenu
};