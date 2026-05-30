(() => {
    // 🧠 CONFIGURATION ROSTER: Compile every single database file in the network
    const DATABASE_ROSTER = [
        "load.json",
        "jingles.json",
        "Twilight-zone.json",
        "Suspense.json",
        "Murder_By_Experts.json",
        "Mysterious-Traveler.json",
        "2000-Plus.json",
        "BBC.json",
        "Sci-fi-Radio.json",
        "lord-of-the-rings.json",
        "sherlock.json",
        "Haunted-BBC.json",
        "Alfred-Hitchcock.json",
        "Ray-Bradbury.json"
    ];

    // 🔨 STEP 1: Dynamically mount the tracking HUD overlay element into the DOM
    const counterBadge = document.createElement('div');
    counterBadge.id = 's27-global-hud-counter';
    
    // Strict retro CRT cockpit styling parameters
    const HUD_STYLES = {
        position: 'fixed',
        bottom: '15px',
        right: '15px',
        background: 'rgba(0, 5, 0, 0.9)',
        color: '#00ff00',
        border: '1px solid #005500',
        borderRadius: '4px',
        padding: '6px 10px',
        fontFamily: "'Courier New', monospace",
        fontSize: '11px',
        fontWeight: 'bold',
        textShadow: '0 0 4px rgba(0, 255, 0, 0.6)',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.15), inset 0 0 4px rgba(0, 255, 0, 0.2)',
        zIndex: '10000',
        pointerEvents: 'none', // Passes clicks straight through so it never blocks elements underneath
        letterSpacing: '1px'
    };
    Object.assign(counterBadge.style, HUD_STYLES);
    counterBadge.innerHTML = `📦 MATRIX VOL: <span style="color:#ffff33;">SCANNING...</span>`;
    document.body.appendChild(counterBadge);

      // 📡 STEP 2: Asynchronous Multi-Channel Summation Engine [STABLE ARCHITECTURE]
    async function calculateGlobalMatrixVolume() {
        console.log("📡 S27 Counter Node: Commencing global network inventory scan...");

        // Spin up parallel fetch queries to hit all server endpoints at once
        const scanPromises = DATABASE_ROSTER.map(fileUrl => 
            // Cache-buster added here to smash GitHub CDN latency loops (?t=)
            fetch(`${fileUrl}?t=${new Date().getTime()}`)
                .then(res => {
                    if (!res.ok) throw new Error(`Node offline: ${fileUrl}`);
                    return res.json();
                })
                .then(data => {
                    let entriesCount = 0;
                    if (data) {
                        if (Array.isArray(data.mp3s)) {
                            entriesCount = data.mp3s.length;
                        } else if (Array.isArray(data)) {
                            entriesCount = data.length;
                        }
                    }
                    console.log(`📊 Node Scan Completed: ${fileUrl} -> ${entriesCount} tracks.`);
                    return entriesCount; // Return the local integer safely to the thread bucket
                })
                .catch(err => {
                    console.warn(`⚠️ S27 Scan Note: Skipping inactive matrix path: ${fileUrl}`);
                    return 0; // Return zero if node fails to prevent total calculator collapse
                })
        );

        // Wait for all network threads to resolve completely into a stable list of counts
        const trackCountsArray = await Promise.all(scanPromises);

        // Calculate absolute total tracks in one single, isolated math block
        const absoluteTotalTracks = trackCountsArray.reduce((sum, count) => sum + count, 0);

        // 🎛️ STEP 3: Print the compiled tally to the HUD display pane
        const formattedTotal = absoluteTotalTracks.toLocaleString();
        counterBadge.innerHTML = `📦 MATRIX VOL: <span style="color:#ffffff; text-shadow: 0 0 6px #00ff00;">${formattedTotal}</span> TOTAL LNKS`;
        console.log(`⚡ S27 Inventory Core Finalized: ${absoluteTotalTracks} total active links verified.`);
    }

        // Wait for all network threads to resolve completely
        await Promise.all(scanPromises);

        // 🎛️ STEP 3: Print the compiled tally to the HUD display pane
        // Commas formatting added to make thousands pop cleanly on the screen (e.g., 2,642)
        const formattedTotal = absoluteTotalTracks.toLocaleString();
        counterBadge.innerHTML = `📦 MATRIX VOL: <span style="color:#ffffff; text-shadow: 0 0 6px #00ff00;">${formattedTotal}</span> TOTAL LNKS`;
        console.log(`⚡ S27 Inventory Core Finalized: ${absoluteTotalTracks} total active links verified.`);
    }

    // Trigger the scanner immediately at cold boot sequence
    if (document.readyState === 'complete') {
        calculateGlobalMatrixVolume();
    } else {
        window.addEventListener('load', calculateGlobalMatrixVolume);
    }
})();
