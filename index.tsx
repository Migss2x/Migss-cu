/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Priv Network Scanner
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";

const settings = definePluginSettings({
  scanInterval: {
    type: OptionType.NUMBER,
    default: 2000,
    description: "Scan interval (ms)",
  },
});

function randomIP() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function randomPing() {
  return Math.floor(Math.random() * 180) + 20;
}

export default definePlugin({
  name: "Migss-Priv Network Scanner",
  description: "Fake hacker-style network scanner that works in calls",
  authors: [
    { name: "Migssgpt", id: 899938384120807454n },
  ],

  overlay: null as HTMLDivElement | null,
  interval: null as any,
  observer: null as MutationObserver | null,

  onStart() {
    // Create overlay UI
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      right: "15px",
      top: "15px",
      width: "350px",
      height: "420px",
      background: "rgba(0,0,0,0.88)",
      color: "#00ff9c",
      fontFamily: "monospace",
      fontSize: "12px",
      border: "2px solid #00ff9c",
      borderRadius: "6px",
      padding: "8px",
      zIndex: "9999",
      overflowY: "auto",
      boxShadow: "0 0 25px #00ff9c",
    });

    overlay.innerHTML = `<div style="text-align:center;font-weight:bold;">MIGSS NETWORK SCANNER</div>`;
    document.body.appendChild(overlay);
    this.overlay = overlay;

    // scanning function
    const doScan = () => {
      if (!this.overlay) return;

      // Find visible call panel dynamically
      const callPanel = document.querySelector(
        '[class*="voiceParticipants"], [class*="callParticipants"], [class*="call-"]'
      );

      const container = document.createElement("div");

      if (!callPanel) {
        container.innerText = "> Join a voice call to begin scanning…";
      } else {
        // Collect visible usernames
        const nameEls = callPanel.querySelectorAll('span, div');
        const names = new Set<string>();

        nameEls.forEach(el => {
          const t = el.textContent?.trim();
          if (t && t.length < 30) names.add(t);
        });

        if (names.size === 0) {
          container.innerText = "> Couldn’t read call users… waiting…";
        } else {
          for (const user of Array.from(names)) {
            const ip = randomIP();
            const ping = randomPing();
            const row = document.createElement("div");
            row.innerText = `[SCAN] ${user} :: ${ip} :: ${ping}ms`;
            container.appendChild(row);
          }
        }
      }

      // separator
      const sep = document.createElement("div");
      sep.style.opacity = "0.4";
      sep.innerText = "---------------------------";

      this.overlay.appendChild(sep);
      this.overlay.appendChild(container);
      this.overlay.scrollTop = this.overlay.scrollHeight;
    };

    // run first scan
    doScan();

    // run scan at interval
    this.interval = setInterval(doScan, settings.store.scanInterval);

    // observe DOM changes to detect call panel dynamically
    const observer = new MutationObserver(() => {
      doScan();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    this.observer = observer;
  },

  onStop() {
    clearInterval(this.interval);
    if (this.observer) this.observer.disconnect();
    if (this.overlay) this.overlay.remove();
  }
});
