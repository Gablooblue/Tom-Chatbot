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
         session.dialogData.location = "Makati";
         session.send(`I can see that you're in ${session.dialogData.location}.`);
         session.sendTyping();
      }, 3700);
      setTimeout(function () {
         builder.Prompts.choice(session,"Do you want to eat here?",["Yes", "No"],{listStyle: 3});
      }, 4700);
   },
   function( session, results, next){
      session.dialogData.hereBa = results.response.entity;
      if( session.dialogData.hereBa == "No"){
         session.send("");
         session.sendTyping();
         setTimeout(function () {
            builder.Prompts.text( session, "Oh okay, let's go on an adventure then! Where do you want to eat?");
         }, 2000);
      }else{
         next(session);
      }
   },
   function( session, results){
      setTimeout(function () {
         session.send("");
         session.sendTyping();
      }, 1000);
      setTimeout(function () {
         builder.Prompts.text( session, "What are you craving for?");
      }, 2500);
   },
   function( session, results){
      session.dialogData.craving = results.response;
      setTimeout(function () {
         session.send();
         session.sendTyping();
      }, 1000);
      session.send(`${session.dialogData.craving}`);
      if( session.dialogData.craving == "Chinese Food" || session.dialogData.craving == "chinese food"){

         var msg = new builder.Message(session);
         msg.attachmentLayout(builder.AttachmentLayout.carousel)
         msg.attachments([
            new builder.HeroCard(session)
            .title("Tien Ma")
            .subtitle("682 Makati Ave.")
            .text("Casual Chinese Food")
            .images([builder.CardImage.create(session, 'http://www.tienmas.com/images/MainDish/Honey%20Lemon%20Chicken.jpg')])
            .buttons([
               builder.CardAction.openUrl(session, "http://www.tienmas.com/index.php", "Looks Good!")
            ]),
            new builder.HeroCard(session)
            .title("Lutong Macau")
            .subtitle("116 Jupiter Street, Bel-Air Village, Makati City")
            .text("Authentic hand-pulled Chinese noodles")
            .images([builder.CardImage.create(session, 'http://www.lutongmacau.com/wp-content/uploads/2014/02/lutong-macau-1.jpg')])
            .buttons([
               builder.CardAction.openUrl(session, "http://www.lutongmacau.com/", "That Looks Delicious!")
            ]),
            new builder.HeroCard(session)
            .title("Wabi-Sabi")
            .subtitle("7274 Malugay Street, San Antonio Village, San Antonio, Makati City")
            .text("Authentic Chinese Dishes")
            .images([builder.CardImage.create(session, 'https://b.zmtcdn.com/data/reviews_photos/701/90f44ce4d32b19aaf3cc51b967867701_1433426600.jpg')])
            .buttons([
               builder.CardAction.openUrl(session, "https://www.zomato.com/manila/wabi-sabi-san-antonio-makati-city", "Yum!")
            ])
         ]);
         session.send(msg);
      }else if( session.dialogData.craving == "Sinigang" || session.dialogData.craving == "sinigang"){

         var msg = new builder.Message(session);
         msg.attachmentLayout(builder.AttachmentLayout.carousel)
         msg.attachments([
            new builder.HeroCard(session)
            .title("Sentro1771")
            .subtitle("G/F Greenbelt 5, Ayala Center, Makati City")
            .text("Modern Filipino Cuisine")
            .images([builder.CardImage.create(session, 'http://sentro1771.com/wp-content/uploads/2017/12/corned-beef-sinigang.png')])
            .buttons([
               builder.CardAction.openUrl(session, "http://sentro1771.com/", "I looooove sinigang")
            ]),
            new builder.HeroCard(session)
            .title("Zubuchon")
            .subtitle("116 Jupiter Street, Bel-Air Village, Makati City")
            .text("Cebu lechon and sinigang restaurant")
            .images([builder.CardImage.create(session, 'https://b.zmtcdn.com/data/reviews_photos/990/c6f3ad1f4fa92e72546a8f38e6453990_1515264411.jpg')])
            .buttons([
               builder.CardAction.openUrl(session, "https://www.zomato.com/manila/zubuchon-san-antonio-makati-city/info", "Count me in!")
            ]),
            new builder.HeroCard(session)
            .title("Mang Rudy's Tuna Grill & Papaitan")
            .subtitle("1209, 7830 Makati Ave")
            .text("Tuna grill and acoustic nights")
            .images([builder.CardImage.create(session, 'https://b.zmtcdn.com/data/pictures/9/6304979/614d23434750b819754796a1d94f3bf2.jpg?output-format=webp')])
            .buttons([
               builder.CardAction.openUrl(session, "https://www.zomato.com/manila/mang-rudys-tuna-grill-papaitan-san-antonio-makati-city/menu#food", "Grilledly Good")
            ])
         ]);
         session.send(msg);
      }else if( session.dialogData.craving == "barbeque" || session.dialogData.craving == "bbq"){

         var msg = new builder.Message(session);
         msg.attachmentLayout(builder.AttachmentLayout.carousel)
         msg.attachments([
            new builder.HeroCard(session)
            .title("Warung Indo")
            .subtitle("Ground Floor, LPL Manor, San Agustin Street, Salcedo Village, Makati City")
            .text("Authentic Indonesian Food")
            .images([builder.CardImage.create(session, 'https://b.zmtcdn.com/data/reviews_photos/49a/b87d4a2ea87e40a93fc796a9ef75b49a_1479266151.jpg?output-format=webp')])
            .buttons([
               builder.CardAction.openUrl(session, "https://www.zomato.com/manila/warung-indo-salcedo-village-makati-city/menu", "goo for bbq")
            ]),
            new builder.HeroCard(session)
            .title("Holy Smokes BBQ")
            .subtitle("Matilde Corner Jacobo Street, Poblacion, Makati City 1210")
            .text("Tasty Barbeque Dishes 24/7")
            .images([builder.CardImage.create(session, 'https://b.zmtcdn.com/data/pictures/chains/0/18353610/57feca6b0431700a131a3b8963ed2306_featured_v2.jpg')])
            .buttons([
               builder.CardAction.openUrl(session, "https://www.zomato.com/manila/holy-smokes-bbq-poblacion-makati-city", "Always ready for this!")
            ])
         ]);
         session.send(msg);
      }
   },
   function( session, results){
   },
   function(session, results){
      //session.dialogData.yn = results.response;
      session.endDialogWithResult({response:session.dialogData.loca});
   }
]);
