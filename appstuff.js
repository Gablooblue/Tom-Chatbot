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
		session.send("You said: %s", session.message.text);
		session.beginDialog("askcrap");},
	function(session,results){
		session.send(results.response);}]
).set('storage', inMemoryStorage);

bot.dialog('askcrap', [
    function (session) {
        session.dialogData.info = {};
        builder.Prompts.text(session, "What is your name?");
    },
    function (session, results) {
        session.dialogData.name = results.response;
        builder.Prompts.text(session, "What is your location?");
    },
	function (session,results) {
        session.dialogData.info = {};
        builder.Prompts.text(session, "What is your name?");
    },
]);