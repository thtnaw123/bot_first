require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", (msg) => {
  var hi = "hi";
  const channelUsername = "@monitor_test_rrrr";
  const chatId = msg.chat.id;
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(chatId, "Hello  dear " + msg.from.first_name);
  }

  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
  //   console.log(getMe());
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/sendpic/, (msg) => {
  bot.sendPhoto(
    msg.chat.id,
    "https://th.bing.com/th/id/R.eb7a38c8773fa37bd7457cd41377d676?rik=hDvIJUOdbOUGOQ&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f04%2fsunrise2pelee.jpg&ehk=8%2b0uYNfXcKb6LCc0W4OXWJNqC5gxQqpoyrIXZPpdWNg%3d&risl=&pid=ImgRaw&r=0"
  );
});

bot.onText(/\/sendvideo/, (msg) => {
  bot.sendAudio(
    msg.chat.id,
    "https://www.youtube.com/watch?v=JB6tw5eEbHs&list=PLDLDEBnxAYwLe9LqdY6x-bjwVtK2XrQBQ&index=4"
  );
});

bot.onText(/\/sendcontact/, (msg) => {
  bot.sendContact(msg.chat.id, "Feli", "+251912254147");
});

bot.onText(/\/getprofile/, (msg) => {
  bot
    .getUserProfilePhotos(msg.chat.id)
    .then((userProfilePhotos) => {
      console.log(userProfilePhotos.photos[0]);
      bot.sendMessage(
        msg.chat.id,
        `you have ${userProfilePhotos.total_count} photos`
      );

      //   fs.readFileSync(userProfilePhotos.photos[0].file_id)
    })
    .catch((error) => {
      console.error(error);
    });
});

bot.onText(/\/go/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    reply_markup: {
      keyboard: [
        ["Sample text", "Second sample"],
        ["Tehut Keyboard"],
        ["I'm robot"],
      ],
    },
  });
});

bot.onText(/\/format/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>bold</b> \n <i>italic</i> 
    \n <em>italic with em</em> 
    \n <a href="http://www.example.com/">inline URL</a>
     \n <code>inline fixed-width code</code> 
    \n <pre>pre-formatted fixed-width code block</pre>`,
    { parse_mode: "HTML" }
  );
});

bot.on("message", (msg) => {
  var location = "location";
  if (msg.text.indexOf(location) === 0) {
    bot.sendLocation(msg.chat.id, 44.97108, -104.27719);
    bot.sendMessage(msg.chat.id, "Here is the point");
  }
});

bot.onText(/hi/i, (msg) => {
  const chatId = msg.chat.id;
  const channelUsername = "@monitor_test_rrrr";

  bot.getChat(channelUsername).then(() => {
    bot.sendMessage(
      chatId,
      "Hello! How can I assist you?" + msg.from.first_name
    );
  });

  //   if (msg.chat.type === "channel" || msg.chat.type === "group") {
  //     bot.sendMessage(chatId, `You said: ${msg.text}`);
  //   }
  console.log(msg);
});

// Start listening for messages
// bot.startPolling();

console.log("bot started");
