/**
 * 📡 RADIO-FREEDOM: PHYSICAL KEYBOARD SHORTWAVE TUNER (Section 23)
 * Manual Collection Swapper Edition - Clean, zero-collision terminal hotswapping.
 */
(function() {
    console.log("[*] Keyboard Collection Tuner Deck Active. (Keys 1-5 Ready)...");

    // 🕹️ OPERATOR COLLECTION Presets - Maps numbers straight to your Archive.org slugs!
    const COLLECTION_REGISTRY = {
        "1": { name: "Alan Watts Collection", slug: "alanwattscollection" },
        "2": { name: "Outer Limits Mix",       slug: "the-magic-roundabout-acid-big-beat-mix-120-bpm" }, 
        "3": { name: "Virus 1980 Trailer",    slug: "virus-1980-trailer" },
        "4": { name: "Blade Runner Sound",    slug: "blade-runner-soundscape" },
        "5": { name: "2000 Plus Radio",       slug: "2000-plus-json-repository" } // Put whatever collection slug you want here
    };

    window.addEventListener("keydown", function(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;

        const pressedKey = event.key;
        
        if (COLLECTION_REGISTRY.hasOwnProperty(pressedKey)) {
            const target = COLLECTION_REGISTRY[pressedKey];
            console.log(`⚡ Tuning Key [${pressedKey}] -> Switching Collection To: ${target.name} [${target.slug}]`);

            // 1. Rewrite the master variable before main.js can check it
            window.currentCollection = target.slug;

            // 2. Flash the CRT display panel text to notify the operator
            const monitor = document.getElementById("trackTitle") || document.getElementById("stationLabel");
            if (monitor) monitor.innerText = `[ TUNING COLLECTION ${pressedKey}: ${target.name.toUpperCase()} ]`;

            // 3. Force immediate playback re-initialisation inside your main.js core
            // We simulate a mouse click on your physical 'Connect' button to trigger a clean reboot
            const connectBtn = document.getElementById("playButton");
            if (connectBtn) {
                console.log("🚀 Actuating main hardware power switch...");
                connectBtn.click(); 
            }
        }
    });
})();

