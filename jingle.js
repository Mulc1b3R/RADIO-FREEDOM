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
    let jingleBreakPending = false;         // Soft-gate boolean latch flag
    let savedShowTrack = null;              // State memory buffer to trap the next scheduled show track

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
            if (!jingleBreakPending) {
                jingleBreakPending = true;
                console.log("🛰️ [SYSTEM CRON STATUS ALERT]: 30-Minute Broadcast Cycle Met. Intercept Latch ARMED for track transition.");
            }
        }, TIME_LIMIT_MS);
        
        console.log("⏱️ S26 Timing Core Active: Automated background commercial scheduler ticking.");
    }

    // 🔀 FUNCTION 4: The Core Event Intercept Hook Override Matrix
    function injectAutomatedJingleBreak(event) {
        // Safe check: If no jingle break is armed or no files exist, skip out and let original scripts play next song
        if (!jingleBreakPending || masterJingleLibrary.length === 0) return;

        // 🛑 STOP PREVENTATIVE FALLTHROUGH: Intercept the native HTML5 player trajectory queue
        event.stopImmediatePropagation();
        console.log("⚡ [TACTICAL INTERCEPT RUNNING]: Overriding native playNextStreamTrack event sequence.");

        // If the main depletion deck has already queued up a song path, trap it in our safety buffer
        if (player.src && !player.src.includes('jingles.json')) {
            // Note: If you want to grab the upcoming track out of activeStreamingDeck instead, do it here
            if (typeof activeStreamingDeck !== 'undefined' && activeStreamingDeck.length > 0) {
                savedShowTrack = activeStreamingDeck[0]; // Peek at upcoming path
            }
        }

        // Pull the top asset cleanly out of the active linear memory depletion grid
        if (activeJingleDeck.length === 0) {
            replenishAndShuffleJingleDeck();
        }
        const targetJingle = activeJingleDeck.shift();

        // Parse a highly descriptive label tracking filename attributes out of the raw link slug
        const filename = decodeURIComponent(targetJingle).split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');

        // 🎛️ INJECT COMPOSITE STATE INTO MAIN TERMINAL
        display.innerHTML = `<span style="color:#ffcc00; animation: blink 1.5s infinite;">📡 [COMMERCIAL INTERCEPT INTERMISSION]</span><br><span style="font-size:11px;color:#888;">MID-CENTURY ADVERTISING ARCHIVE VINTAGE RETROSPECTIVE:</span><br><span style="color:#ffffff;">${filename.toUpperCase()}</span>`;
        
        // Temporarily step down the visualizer buttons or alter tracking indicators if needed
        deactivateTacticalButtons(true);

        // Remove this custom end handler so it doesn't cause loop recursion pile-ups
        player.removeEventListener('ended', handleJinglePlaythroughComplete);
        // Bind the post-ad restitution protocol directly to the audio card node
        player.addEventListener('ended', handleJinglePlaythroughComplete);

        // Slam jingle directly into carrier wave channels and force immediate play sequence
        player.src = targetJingle;
        player.play().catch(e => console.warn("S23 Audio Context buffer lock handled."));

        // Clear the switch so the clock tracking algorithm resets for the next 30-minute block loop
        jingleBreakPending = false;
    }

    // 🔄 FUNCTION 5: Restitution Protocol (Snapping Back to Master Show Timeline)
    function handleJinglePlaythroughComplete() {
        console.log("🔄 S26 Restitution Routine Active: Commercial break completed. Retracting intercept gates.");
        player.removeEventListener('ended', handleJinglePlaythroughComplete);

        // Restore operational state permissions to right-flank hardware selectors
        deactivateTacticalButtons(false);

        // Re-align display terminal text feedback parameters
        display.textContent = "📡 Re-syncing master station transmission node sequence...";

        // If the master player script block functions exist, trigger them natively to restore playlist state
        if (typeof playNextStreamTrack === 'function') {
            console.log("🔌 Re-linking to main depletion deck sequencer...");
            playNextStreamTrack();
        } else {
            // Hard fallback if the standard app thread was broken or lost trace coordinates
            if (savedShowTrack) {
                player.src = savedShowTrack;
                player.play().catch(e => {});
                savedShowTrack = null;
            }
        }
    }

    // 🎚️ AUXILIARY HELPER: Protects Metadata / Like Radar tracking states during commercial slots
    function deactivateTacticalButtons(lockActive) {
        const metaBtn = document.getElementById('s23-meta-probe-btn');
        const radarBtn = document.getElementById('s25-radar-find-btn');
        
        if (lockActive) {
            if (metaBtn) { metaBtn.style.opacity = "0.3"; metaBtn.style.pointerEvents = "none"; }
            if (radarBtn) { radarBtn.style.opacity = "0.3"; radarBtn.style.pointerEvents = "none"; }
        } else {
            if (metaBtn) { metaBtn.style.opacity = "1"; metaBtn.style.pointerEvents = "auto"; }
            if (radarBtn) { radarBtn.style.opacity = "1"; radarBtn.style.pointerEvents = "auto"; }
        }
    }

    // 🔗 DYNAMIC HIGH-PRIORITY TERMINAL INTERCEPT INJECTION POINT
    // We attach this directly onto the player audio end node so it listens BEFORE original loop handlers
    player.addEventListener('ended', injectAutomatedJingleBreak, true);

    // Boot the async database synchronization compiler process
    initializeJingleSystem();
})();