/**
 * 📡 RADIO-FREEDOM: PHYSICAL KEYBOARD SHORTWAVE TUNER (Section 23)
 * Maps physical number keys 1-9 to your 12 preset channels grid-free.
 */
(function() {
    console.log("[*] Keyboard Tuner Deck Active. Awaiting Shortwave Input (Keys 1-9)...");

    // Listen to the entire browser window for a physical key press
    window.addEventListener("keydown", function(event) {
        
        // If user is typing in an input box (if you ever add one), don't trigger the tuner
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            return;
        }

        // Convert the key pressed into a number slot (Keys '1' through '9')
        const pressedKey = event.key;
        
        // Ensure the key pressed exists inside your 12 preset channels array
        if (window.PRESET_CHANNELS && window.PRESET_CHANNELS.hasOwnProperty(pressedKey)) {
            
            const targetChannel = window.PRESET_CHANNELS[pressedKey];
            executeTunerSwitch(targetChannel.url, targetChannel.name, pressedKey);
        }
    });

    // 🚀 THE OVERRIDE CORE: HOT-SWAP DATA STREAMS IN MEMORY
    function executeTunerSwitch(jsonUrl, channelName, slotNumber) {
        console.log(`⚡ Shortwave Intercept: Tuning Key [${slotNumber}] -> ${channelName} (${jsonUrl})`);

        // Target your station's text label to show the operator the system is changing channels
        const monitor = document.getElementById("trackTitle") || document.getElementById("stationLabel");
        if (monitor) {
            monitor.innerText = `[ TUNING BAND ${slotNumber}: ${channelName.toUpperCase()} ]`;
        }

        // Connect with the repository JSON file string data array over the network
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP Rejection: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.mp3s)) {
                    
                    // 🛡️ FLOOD ALL POSSIBLE RUNTIME MEMORY SLOTS AT THE SAME TIME
                    window.mp3List = [...data.mp3s];
                    window.activeStreamingDeck = [...data.mp3s];
                    window.playlist = [...data.mp3s];
                    if (typeof window.tracks !== 'undefined') window.tracks = [...data.mp3s];

                    // Reset timeline track index pointers back to zero
                    window.currentTrackIndex = 0;
                    if (typeof window.currentTrack !== 'undefined') window.currentTrack = 0;

                    // ⚡ DETONATE IMMEDIATE AUDIO PLAYBACK IN main.js
                    if (typeof window.loadPlaylist === 'function') {
                        window.loadPlaylist(data.mp3s);
                    } else if (typeof window.playNextStreamTrack === 'function') {
                        window.playNextStreamTrack();
                    } else if (typeof window.playTrack === 'function') {
                        window.playTrack(0);
                    } else {
                        // If player is stopped, programmatically tap your main Connect button to wake it up
                        const connectBtn = document.getElementById("playButton");
                        if (connectBtn) connectBtn.click();
                    }
                    
                    console.log(`✅ [TUNER FIXED] Lock stable on Band [${slotNumber}]: ${channelName}`);
                }
            })
            .catch(err => {
                console.error("❌ Tuner Signal Collapse: Link offline or file missing.", err);
                if (monitor) monitor.innerText = `[ BAND ${slotNumber} SIGNAL LOST ]`;
            });
    }
})();
