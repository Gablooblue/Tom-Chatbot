var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT ||3978, function() {
   console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
   appId: process.env.MicrosoftAppId,
   appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', connector.listen());
var hello = new builder.UniversalBot(connector, function (session) {

   session.send("");
   session.sendTyping();
   setTimeout(function () {
      session.send("Hello!");
      session.sendTyping();
   }, 1000);

   setTimeout(function () {
      var yesno = new builder.Message(session)
      .text("You are near <location>. Do you want to eat here?")
      .suggestedActions(
         builder.SuggestedActions.create(
            session, [
               builder.CardAction.imBack(session, "yes", "Yes"),
               builder.CardAction.imBack(session, "no", "No"),
            ]
         ));
         session.send(yesno);
      }, 4000);

});
