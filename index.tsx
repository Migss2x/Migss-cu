/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Priv Overlay Test
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";

const settings = definePluginSettings({
  dummySetting: {
    type: OptionType.BOOLEAN,
    default: true,
    description: "Dummy setting for plugin",
  },
});

export default definePlugin({
  name: "Migss-Priv Overlay Test",
  description: "Minimal working overlay to verify plugin is running",
  authors: [{ name: "Migssgpt", id: 899938384120807454n }],
  settings,

  patches: [
    {
      // dummy patch so structure matches working plugin
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
    console.log("✅ Migss-Priv Overlay Test plugin started!");

    // Always create overlay
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
    console.log("🛑 Migss-Priv Overlay Test plugin stopped!");
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  },
});
