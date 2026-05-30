/**
 * 📡 RADIO-FREEDOM: GHOST CHANNEL INJECTOR ENGINE (Section 23)
 * Standalone plugin module to hot-swap radio source frequencies grid-free.
 */
(function() {
    print("[*] Init Ghost Channel Injector Deck... Awaiting link portal.");

    // 🎛️ GATE 1: CREATE CRUCIBLE STYLES DIRECTLY IN MEMORY
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
        /* Custom CRT Scrollbar */
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

    // 🏗️ GATE 2: BUILD DOM OBJECT ELEMENTS
    const overlay = document.createElement("div");
    overlay.className = "ghost-matrix-overlay";
    overlay.id = "ghostMatrixOverlay";

    const box = document.createElement("div");
    box.className = "ghost-matrix-box";

    const header = document.createElement("div");
    header.className = "ghost-matrix-header";
    header.innerText = "📡 RADIO-FREEDOM: CHANNEL INJECTOR";

    const grid = document.createElement("div");
    grid.className = "ghost-matrix-grid";

    const closeBtn = document.createElement("button");
    closeBtn.className = "ghost-matrix-close";
    closeBtn.innerText = "[ CLOSE TERMINAL ]";
    closeBtn.onclick = hideMatrix;

    box.appendChild(header);
    box.appendChild(grid);
    box.appendChild(closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // 🎛️ CONTROLLER SECTOR INTERFACES
    function showMatrix() {
        // Clear previous rows to handle updates cleanly
        grid.innerHTML = "";
        
        // Dynamically compile slots straight out of the universal window pool
        if (window.PRESET_CHANNELS) {
            Object.keys(window.PRESET_CHANNELS).forEach(key => {
                const chan = window.PRESET_CHANNELS[key];
                const row = document.createElement("div");
                row.className = "ghost-matrix-row";
                row.innerHTML = `[${key}] ${chan.name}`;
                row.onclick = () => injectChannelPayload(chan.url, chan.name);
                grid.appendChild(row);
            });
        } else {
            grid.innerHTML = "<div style='color:#f00; grid-column: 1/3;'>ERROR: PRESET MATRIX LOCKED</div>";
        }
        
        overlay.classList.add("active");
    }

    function hideMatrix() {
        overlay.classList.remove("active");
    }

    // 🚀 THE OVERRIDE INJECTION CORE MECHANISM
    function injectChannelPayload(targetJsonUrl, channelName) {
        console.log(`📡 Ghost Intercept: Injecting source stream -> ${targetJsonUrl}`);
        hideMatrix();

        // Target alert element to inform operator of flash sequence
        const monitor = document.getElementById("trackTitle") || document.getElementById("stationLabel");
        if (monitor) monitor.innerText = `[ INJECTING FREQUENCY: ${channelName.toUpperCase()} ]`;

        // Execute background fetch routine
        fetch(targetJsonUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP rejection code ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.mp3s)) {
                    // Lock global stream variables down tightly
                    // Assumes main.js tracks active playlist array via standard naming
                    if (typeof window.activeStreamingDeck !== 'undefined') {
                        window.activeStreamingDeck = [...data.mp3s];
                    } else if (typeof window.playlist !== 'undefined') {
                        window.playlist = [...data.mp3s];
                    }
                    
                    // Reset matrix indices tracking loops
                    if (typeof window.currentTrackIndex !== 'undefined') window.currentTrackIndex = 0;

                    // Trigger direct audio hardware playback kickstart loop inside main.js
                    if (typeof window.playNextStreamTrack === 'function') {
                        window.playNextStreamTrack();
                    } else if (typeof window.playTrack === 'function') {
                        window.playTrack(0);
                    } else if (typeof window.loadAndPlay !== 'undefined') {
                        // Adaptive safety fallback configurations
                        console.log("⚡ Carrier wave reassigned. Awaiting manual transport click.");
                    }
                    console.log(`✅ [SUCCESS] Frequency lock stable on channel: ${channelName}`);
                }
            })
            .catch(err => {
                console.error("❌ Injection Matrix Collapse: Failed to parse cloud track index.", err);
                if (monitor) monitor.innerText = "[ SOURCE FREQUENCY OFFLINE ]";
            });
    }

    // 🔒 MOUNT GLOBAL CONTEXT CONTROLS FOR HTML HARDWARE INTERFACE BUTTON
    window.RadioFreedomGhostDeck = {
        openSelector: showMatrix,
        closeSelector: hideMatrix
    };
})();
