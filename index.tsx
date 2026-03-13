/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Priv Network Scanner
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

function randomIP() {
    return `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
}

function randomPing() {
    return Math.floor(Math.random()*160)+20;
}

export default definePlugin({
    name: "Migss-Priv Network Scanner",
    description: "Fake hacker style scanner for voice calls",
    authors: [
        { name: "Migssgpt", id: 899938384120807454n }
    ],

    overlay: null as HTMLDivElement | null,
    interval: null as any,

    onStart() {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.right = "15px";
        overlay.style.top = "15px";
        overlay.style.width = "320px";
        overlay.style.height = "420px";
        overlay.style.background = "rgba(0,0,0,0.85)";
        overlay.style.color = "#00ff88";
        overlay.style.fontFamily = "monospace";
        overlay.style.fontSize = "12px";
        overlay.style.border = "1px solid #00ff88";
        overlay.style.borderRadius = "8px";
        overlay.style.padding = "10px";
        overlay.style.zIndex = "9999";
        overlay.style.boxShadow = "0 0 20px #00ff88";
        overlay.style.overflowY = "auto";

        overlay.innerHTML = `
        <div style="text-align:center;font-weight:bold;margin-bottom:8px;">
        MIGSS NETWORK SCANNER
        </div>
        `;

        document.body.appendChild(overlay);

        this.overlay = overlay;

        const scan = () => {

            if (!this.overlay) return;

            const users = Array.from(document.querySelectorAll("[class*=voice]"))
                .map(x => x.textContent?.trim())
                .filter(Boolean)
                .slice(0,10);

            const container = document.createElement("div");

            if (users.length === 0) {
                container.innerHTML = `> waiting for voice channel...`;
            }

            users.forEach(user => {

                const ip = randomIP();
                const ping = randomPing();

                const row = document.createElement("div");

                row.innerText = `[SCAN] ${user} :: ${ip} :: ${ping}ms`;

                container.appendChild(row);

            });

            const line = document.createElement("div");
            line.style.opacity = "0.4";
            line.innerText = "----------------------------";

            this.overlay.appendChild(line);
            this.overlay.appendChild(container);

            this.overlay.scrollTop = this.overlay.scrollHeight;

        };

        scan();

        this.interval = setInterval(scan, 2500);
    },

    onStop() {

        clearInterval(this.interval);

        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }

    }
});
