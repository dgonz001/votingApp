/* global next */
'use strict';

var User = require('../models/user.js');
var Poll = require('../models/poll.js');

function DBHandler () {

	this.getPoll = function (req, res) {
		Poll
			.findOne({ '_id': req.params.id })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
			});
	};
	
	this.getUserPolls = function (req, res) {
		Poll
			.find({ 'creatorId': req.params.id })
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};
	
	this.getPolls = function (req, res) {
		Poll
			.find({})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};
	
	this.addPoll = function (req, res) {
		var newPoll = new Poll();
    newPoll.title    = req.body.title;                  
    newPoll.question = req.body.question;
    newPoll.options = req.body.options;
    newPoll.customOption  = req.body.customOption;
    newPoll.creatorId  = req.body.creatorId;
    newPoll.save(function(err) {
      if (err) { throw err;}
      res.json(newPoll._id);
    });
	};

	this.updatePoll = function (req, res) {
		Poll
			.findOneAndUpdate({ '_id': req.params.id }, {$set:{'options': req.body.options}}, {new: true})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
			});
	};
	
	this.deletePoll = function (req, res) {
		Poll
			.deleteOne({ '_id': req.user._id })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
			});
	};
	
	this.signUpUser = function (req, res) {
		User
			.findOne({ 'username': req.user.email }) 
			.exec(function(err, user) {
	    	if (user) {
	        res.json(null);
	        return err;
	      } else {
	        var newUser = new User();
	        newUser.email = req.user.email.toLowerCase();
	        newUser.firstName = req.user.fName;
	        newUser.lastName = req.user.lName;
	        newUser.password = newUser.generateHash(req.user.password);
	        newUser.save(function(err, user) {
	          if (err) {return err;}
	          req.login(user, function(err) {
	            if (err) {
	              return next(err);
	            }
	            res.json(user);
	          });
	        });
      	}
    	});
  }; 
}

module.exports = DBHandler;