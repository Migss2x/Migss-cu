/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Priv Network Scanner
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";

const settings = definePluginSettings({
    enableScanner: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Enable the fake network scanner overlay"
    },

    scanInterval: {
        type: OptionType.NUMBER,
        default: 2500,
        description: "Interval between scans (ms)"
    }
});

function randomIP() {
    return `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
}

function randomPing() {
    return Math.floor(Math.random() * 180) + 10;
}

export default definePlugin({
    name: "Migss-Priv/NS",
    description: "VCNS",
    authors: [
        { name: "Migssgpt", id: 899938384120807454n }
    ],

    settings,

    overlay: null as HTMLDivElement | null,
    interval: null as any,

    onStart() {

        if (!settings.store.enableScanner) return;

        const overlay = document.createElement("div");

        overlay.id = "migss-scanner";

        overlay.style.position = "fixed";
        overlay.style.right = "15px";
        overlay.style.top = "15px";
        overlay.style.width = "340px";
        overlay.style.height = "420px";
        overlay.style.background = "rgba(0,0,0,0.88)";
        overlay.style.color = "#00ff9c";
        overlay.style.fontFamily = "monospace";
        overlay.style.fontSize = "12px";
        overlay.style.border = "1px solid #00ff9c";
        overlay.style.borderRadius = "8px";
        overlay.style.padding = "10px";
        overlay.style.zIndex = "9999";
        overlay.style.boxShadow = "0 0 25px #00ff9c";
        overlay.style.overflowY = "auto";

        const header = document.createElement("div");
        header.innerText = "MIGSS NETWORK SCANNER";
        header.style.textAlign = "center";
        header.style.marginBottom = "8px";
        header.style.fontWeight = "bold";

        overlay.appendChild(header);

        const toggle = document.createElement("button");
        toggle.innerText = "HIDE";
        toggle.style.width = "100%";
        toggle.style.marginBottom = "8px";
        toggle.style.background = "#001b12";
        toggle.style.border = "1px solid #00ff9c";
        toggle.style.color = "#00ff9c";
        toggle.style.cursor = "pointer";

        toggle.onclick = () => {
            overlay.style.display = overlay.style.display === "none" ? "block" : "none";
        };

        overlay.appendChild(toggle);

        document.body.appendChild(overlay);

        this.overlay = overlay;

        const scanUsers = () => {

            if (!this.overlay) return;

            const container = document.createElement("div");

            const voiceUsers = document.querySelectorAll("[class*=voiceUser]");

            const users: string[] = [];

            voiceUsers.forEach((node: any) => {
                const name = node.innerText;
                if (name) users.push(name);
            });

            if (users.length === 0) {
                container.innerHTML = `<div>Scanning voice channel...</div>`;
            }

            users.forEach(user => {

                const ip = randomIP();
                const ping = randomPing();

                const row = document.createElement("div");

                row.innerText =
                    `[SCAN] ${user} :: ${ip} :: ${ping}ms`;

                container.appendChild(row);

            });

            const scanLine = document.createElement("div");
            scanLine.innerText = "---------------------------";
            scanLine.style.opacity = "0.4";

            this.overlay.appendChild(scanLine);
            this.overlay.appendChild(container);

            this.overlay.scrollTop = this.overlay.scrollHeight;

        };

        scanUsers();

        this.interval = setInterval(scanUsers, settings.store.scanInterval);
    },

    onStop() {

        clearInterval(this.interval);

        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
    }
});
