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

    const audioUrl = "http://aryan-xy.onrender.com/raw/VzJbDKeY.mp3";

    try {
      await message.reply({
        body: "তোমার মন খারাপ কেন? 😒🥲",
        attachment: await global.utils.getStreamFromURL(audioUrl)
      });
      message.react("😁");
    } catch (err) {
      console.error(err);
    }
  }
};