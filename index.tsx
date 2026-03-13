/* eslint-disable simple-header/header */

/*
 * Vencord, a Discord client mod
 * Custom call button plugin
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";

const settings = definePluginSettings({
  showButton: {
    type: OptionType.BOOLEAN,
    default: true,
    description: "Show custom button next to mute button in calls",
  },
});

export default definePlugin({
  name: "Migss-Priv",
  description: "Adds a small button next to the mute button during calls",
  authors: [
    { name: "Migssgpt", id: 899938384120807454n },
  ],
  settings,

  onStart() {
    if (!settings.store.showButton) return;

    // Attempt to patch the call controls
    const CallControlsModule = BdApi.findModuleByDisplayName?.("CallControls");
    if (!CallControlsModule) return;

    this.patch = BdApi.monkeyPatch(CallControlsModule.prototype, "render", {
      after: (args: any, res: any) => {
        try {
          if (!res?.props?.children) return;

          const children = res.props.children;

          const muteIndex = children.findIndex(
            (child: any) => child?.type?.displayName === "MuteButton"
          );

          if (muteIndex !== -1) {
            children.splice(muteIndex + 1, 0, (
              <button
                key="migss-priv-button"
                style={{
                  marginLeft: "8px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#7289da",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => console.log("Migss-Priv button clicked!")}
                title="Migss-Priv"
              >
                🎵
              </button>
            ));
          }
        } catch (e) {
          console.error("Failed to add Migss-Priv button", e);
        }
      }
    });
  },

  onStop() {
    this.patch?.();
  },
});
