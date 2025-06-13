const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "😒",
    version: "0.0.1",
    author: "ArYAN",
    description: "Reply with audio when message starts with 😒",
    usage: "😒",
    cooldown: 5,
    role: 0,
    noPrefix: true
  },

  onStart: async () => {},

  onChat: async ({ event, message }) => {
    const text = event.body?.trim();
    if (!text || !text.startsWith("😒")) return;

    const audioPath = path.join(__dirname, "Aryan", "sad.mp3");
    if (!fs.existsSync(audioPath)) {
      return message.reply("❌ Audio file not found: scripts/cmds/Aryan/sad.mp3");
    }

    await message.reply({
      body: "এঁভাঁবেঁ তাঁকাঁসঁ নাঁ প্রেঁমেঁ পঁরেঁ যাঁবোঁ 😚🥀",
      attachment: fs.createReadStream(audioPath)
    });

    message.react("😁");
  }
};