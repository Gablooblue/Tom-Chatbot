var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

var inMemoryStorage = new builder.MemoryBotStorage();
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
	function (session) {
      session.send("");
      session.sendTyping();
      setTimeout(function () {
         session.send("Hello!");
         session.sendTyping();
      }, 1000);
      setTimeout(function () {
   	  session.send("You are near <location>. Do you want to eat here?");
        session.sendTyping();
     }, 3500);
     setTimeout(function () {
        builder.Prompts.choice(session,"Yes or no?",["Yes", "No"],{listStyle: 3});
     }, 4500);},
	function(session, results){
		session.dialogData.choicer = results.response.entity;
      if( results.response.entity == "Yes"){
         session.send("hi");
      }else{
         
      }
   ]).set('storage', inMemoryStorage);
