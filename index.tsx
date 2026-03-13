/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Test Overlay
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
  name: "Migss-Test Overlay",
  description: "Super simple test plugin to verify Vencord plugins",
  authors: [
    { name: "Migssgpt", id: 899938384120807454n }
  ],

  overlay: null as HTMLDivElement | null,

  onStart() {
    // Create a simple overlay box
    const overlay = document.createElement("div");
    overlay.innerText = "✅ Migss-Test Plugin is running!";
    Object.assign(overlay.style, {
      position: "fixed",
      top: "50px",
      left: "50px",
      background: "#111",
      color: "#0f0",
      padding: "10px",
      fontFamily: "monospace",
      fontSize: "14px",
      border: "1px solid #0f0",
      borderRadius: "5px",
      zIndex: "9999",
    });

    document.body.appendChild(overlay);
    this.overlay = overlay;
  },

  onStop() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
});
