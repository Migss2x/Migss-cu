/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Migss-Priv React Overlay (Runtime Window Fix)
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
  name: "Migss-Priv React Overlay",
  description: "Overlay using runtime Vencord to avoid build errors",
  authors: [{ name: "Migssgpt", id: 899938384120807454n }],

  patches: [],

  overlay: null as HTMLDivElement | null,

  onStart() {
    console.log("✅ Migss-Priv React Overlay started!");

    // Use window.Vencord for runtime access
    const Vencord = (window as any).Vencord || {};
    const React = Vencord.React;
    const inject = Vencord.inject;
    const getModuleByDisplayName = Vencord.getModuleByDisplayName;

    if (!React || !inject || !getModuleByDisplayName) {
      console.warn("❌ Could not access Vencord React runtime.");
      return;
    }

    // Find Discord root container
    const Root = getModuleByDisplayName("App") || getModuleByDisplayName("MainView");

    if (!Root) {
      console.warn("❌ Could not find Discord React root.");
      return;
    }

    // Inject a simple React overlay
    inject("migss-priv-overlay", Root, () => {
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

    // Remove overlay if it exists
    const cleanup = document.querySelector('[id="migss-priv-overlay"]');
    if (cleanup) cleanup.remove();
  },
});
