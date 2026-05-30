/**
 * 📡 RADIO-FREEDOM: PHYSICAL KEYBOARD SHORTWAVE TUNER (Section 23)
 * JSON Repository Edition - Clean, zero-collision terminal hotswapping.
 */
(function() {
    console.log("[*] Keyboard Channel Tuner Deck Active. (Keys 1-5 Ready)...");

    // 🕹️ OPERATOR CHANNEL PRESETS - Maps numbers strictly to your JSON filenames!
    const CHANNEL_REGISTRY = {
        "1": { name: "Sci Fi",               file: "Twilight-zone.json" },
        "2": { name: "Suspense",             file: "Suspense.json" }, 
        "3": { name: "Murder By Experts",    file: "Murder_By_Experts.json" },
        "4": { name: "Virus 1980 Trailer",    file: "infected.json" },
        "5": { name: "Movies / 2000 Plus",   file: "2000-Plus.json" } // ⚡ Your high-speed target!
    };

    window.addEventListener("keydown", function(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;

        const pressedKey = event.key;
        
        if (CHANNEL_REGISTRY.hasOwnProperty(pressedKey)) {
            const target = CHANNEL_REGISTRY[pressedKey];
            console.log(`⚡ Tuning Key [${pressedKey}] -> Switching File To: ${target.name} [${target.file}]`);

            // 1. Rewrite the master global variable before main.js reads it
            window.currentCollection = target.file;

            // 2. Flash the display text panel to notify the operator
            const monitor = document.getElementById("trackTitle") || document.getElementById("stationLabel");
            if (monitor) monitor.innerText = `[ TUNING BAND ${pressedKey}: ${target.name.toUpperCase()} ]`;

            // 3. Force immediate playback re-initialisation inside your main.js core
            const connectBtn = document.getElementById("playButton");
            if (connectBtn) {
                console.log("🚀 Actuating main hardware power switch...");
                connectBtn.click(); 
            }
        }
    });
})();


