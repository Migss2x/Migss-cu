/* eslint-disable simple-header/header */
import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";
import { getModule, React } from "vencord";

const settings = definePluginSettings({
  scanInterval: {
    type: OptionType.NUMBER,
    default: 2000,
    description: "Fake scan interval in ms",
  },
});

function randomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}
function randomPing() {
  return Math.floor(Math.random() * 180) + 10;
}

export default definePlugin({
  name: "Migss-Priv Network Scanner",
  description: "Fake network scanner overlay that works in actual calls",
  authors: [
    { name: "Migssgpt", id: 899938384120807454n }
  ],

  overlay: null as HTMLDivElement | null,
  interval: null as any,

  onStart() {
    const VoiceStates = getModule(["getVoiceStates"], false);
    if (!VoiceStates) return;

    const overlay = document.createElement("div");
    overlay.id = "migss-scanner";
    Object.assign(overlay.style, {
      position: "fixed",
      right: "15px",
      top: "15px",
      width: "340px",
      height: "420px",
      background: "rgba(0,0,0,0.88)",
      color: "#00ff9c",
      fontFamily: "monospace",
      fontSize: "12px",
      border: "1px solid #00ff9c",
      borderRadius: "8px",
      padding: "10px",
      zIndex: "9999",
      boxShadow: "0 0 25px #00ff9c",
      overflowY: "auto",
    });

    const header = document.createElement("div");
    header.innerText = "MIGSS NETWORK SCANNER";
    header.style.textAlign = "center";
    header.style.marginBottom = "8px";
    header.style.fontWeight = "bold";
    overlay.appendChild(header);

    document.body.appendChild(overlay);
    this.overlay = overlay;

    const scanUsers = () => {
      if (!this.overlay) return;
      const container = document.createElement("div");
      const states = VoiceStates.getVoiceStates();

      const users = Object.values(states).map((state: any) => {
        if (state.userId === undefined) return null;
        const user = DiscordAPI.getCurrentUser(state.userId) || { username: `User${state.userId}` };
        return user.username;
      }).filter(Boolean) as string[];

      container.innerHTML = "";
      if (users.length === 0) container.innerHTML = "Scanning... join a voice call!";

      users.forEach(user => {
        const ip = randomIP();
        const ping = randomPing();
        const row = document.createElement("div");
        row.innerText = `[SCAN] ${user} :: ${ip} :: ${ping}ms`;
        container.appendChild(row);
      });

      this.overlay.innerHTML = "";
      this.overlay.appendChild(header);
      this.overlay.appendChild(container);
    };

    scanUsers();
    this.interval = setInterval(scanUsers, settings.store.scanInterval);
  },

  onStop() {
    clearInterval(this.interval);
    this.overlay?.remove();
  }
});
