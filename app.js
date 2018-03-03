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

      session.beginDialog("hello");
   }//,
   //function(session,results){
	  //session.dialogData.yn = results.response.entity;
	  //session.send(session.dialogData.yn);}
   ]).set('storage', inMemoryStorage);

   bot.dialog("hello",[
      function ( session) {
         session.send("");
         session.sendTyping();
         setTimeout(function () {
            session.send("Hello! I guess you're hungry.");
            session.sendTyping();
         }, 1000);
         setTimeout(function () {
            session.dialogData.location = "Katipunan";
            session.send(`I can see that you're in ${session.dialogData.location}.`);
            session.sendTyping();
         }, 3700);
         setTimeout(function () {
            builder.Prompts.choice(session,"Do you want to eat here?",["Yes", "No"],{listStyle: 3});
         }, 4700);
      },
      function( session, results){
         session.dialogData.hereBa = results.response.entity;
         if( session.dialogData.hereBa == "No"){
            session.sendTyping();
            setTimeout(function () {
               builder.Prompts.text( session, "Oh okay, let's go on an adventure then! Where do you want to eat?");
            }, 2000);
         }
      },
      function( session, result){
         session.dialogData.hereBa = result.response.entity;
         if( session.dialogData.hereBa == "No"){
            session.dialogData.location = results.response.entity;
         }

         session.sendTyping();
         setTimeout(function () {
            builder.Prompts.text( session, "What are you craving for?");
         }, 1500);
      },
      function( session, results){
         session.dialogData.craving = results.response.entity;
         setTimeout(function () {
            session.send();
            session.sendTyping();
         }, 1000);
      },
      function(session, results){
      //session.dialogData.yn = results.response;
         session.endDialogWithResult({response:session.dialogData.loca});
         }
      ]);
