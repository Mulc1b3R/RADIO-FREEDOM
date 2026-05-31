// ===================================================================
// SECTION 26: AUTOMATED BROADCAST JINGLE INTERCEPT SYSTEM (RE-WELDED)
// Operators: MOJO // MULCIBER -- Modular Deployment Stack
// ===================================================================

(() => {
    // 📡 MASTER AUDIO & TERMINAL HARDWARE ACCESSORS
    const player = document.getElementById('audioPlayer');
    const display = document.getElementById('trackInfo');
    if (!player || !display) {
        console.error("❌ S26 CRITICAL CONFIG: Terminal master audio engine nodes unverified.");
        return;
    }

    // ⏱️ STATE ENGINE VARIABLES
    const TIME_LIMIT_MS = 30 * 60 * 1000;   // Strict 30-minute transitional trigger interval
    let broadcastTimer = null;              // Holds active background interval tracker
    
    // 🔓 SCOPE BRIDGE: Bind state flags to global window context so main.js can read them instantly
    window.jingleBreakPending = false;         
    window.savedShowTrack = null;              

    // 🎲 JINGLE DEPLETION DECK TRACKING CAPACITOR
    let masterJingleLibrary = [];           // Clean raw mirror copy of fetched jingles.json
    let activeJingleDeck = [];              // Shuffled depletion deck loop matrix

    // 🧠 FUNCTION 1: Fetch and Compile the Independent Jingle Manifest Database
    async function initializeJingleSystem() {
        console.log("📡 S26 Matrix Node: Syncing jingles.json broadcast database...");
        try {
            const response = await fetch('jingles.json');
            if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
            const data = await response.json();
            
            if (data && Array.isArray(data.mp3s)) {
                masterJingleLibrary = data.mp3s.slice();
                replenishAndShuffleJingleDeck();
                console.log(`✅ S26 Verification Completed: ${masterJingleLibrary.length} vintage advertising links locked into memory.`);
                
                // Spin up the background countdown clock array immediately
                spinUpBroadcastClock();
            } else {
                console.error("❌ S26 Structure Collision: jingles.json data must format array context inside 'mp3s'.");
            }
        } catch (err) {
            console.warn("⚠️ S26 Initialization Skipped: jingles.json not mapped on host server yet. Standby mode armed.", err);
        }
    }

    // 🎲 FUNCTION 2: Linear Non-Repeating Depletion Shuffle Grid Engine
    function replenishAndShuffleJingleDeck() {
        if (masterJingleLibrary.length === 0) return;
        activeJingleDeck = [...masterJingleLibrary];
        // Mathematical single-pass in-place vector shuffle matrix array rotation
        for (let i = activeJingleDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [activeJingleDeck[i], activeJingleDeck[j]] = [activeJingleDeck[j], activeJingleDeck[i]];
        }
        console.log("🎲 S26 Deck Depletion Protection: Jingles array shuffled. Total zero-repetition cycles locked.");
    }

    // ⏱️ FUNCTION 3: Background System Interval Timer (The Soft Gate)
    function spinUpBroadcastClock() {
        if (broadcastTimer) clearInterval(broadcastTimer);
        
        broadcastTimer = setInterval(() => {
            if (!window.jingleBreakPending) {
                window.jingleBreakPending = true;
                console.log("🛰️ [SYSTEM CRON STATUS ALERT]: 30-Minute Broadcast Cycle Met. Intercept Latch ARMED for track transition.");
            }
        }, TIME_LIMIT_MS);
        
        console.log("⏱️ S26 Timing Core Active: Automated background commercial scheduler ticking.");
    }

    // 🔀 FUNCTION 4: Exposed Action Routine called natively by main.js on track end
    window.injectAutomatedJingleBreak = function() {
        if (!window.jingleBreakPending || masterJingleLibrary.length === 0) return false;

        console.log("⚡ [TACTICAL INTERCEPT RUNNING]: Overriding native playNextStreamTrack event sequence.");

        if (activeJingleDeck.length === 0) {
            replenishAndShuffleJingleDeck();
        }
        const targetJingle = activeJingleDeck.shift();

        const filename = decodeURIComponent(targetJingle).split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');

        // 🎛️ INJECT COMPOSITE STATE INTO MAIN TERMINAL
        display.innerHTML = `<span style="color:#ffcc00; animation: blink 1.5s infinite;">📡 [COMMERCIAL INTERCEPT INTERMISSION]</span><br><span style="font-size:11px;color:#888;">MID-CENTURY ADVERTISING ARCHIVE VINTAGE RETROSPECTIVE:</span><br><span style="color:#ffffff;">${filename.toUpperCase()}</span>`;
        
        // Temporarily step down console navigation buttons to secure the stream during commercial slots
        deactivateTacticalButtons(true);

        // Bind the post-ad restitution protocol directly to the audio card node
        player.removeEventListener('ended', handleJinglePlaythroughComplete);
        player.addEventListener('ended', handleJinglePlaythroughComplete);

        player.src = targetJingle;
        player.play().catch(e => console.warn("S23 Audio Context buffer lock handled."));

        window.jingleBreakPending = false;
        return true; 
    };

    // 🔄 FUNCTION 5: Restitution Protocol (Snapping Back to Master Show Timeline)
    function handleJinglePlaythroughComplete() {
        console.log("🔄 S26 Restitution Routine Active: Commercial break completed. Retracting intercept gates.");
        player.removeEventListener('ended', handleJinglePlaythroughComplete);

        // Restore operational state permissions to console layout controls
        deactivateTacticalButtons(false);

        display.textContent = "📡 Re-syncing master station transmission node sequence...";

        if (typeof window.playNextStreamTrack === 'function') {
            console.log("🔌 Re-linking to main depletion deck sequencer...");
            window.playNextStreamTrack();
        }
    }

    // 🎚️ FIXED AUXILIARY HELPER: Maps exactly to your production index.html button IDs
    function deactivateTacticalButtons(lockActive) {
        const skipBtn = document.getElementById('skipButton');
        const exportBtn = document.getElementById('exportLogButton');
        
        if (lockActive) {
            if (skipBtn) { skipBtn.style.opacity = "0.3"; skipBtn.style.pointerEvents = "none"; }
            if (exportBtn) { exportBtn.style.opacity = "0.3"; exportBtn.style.pointerEvents = "none"; }
        } else {
            if (skipBtn) { skipBtn.style.opacity = "1"; skipBtn.style.pointerEvents = "auto"; }
            if (exportBtn) { exportBtn.style.opacity = "1"; exportBtn.style.pointerEvents = "auto"; }
        }
    }

    // Boot system matrix components on load initialization
    document.addEventListener("DOMContentLoaded", initializeJingleSystem);
})();

