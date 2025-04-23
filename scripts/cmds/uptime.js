const os = require("os");
const fs = require("fs");
const path = require("path");
const si = require("systeminformation");
const moment = require("moment-timezone");
const { performance } = require("perf_hooks");

const configPath = path.resolve(__dirname, "../config.json");
const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, "utf-8")) : {};

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt"],
    version: "1.5",
    author: "Nirob",
    role: 0,
    shortDescription: { en: "Show system & bot info" },
    longDescription: { en: "Displays bot uptime and system status" },
    category: "owner",
    guide: { en: "Use command: uptime" },
    envConfig: config
  },

  onStart: async function ({ api, event, usersData, threadsData }) {
    try {
      const botName = config.nickNameBot || "KAKASHI BOT";
      const botPrefix = config.prefix || "/";
      const now = moment().tz(config.timeZone || "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");

      // Safe defaults
      let cpuModel = "N/A", ramTotal = "N/A", ramUsed = "N/A", load = "N/A", gpuModel = "N/A", diskUsed = "N/A", diskTotal = "N/A";

      try {
        const [cpu, mem, currentLoad, disk, gpu] = await Promise.all([
          si.cpu(),
          si.mem(),
          si.currentLoad(),
          si.fsSize(),
          si.graphics()
        ]);

        cpuModel = `${cpu.manufacturer} ${cpu.brand}`;
        ramTotal = (mem.total / 1e9).toFixed(1);
        ramUsed = (mem.used / 1e9).toFixed(1);
        load = currentLoad.currentload.toFixed(1) + "%";
        gpuModel = gpu.controllers[0]?.model || "N/A";
        diskUsed = (disk[0]?.used / 1e9).toFixed(1);
        diskTotal = (disk[0]?.size / 1e9).toFixed(1);
      } catch (err) {
        console.warn("Some system info could not be loaded:", err.message);
      }

      const [users, threads] = await Promise.all([
        usersData.getAll(),
        threadsData.getAll()
      ]);

      const pingStart = performance.now();
      await new Promise(r => setTimeout(r, 100));
      const ping = (performance.now() - pingStart).toFixed(1);

      const msg = `
=== ${botName} STATUS ===

[ Bot Info ]
• Name: ${botName}
• Prefix: ${botPrefix}
• Time: ${now}
• Ping: ${ping}ms

[ System Info ]
• Uptime: ${formatUptime(os.uptime())}
• CPU: ${cpuModel}
• RAM: ${ramUsed} / ${ramTotal} GB
• Disk: ${diskUsed} / ${diskTotal} GB
• GPU: ${gpuModel}
• Load: ${load}
• Users: ${users.length}, Threads: ${threads.length}
`.trim();

      const video = await global.utils.getStreamFromURL("https://files.catbox.moe/9nx2wx.mp4");

      await api.sendMessage({
        body: msg,
        attachment: video
      }, event.threadID);
    } catch (err) {
      console.error("uptime command failed:", err);
      api.sendMessage("Something went wrong while loading system info.", event.threadID);
    }
  }
};
