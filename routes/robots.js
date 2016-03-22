var express = require("express");
var redis = require('redis');
var redisClient = redis.createClient();
var router = express.Router();

// getting robot list
router.get("/", function(request, response, next){
	redisClient.smembers("robots", function(err, robots){
		response.locals.robots = robots ? robots : [];
		response.render("robots");
	});
});

// adding new bot
router.post("/", function(request, response, next){
	redisClient.sadd("robots", request.body.name);
	redisClient.sadd("robots", request.body.role);
	response.redirect("/robots");
});

// deactivating bots

router.get("/delete/:name", function(request, response, next){
	redisClient.srem("robots", request.params.name);
	response.redirect("/robots");
});

module.exports = router;
