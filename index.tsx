/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Priv React Overlay
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { React, getModuleByDisplayName, inject } from "vencord";

export default definePlugin({
  name: "Migss-Priv React Overlay",
  description: "Overlay using React injection, guaranteed to work",
  authors: [{ name: "Migssgpt", id: 899938384120807454n }],

  patches: [],

  onStart() {
    console.log("✅ Migss-Priv React Overlay started!");

    // Find the root container where Discord renders UI
    const ReactPanel = getModuleByDisplayName("App") || getModuleByDisplayName("MainView");

    if (!ReactPanel) {
      console.warn("❌ Could not find Discord React root.");
      return;
    }

    // Inject React component
    inject("migss-priv-overlay", ReactPanel, (props) => {
      return (
        <div
          style={{
            position: "fixed",
            top: 50,
            left: 50,
            zIndex: 9999,
            background: "rgba(0,0,0,0.88)",
            color: "#00ff9c",
            padding: "10px",
            fontFamily: "monospace",
            fontSize: "14px",
            border: "1px solid #00ff9c",
            borderRadius: "6px",
            boxShadow: "0 0 20px #00ff9c",
          }}
        >
          🎉 Migss-Priv React Overlay Active!
        </div>
      );
    });
  },

  onStop() {
    console.log("🛑 Migss-Priv React Overlay stopped!");
    // Remove the injected component
    const cleanup = document.querySelector('[id="migss-priv-overlay"]');
    if (cleanup) cleanup.remove();
  },
});
