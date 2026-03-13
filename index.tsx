/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Priv Test Overlay
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";

const settings = definePluginSettings({
  showOverlay: {
    type: OptionType.BOOLEAN,
    default: true,
    description: "Show test overlay",
  },
});

export default definePlugin({
  name: "Migss-Priv Test",
  description: "Minimal test plugin to verify Vencord plugin system",
  authors: [{ name: "Migssgpt", id: 899938384120807454n }],
  settings,

  // Include a dummy patches array to match working plugin style
  patches: [
    {
      find: "dummy",
      replacement: [
        {
          match: "",
          replace: "",
        },
      ],
    },
  ],

  overlay: null as HTMLDivElement | null,

  onStart() {
    console.log("✅ Migss-Priv Test plugin started!");

    if (!settings.store.showOverlay) return;

    const overlay = document.createElement("div");
    overlay.innerText = "🎉 Migss-Priv plugin is running!";
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
    console.log("🛑 Migss-Priv Test plugin stopped!");
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  },
});
