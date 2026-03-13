/* eslint-disable simple-header/header */
import definePlugin from "@utils/types";

export default definePlugin({
  name: "Migss-Priv Test",
  description: "Minimal console + overlay test plugin",
  authors: [{ name: "Migssgpt", id: 899938384120807454n }],

  overlay: null as HTMLDivElement | null,

  onStart() {
    console.log("✅ Migss-Priv plugin started!");
    alert("✅ Migss-Priv plugin started!");

    // Create overlay
    const overlay = document.createElement("div");
    overlay.innerText = "🎉 Migss-Priv plugin running!";
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
    console.log("🛑 Migss-Priv plugin stopped!");
    alert("🛑 Migss-Priv plugin stopped!");
    if (this.overlay) this.overlay.remove();
  }
});
