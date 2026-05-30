/**
 * 📡 RADIO-FREEDOM: GHOST CHANNEL INJECTOR ENGINE (Section 23)
 * Manual Manifest Edition - Clean, zero-collision terminal hotswapping.
 */
(function() {
    print("[*] Init Ghost Channel Injector Deck... Manual manifest portal online.");

    // ===================================================================
    // 🕹️ OPERATOR MANUAL REGISTRY CONTROL MATRIX
    // Add, remove, or edit your channel files here. The layout builds itself!
    // ===================================================================
    const STATION_REGISTRY = [
        { name: "Sci Fi",               file: "Twilight-zone.json" },
        { name: "Suspense",             file: "Suspense.json" },
        { name: "Murder By Experts",    file: "Murder_By_Experts.json" },
        { name: "Mysterious Traveler",  file: "Mysterious-Traveler.json" },
        { name: "Movies / 2000 Plus",   file: "2000-Plus.json" },
        { name: "BBC Sci-Fi",           file: "BBC.json" },
        { name: "Sci-Fi Radio",         file: "Sci-fi-Radio.json" },
        { name: "Lord of the Rings",    file: "lord-of-the-rings.json" },
        { name: "Sherlock Holmes",      file: "sherlock.json" },
        { name: "Haunted BBC",          file: "Haunted-BBC.json" },
        { name: "Alfred Hitchcock",     file: "Alfred-Hitchcock.json" },
        { name: "Ray Bradbury",         file: "Ray-Bradbury.json" },
        
        // ⚡ PASTE YOUR NEW CHANNEL EXPANSION SLOTS HERE NATIVELY:
        { name: "Infected Vault",       file: "infected.json" }
    ];

    // 🗄️ GATE 1: CREATE BOX STYLES IN BROWSER MEMORY
    const styleNode = document.createElement("style");
    styleNode.textContent = `
        /* CRT Ghost Terminal Lightbox */
        .ghost-matrix-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 5, 0, 0.85);
            backdrop-filter: blur(4px);
            z-index: 10000;
            display: flex; justify-content: center; align-items: center;
            font-family: 'Courier New', monospace;
            opacity: 0; transition: opacity 0.25s ease-in-out;
            pointer-events: none;
        }
        .ghost-matrix-overlay.active {
            opacity: 1; pointer-events: auto;
        }
        .ghost-matrix-box {
            background: #030;
            border: 2px solid #0f0;
            box-shadow: 0 0 20px #0a0, inset 0 0 10px #040;
            width: 90%; max-width: 500px;
            padding: 20px; text-align: center;
            border-radius: 4px;
        }
        .ghost-matrix-header {
            color: #0f0; font-size: 1.2rem; font-weight: bold;
            text-shadow: 0 0 5px #0f0; margin-bottom: 15px;
            border-bottom: 1px dashed #0f0; padding-bottom: 10px;
        }
        .ghost-matrix-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
            max-height: 300px; overflow-y: auto; margin-bottom: 15px;
            padding-right: 5px;
        }
        .ghost-matrix-grid::-webkit-scrollbar { width: 6px; }
        .ghost-matrix-grid::-webkit-scrollbar-thumb { background: #0f0; }
        .ghost-matrix-row {
            background: #010; border: 1px solid #060; color: #0a0;
            padding: 10px; cursor: pointer; border-radius: 3px;
            text-align: left; transition: all 0.2s ease;
            font-size: 0.85rem; overflow: hidden; text-overflow: ellipsis;
        }
        .ghost-matrix-row:hover {
            background: #0f0; color: #000; box-shadow: 0 0 8px #0f0;
        }
        .ghost-matrix-close {
            background: transparent; border: 1px solid #f00; color: #f00;
            padding: 6px 15px; cursor: pointer; font-family: inherit;
            margin-top: 10px; transition: all 0.2s;
        }
        .ghost-matrix-close:hover { background: #f00; color: #000; }
    `;
    document.head.appendChild(styleNode);

    // 🏗️ GATE 2: BUILD DOM SECTOR VISUALS
    const overlay = document.createElement("div");
    overlay.className = "ghost-matrix-overlay";
    overlay.id = "ghostMatrixOverlay";

    const box = document.createElement("div");
    box.className = "ghost-matrix-box";

    const header = document.createElement("div");
    header.className = "ghost-matrix-header";
    header.innerText = "📡 RADIO-FREEDOM: STATIONS MATRIX";

    const grid = document.createElement("div");
    grid.className = "ghost-matrix-grid";

    const closeBtn = document.createElement("button");
    closeBtn.className = "ghost-matrix-close";
    closeBtn.innerText = "[ CLOSE OVERRIDE PANEL ]";
    closeBtn.onclick = hideMatrix;

    box.appendChild(header);
    box.appendChild(grid);
    box.appendChild(closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // 🎛️ CONTROLLER FUNCTION BLOCKS
    function showMatrix() {
        grid.innerHTML = ""; // Clear active array data out completely
        
        // Loop through the manual Top Registry array
        STATION_REGISTRY.forEach((chan, index) => {
            const row = document.createElement("div");
            row.className = "ghost-matrix-row";
            row.innerHTML = `[${index + 1}] ${chan.name}`;
            row.onclick = () => injectChannelPayload(chan.file, chan.name);
            grid.appendChild(row);
        });
        
        overlay.classList.add("active");
    }

    function hideMatrix() {
        overlay.classList.remove("active");
    }

    // 🚀 THE OVERRIDE INJECTION CORE MECHANISM
    function injectChannelPayload(targetJsonUrl, channelName) {
        console.log(`📡 Ghost Intercept: Forcing source stream to -> ${targetJsonUrl}`);
        hideMatrix();

        const monitor = document.getElementById("trackTitle") || document.getElementById("stationLabel");
        if (monitor) monitor.innerText = `[ LOADING PORTAL: ${channelName.toUpperCase()} ]`;

        // Connect with the repository JSON file string data array
        fetch(targetJsonUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP rejection code ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.mp3s)) {
                    
                    // 🛡️ FLOOD EVERY POSSIBLE MEMORY SLOT VARIABLE NAME AT THE SAME TIME
                    window.mp3List = [...data.mp3s];
                    window.activeStreamingDeck = [...data.mp3s];
                    window.playlist = [...data.mp3s];
                    if (typeof window.tracks !== 'undefined') window.tracks = [...data.mp3s];

                    // Reset track index loops
                    window.currentTrackIndex = 0;
                    if (typeof window.currentTrack !== 'undefined') window.currentTrack = 0;

                    // ⚡ FORCE IMMEDATE CORE PLAYBACK EVENTS INSIDE main.js
                    if (typeof window.loadPlaylist === 'function') {
                        window.loadPlaylist(data.mp3s);
                    } else if (typeof window.playNextStreamTrack === 'function') {
                        window.playNextStreamTrack();
                    } else if (typeof window.playTrack === 'function') {
                        window.playTrack(0);
                    } else {
                        // Force a click on the base Connect hardware toggle button if play matches a user interaction flag
                        const trigger = document.getElementById("playButton");
                        if (trigger) trigger.click();
                    }
                    
                    console.log(`✅ [SUCCESS] Frequency lock stable on channel: ${channelName}`);
                }
            })
            .catch(err => {
                console.error("❌ Injection Matrix Collapse: Failed to parse target playlist.", err);
                if (monitor) monitor.innerText = "[ SOURCE FREQUENCY OFFLINE ]";
            });
    }

    // Mount to window object context to handle button interaction events
    window.RadioFreedomGhostDeck = {
        openSelector: showMatrix,
        closeSelector: hideMatrix
    };
})();

