/* global angular app */
'use strict';

app.factory("VoteSvc", function() {
  var userParams = [
  {name:"email", type:"email", label:"Email", placeholder:"Email", helpMessage:"A valid email is required.", icon:"glyphicon glyphicon-user"}, 
  {name:"firstName", type:"text", label:"First Name", placeholder:"First Name", helpMessage:"Your first name is required!"}, 
  {name:"lastName", type:"text", label:"Last Name", placeholder:"Last Name", helpMessage:"Your last name is required!"}, 
  {name:"password", type:"password", label:"Password", placeholder:"Password", helpMessage:"Your password is required!", icon:"glyphicon glyphicon-lock"}, 
  {name:"password2", type:"password", label:"Retype Password", placeholder:"Confirm Password", helpMessage:"Please confirm  your password."}];
  
  var pollData = [];
    
  var pollLabels = [];
  
  this.vote = function(poll, choice, userOption){
    if (choice === "customOption") {
      poll.options.push({"option":userOption.trim(), "votes": 1});
    } else {
      angular.forEach(poll.options, function(option) {
        if (option.option === choice) {
          option.votes++;
        }
      });
    }
    return poll;
  };
  
  this.setChartValues = function(poll) {
    pollData = [];
    pollLabels = [];
    angular.forEach(poll.options, function(option) {
        pollData.push(option.votes);
        pollLabels.push(option.option);
      });
    return poll;
  };
  
  this.getLabels = function() {
    return pollLabels;
  };
  
  this.getData = function() {
    return pollData;  
  };
  
  this.createUser = function() {
    return userParams;
  };
  
  this.getUser = function() {
    var user = [];
    user.push(userParams[0]);
    user.push(userParams[3]);
    return user;
  };
  
  this.createOptions = function(poll){
    var optionsObject = [];
    angular.forEach(poll.options.split(','), function(value) {
      if (value.length > 0) {
        this.push({"option":value.trim(), "votes": 0});
      }
    }, optionsObject);
    return optionsObject;
  };
  
  this.getTotal = function(options) {
    var total = 0;
    angular.forEach(options, function(option) {
      total += option.votes;
    });
    return total;
  };
  
  this.removeEmptyFields = function(user) {
    var newInput = {};
    angular.forEach(user, function(value, key) {
      if (value.length > 0) {
        newInput[key] = value;
      }
    });
    return newInput;
  };
  
  return {
      vote: this.vote,
      setChartValues: this.setChartValues,
      getLabels: this.getLabels,
      getData: this.getData,
      createUser: this.createUser,
      getUser: this.getUser,
      createOptions: this.createOptions,
      removeEmptyFields: this.removeEmptyFields,
      getTotal: this.getTotal
  };
});

app.factory("NavSvc", function() {
  this.collapseNav = function() {
    angular.element(document.querySelector("#navbar")).removeClass("in");
  };
  return {
    collapseNav: this.collapseNav
  };
});