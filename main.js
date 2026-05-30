// --- CORE TRANSMISSION MEDIA & VISUAL SPECTROGRAM MATRIX ---
    const audioPlayer = document.getElementById('audioPlayer');
    const trackInfo = document.getElementById('trackInfo');
    const canvas = document.getElementById('visualizerGrid');
    const ctx = canvas.getContext('2d');
    
        // 🔓 Explicitly bypass browser canvas inspection CORS restrictions
    audioPlayer.crossOrigin = "anonymous";

    let masterLibrary = [];       
    let activeStreamingDeck = [];  
    let searchMasterMatrix = [];   // ⚡ SECTOR 23 CUMULATIVE SEARCH MATRIX NODE
    window.sessionLogRegistry = window.sessionLogRegistry || [];
    
    let audioContext, analyser, sourceNode;


    // --- MASTER SWAPPABLE VISUAL ENGINE AUTOMATION ---
    let radarAngle = 0;
    const matrixDrops = [];
    const columns = 24;
    for (let i = 0; i < columns; i++) matrixDrops[i] = Math.random() * -100;

    // Helper method: Cleans raw paths to isolate pure string names
    function getCleanTrackName(srcUrl) {
        if (!srcUrl) return "Unknown Track";
        return decodeURIComponent(srcUrl.substring(srcUrl.lastIndexOf('/') + 1));
    }

    // High-Efficiency Fisher-Yates Randomisation Array Randomiser
    function shuffleBroadcastDeck(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- REAL-TIME AUDIO INTERCEPTOR EQUALIZER GRID ENGINE ---
    function initVisualizerEngine() {
        if (audioContext) return; 
        
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 64; 
            
            sourceNode = audioContext.createMediaElementSource(audioPlayer);
            sourceNode.connect(analyser);
            analyser.connect(audioContext.destination); 
            
            drawEqualizerGridLoop();
            console.log("📡 Visualizer Grid Engine online. Audio frequency interceptor locked.");
        } catch (e) {
            console.warn("⚠️ Web Audio initialization blocked. Awaiting secure node manual interaction event.", e);
        }
    }

    function drawEqualizerGridLoop() {
        requestAnimationFrame(drawEqualizerGridLoop);
        
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
        
        const bufferLength = analyser ? analyser.frequencyBinCount : 32;
        const dataArray = new Uint8Array(bufferLength);
        const selectedSkin = document.getElementById('skinSelect').value;

        // --- MODE A: OSCILLOSCOPE WAVEFORM ENGINE ---
        if (selectedSkin === 'oscilloscope') {
            if (analyser) analyser.getByteTimeDomainData(dataArray);
            else for(let i = 0; i < bufferLength; i++) dataArray[i] = 128;

            ctx.fillStyle = 'rgba(0, 10, 0, 0.18)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(0, 55, 0, 0.25)'; ctx.lineWidth = 1;
            ctx.beginPath();
            for (let y = 0; y < canvas.height; y += 30) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
            ctx.stroke();

            ctx.lineWidth = 2; ctx.strokeStyle = '#33ff33'; ctx.shadowColor = '#33ff33'; ctx.shadowBlur = 8;
            ctx.beginPath();
            const sliceWidth = canvas.width / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                x += sliceWidth;
            }
            ctx.lineTo(canvas.width, canvas.height / 2); ctx.stroke();
        } 
        
        // --- MODE B: DIGITAL CODE WATERFALL ENGINE ---
        else if (selectedSkin === 'matrix') {
            if (analyser) analyser.getByteFrequencyData(dataArray);
            ctx.fillStyle = 'rgba(0, 12, 0, 0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const colWidth = canvas.width / columns;
            ctx.font = '13px monospace'; ctx.shadowBlur = 4; ctx.shadowColor = '#33ff33';

            for (let i = 0; i < columns; i++) {
                const audioValue = dataArray[i % bufferLength] / 255;
                const dropSpeed = 2 + (audioValue * 8);
                const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
                ctx.fillStyle = audioValue > 0.75 ? '#ffffff' : '#33ff33';
                ctx.fillText(char, i * colWidth + (colWidth / 4), matrixDrops[i]);
                matrixDrops[i] += dropSpeed;
                if (matrixDrops[i] > canvas.height && Math.random() > 0.95) matrixDrops[i] = 0;
            }
        } 
        
                // --- MODE C: DEFAULT TACTICAL RADAR SCOPE ENGINE ---
        else {
            if (analyser) analyser.getByteFrequencyData(dataArray);
            ctx.fillStyle = 'rgba(0, 8, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2, centerY = canvas.height / 2;
            const maxRadius = Math.min(canvas.width, canvas.height) / 2 * 0.9;

            ctx.strokeStyle = 'rgba(0, 85, 0, 0.4)'; ctx.lineWidth = 1; ctx.shadowBlur = 0;
            for (let r = 1; r <= 3; r++) {
                ctx.beginPath(); ctx.arc(centerX, centerY, maxRadius * (r / 3), 0, 2 * Math.PI); ctx.stroke();
            }
            ctx.beginPath(); ctx.moveTo(centerX - maxRadius, centerY); ctx.lineTo(centerX + maxRadius, centerY); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(centerX, centerY - maxRadius); ctx.lineTo(centerX, centerY + maxRadius); ctx.stroke();

            const angleStep = (2 * Math.PI) / bufferLength;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * maxRadius * 0.4;
                const currentAngle = i * angleStep;
                ctx.strokeStyle = '#33ff33'; ctx.lineWidth = 3; ctx.shadowColor = '#33ff33'; ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.moveTo(centerX + Math.cos(currentAngle) * (maxRadius * 0.4), centerY + Math.sin(currentAngle) * (maxRadius * 0.4));
                ctx.lineTo(centerX + Math.cos(currentAngle) * (maxRadius * 0.4 + barHeight), centerY + Math.sin(currentAngle) * (maxRadius * 0.4 + barHeight));
                ctx.stroke();
            }

            radarAngle += 0.02; if (radarAngle >= 2 * Math.PI) radarAngle = 0;
            ctx.strokeStyle = 'rgba(51, 255, 51, 0.3)'; ctx.lineWidth = 2; ctx.beginPath();
            ctx.moveTo(centerX, centerY); ctx.lineTo(centerX + Math.cos(radarAngle) * maxRadius, centerY + Math.sin(radarAngle) * maxRadius); ctx.stroke();

            ctx.fillStyle = 'rgba(51, 255, 51, 0.04)';
            for (let n = 0; n < 10; n++) ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }
    }

    // --- COMPREHENSIVE STREAM SEQUENCER ---
    async function playNextStreamTrack() {
        initVisualizerEngine();

        if (masterLibrary.length === 0) {
            try {
                trackInfo.textContent = '📡 Syncing master manifest database node...';
                const response = await fetch('load.json');
                const data = await response.json();
                masterLibrary = data.mp3s.slice();
			    searchMasterMatrix = data.mp3s.slice(); // ⚡ Lock baseline tracks into search memory bank
                isConnected = true; 

                
                document.getElementById('specsCount').textContent = masterLibrary.length;
                
                activeStreamingDeck = shuffleBroadcastDeck([...masterLibrary]);
                console.log(`📦 Broadcast matrix live: ${masterLibrary.length} tracks committed.`);
            } catch (error) {
                console.error('❌ Error loading transmission node manifest:', error);
                trackInfo.textContent = 'Connection Error: Unable to read load.json data archive.';
                return;
            }
        }

        if (activeStreamingDeck.length === 0) {
            console.log("🔄 Active streaming queue depleted. Reshuffling master matrix...");
            activeStreamingDeck = shuffleBroadcastDeck([...masterLibrary]);
        }

        const targetTrackUrl = activeStreamingDeck.shift();
        const decodedUrl = decodeURIComponent(targetTrackUrl);
        const rawFileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1);

		// 🚀 INSERT TELEMETRY CAPTURE HERE
        // Pack the data string or object into history variables before changing the player source
        if (typeof trackTelemetryUpdate === "function") {
            trackTelemetryUpdate({ url: decodedUrl, title: rawFileName });
        }
        audioPlayer.src = decodedUrl;
        trackInfo.textContent = `Now playing: ${rawFileName}\n📡 [Queue: ${activeStreamingDeck.length} tracks remaining]`;
		// ⚡ SECTION 23 TELEMETRY LOGGER LOGIC
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        window.sessionLogRegistry.push(`[${timestamp}] TERMINAL NODE STREAM LOCKED: ${rawFileName}`);


        try {
            await audioPlayer.play();
            console.log(`📡 Streaming node locked: ${rawFileName} (${activeStreamingDeck.length} left)`);
        } catch (playError) {
            console.warn('⚠️ Playback blocked by browser policy. Awaiting manual user interaction.', playError);
            trackInfo.textContent = '⚠️ Click "Connect" or hit the play bar below to force the stream.';
        }
    }

  // Initialize the global channel pointer at the very top of main.js if not already set
if (!window.currentCollection) {
    window.currentCollection = "alanwattscollection"; // Default startup channel
}

audioPlayer.addEventListener('playing', () => {
    // 📡 DYNAMIC OVERRIDE LOCK: Reads whatever channel you tuned via your keyboard
    let collectionName = window.currentCollection;
    // ... leave the rest of your original loop code exactly as it was!


    try {
        const currentUrl = audioPlayer.src;
        // Strip out any trailing query strings or hash markers before parsing the segments
        const cleanUrlString = currentUrl.split('?')[0].split('#')[0];
        const parsedUrl = new URL(cleanUrlString);
        
        const pathSegments = parsedUrl.pathname.split('/').filter(seg => seg.length > 0);
        
        // Grab the directory segment right before the MP3 filename
        if (pathSegments.length >= 2) {
            // Added decodeURIComponent to resolve percent-encoding issues safely
            collectionName = decodeURIComponent(pathSegments[pathSegments.length - 2]);
        }
    } catch(e) {
        console.warn("⚠ Engine URL Parsing dropped, deploying storage matrix structural bypass.");
    }

    // Constructs the exact URL string structure using the variable token template
    const targetWallpaperUrl = `https://archive.org/download/${collectionName}/__ia_thumb.jpg`;
    
    // Deploys the constructed string directly to the interface wallpaper matrix
    document.body.style.backgroundImage = `url('${targetWallpaperUrl}')`;
    document.body.style.backgroundSize = "cover";
});


    // --- EXCEPTION INTERCEPT / DEAD LINK SYSTEM AUTO SKIPPER ---
    audioPlayer.addEventListener('error', function() {
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const failedUrl = audioPlayer.src;
        const errorDetails = audioPlayer.error;
        
        let errorType = "UNKNOWN_ERR";
        if (errorDetails) {
            switch(errorDetails.code) {
                case 1: errorType = "MEDIA_ERR_ABORTED"; break;
                case 2: errorType = "MEDIA_ERR_NETWORK"; break;
                case 3: errorType = "MEDIA_ERR_DECODE"; break;
                case 4: errorType = "MEDIA_ERR_SRC_NOT_SUPPORTED"; break;
            }
        }
        
        const errorLog = `[${timestamp}] ❌ ERROR: ${errorType}\n📍 FAILED URL: ${failedUrl}\n`;
        window.sessionLogRegistry.push(errorLog);
        trackInfo.textContent = `❌ Transmission dropped. Skipping dead node entry...`;
        
        setTimeout(playNextStreamTrack, 1500);
    });

    // --- TELEMETRY EXPORT INTERFACE DOWNLOAD SYSTEM ---
    document.getElementById('exportLogButton').addEventListener('click', function() {
        if(window.sessionLogRegistry.length === 0) {
            alert("No data recorded in telemetry logs yet.");
            return;
        }
        const logBlob = new Blob([window.sessionLogRegistry.join("\n")], { type: 'text/plain' });
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(logBlob);
        downloadAnchor.download = `section23_node_telemetry.txt`;
        downloadAnchor.click();
    });

    // Master Event Hooks Assignment Layout Grid
    document.getElementById('playButton').addEventListener('click', playNextStreamTrack);
    document.getElementById('skipButton').addEventListener('click', playNextStreamTrack); 
    
    // Master Event Hooks Assignment Layout Grid
    audioPlayer.addEventListener('ended', () => {
        // Look across the global scope gate to see if an intermission ad is pending
        if (window.jingleBreakPending === true && typeof window.injectAutomatedJingleBreak === "function") {
            window.injectAutomatedJingleBreak();
        } else {
            playNextStreamTrack();
        }
    });

    // Explicitly expose your play function to global scope so jingle.js can call it back
    window.playNextStreamTrack = playNextStreamTrack;

    // Initial dummy screen draw loop boot to showcase visualization immediately on load
    drawEqualizerGridLoop();


// ===================================================================
// SECTION 23: GLOBAL NETWORK STATE INITIALIZATION (ROOT SCOPE)
// ===================================================================
let isConnected = false;

// 🔓 UNIVERSAL MATRIX DIRECTORY: Bound to window context to cross all scope walls
window.PRESET_CHANNELS = {
    1: { name: "Sci Fi", url: "Twilight-zone.json" },
    2: { name: "Suspense", url: "Suspense.json" },
    3: { name: "Murder_By_Experts", url: "Murder_By_Experts.json" },
    4: { name: "Mysterious-Traveler", url: "Mysterious-Traveler.json" },
    5: { name: "Movies", url: "2000-Plus.json" },
    6: { name: "BBC-sci fi", url: "BBC.json" },
    7: { name: "Sci-fi-Radio", url: "Sci-fi-Radio.json" },
    8: { name: "lord-of-the-rings", url: "lord-of-the-rings.json" },
    9: { name: "Sherlock Holmes", url: "sherlock.json" },
    10: { name: "Haunted-BBC", url: "Haunted-BBC.json" },
    11: { name: "Alfred-Hitchcock", url: "Alfred-Hitchcock.json" },
    12: { name: "Ray-Bradbury", url: "Ray-Bradbury.json" }
};

// ===================================================================
// SECTION 23: MULTI-CHANNEL ROOT DIRECTORY DATA CRAWLER
// ===================================================================
const searchInput = document.getElementById('trackSearchInput');
const searchBtn = document.getElementById('searchMatrixBtn');
const searchResults = document.getElementById('searchResultsDisplay');

async function executeMatrixSearch() {
    if (!isConnected) {
        searchResults.style.display = 'block';
        searchResults.innerHTML = `<div class="search-row" style="cursor:default;color:#ffaa00;padding:8px;border-bottom:1px dashed #003300;">⚠ TACTICAL ERROR: Link to the master network node first before launching SCAN sequence.</div>`;
        return;
    }

    const query = searchInput.value.toUpperCase().trim();
    searchResults.innerHTML = '';
    
    if (!query) {
        searchResults.style.display = 'none';
        return;
    }

    searchResults.style.display = 'block';
    searchResults.innerHTML = '<div class="search-row" style="cursor:default;color:#ffff33;padding:8px;border-bottom:1px dashed #003300;">📡 INITIALISING MULTI-CHANNEL CRAWL SEQUENCE...</div>';

    const crawlRoster = ["load.json"];
    for (let ch in window.PRESET_CHANNELS) {
        const fileUrl = window.PRESET_CHANNELS[ch].url;
        if (fileUrl && !crawlRoster.includes(fileUrl)) {
            crawlRoster.push(fileUrl);
        }
    }

    try {
        const fetchPromises = crawlRoster.map(file =>
            fetch(file)
                .then(res => res.ok ? res.json() : [])
                .then(data => {
                    if (Array.isArray(data)) return data;
                    if (data && Array.isArray(data.mp3s)) return data.mp3s;
                    return [];
                })
                .catch(() => [])
        );

        const allArrays = await Promise.all(fetchPromises);
        const unifiedLibrary = allArrays.flat();
        searchResults.innerHTML = '';

        const matches = unifiedLibrary.filter(track => {
            const cleanTrackPath = decodeURIComponent(track).toUpperCase();
            return cleanTrackPath.includes(query) || cleanTrackPath.replace(/[_-]/g, ' ').includes(query);
        });

        const uniqueMatches = Array.from(new Set(matches)).slice(0, 30);

        if (uniqueMatches.length > 0) {
            uniqueMatches.forEach(track => {
                const row = document.createElement('div');
                row.className = 'search-row';
                
                // Hard-coded layout integrity checks for the dynamic search rows
                row.style.padding = "8px";
                row.style.borderBottom = "1px dashed #003300";
                row.style.cursor = "pointer";

                const filename = decodeURIComponent(track).split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');
                row.innerText = `📡 ${filename.toUpperCase()}`;

                row.addEventListener('click', () => {
                    audioPlayer.src = track;
                    audioPlayer.play().catch(e => console.warn("Buffer lock active."));
                    document.getElementById('trackInfo').innerHTML = `MANUAL OVERRIDE: ${filename.toUpperCase()}<br>[QUEUE PROTECTION ENGAGED]`;
                    
                    if (typeof activeStreamingDeck !== 'undefined') {
                        activeStreamingDeck = activeStreamingDeck.filter(item => item !== track);
                    }
                    searchResults.style.display = 'none';
                });

                searchResults.appendChild(row);
            });
        } else {
            searchResults.innerHTML = '<div class="search-row" style="cursor:default;color:#ff3333;padding:8px;border-bottom:1px dashed #003300;">ZERO MATCHES LOCATED IN MULTI-CHANNEL MATRIX</div>';
        }
    } catch (globalErr) {
        searchResults.innerHTML = '<div class="search-row" style="cursor:default;color:#ff3333;padding:8px;border-bottom:1px dashed #003300;">TACTICAL CRASH: UNABLE TO COMPILE NETWORK FILES</div>';
        console.error(globalErr);
    }
}

if (searchBtn) searchBtn.addEventListener('click', executeMatrixSearch);
if (searchInput) searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') executeMatrixSearch(); });
// ===================================================================
// SECTION 24: SIDEBAR PRESET CONSOLE (DYNAMIC LOCALIZED ENGINE)       
// =================================================================== 
(() => {
    // 📡 SCOPE BRIDGE: Local block queries directly off the universal window configuration layout
    const PRESET_CHANNELS = window.PRESET_CHANNELS || {
        1:  { name: "Sci Fi",  url: "Twilight-zone.json" },
        2:  { name: "Suspense",  url: "Suspense.json" },
        3:  { name: "Murder_By_Experts",  url: "Murder_By_Experts.json" },
        4:  { name: "Mysterious-Traveler",  url: "Mysterious-Traveler.json" },
        5:  { name: "2000_Plus",   url: "2000-Plus.json" },
        6:  { name: "BBC-sci fi",  url: "BBC.json" },
        7:  { name: "Sci-fi-Radio",  url: "Sci-fi-Radio.json" },
        8:  { name: "lord-of-the-rings",  url: "lord-of-the-rings.json" },
        9:  { name: "Sherlock Holmes",  url: "sherlock.json" },
        10: { name: "Haunted-BBC",  url: "Haunted-BBC.json" },
        11: { name: "Alfred-Hitchcock",  url: "Alfred-Hitchcock.json" },
        12: { name: "Ray-Bradbury",  url: "Ray-Bradbury.json" }
    };

    const chassis = document.querySelector('.crt-chassis');
    if (!chassis) return;

    // Check if panel already exists to prevent duplicate UI assembly clutter
    let existingPanel = document.querySelector('.s23-sidebar-preset-panel');
    if (existingPanel) existingPanel.remove();

    const sidebar = document.createElement('div');
    sidebar.className = 's23-sidebar-preset-panel';
    sidebar.style.display = "flex";
    sidebar.style.flexDirection = "column";
    sidebar.style.gap = "12px";
    sidebar.style.width = "75px";
    sidebar.style.minWidth = "75px";
    sidebar.style.background = "#050505";
    sidebar.style.border = "2px solid #00ff00";
    sidebar.style.borderRadius = "6px";
    sidebar.style.padding = "15px 6px";
    sidebar.style.boxShadow = "inset 0 0 10px rgba(0, 255, 0, 0.2), 0 0 15px rgba(0, 255, 0, 0.4)";
    sidebar.style.position = "absolute";
    sidebar.style.left = "-95px"; 
    sidebar.style.top = "0px";

    const totalButtons = Object.keys(PRESET_CHANNELS).length;
    console.log(`📡 Radio Deck Scanner: Identified ${totalButtons} active preset channels.`);

    // Map rows and dynamically mount physical tactile layout buttons
    Object.keys(PRESET_CHANNELS).forEach(key => {
        const chData = PRESET_CHANNELS[key];
        const btn = document.createElement('button');
        btn.className = 's23-preset-btn';
        btn.innerHTML = `<span style="font-size:9px;color:#008800;display:block;">CH ${key}</span><span style="font-size:8px;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;">${chData.name.substring(0,8).toUpperCase()}</span>`;
        
        btn.style.width = "100%";
        btn.style.height = "52px";
        btn.style.background = "#111";
        btn.style.color = "#00ff00";
        btn.style.border = "2px solid #005500";
        btn.style.borderRadius = "4px";
        btn.style.fontFamily = "monospace";
        btn.style.cursor = "pointer";
        btn.style.boxShadow = "0 3px 0 #003300";
        btn.style.transition = "all 0.05s ease";

        // Tactile switch compression mechanics
        btn.onmousedown = () => {
            btn.style.transform = "translateY(2px)";
            btn.style.boxShadow = "0 1px 0 #003300";
            btn.style.background = "#001100";
            btn.style.color = "#fff";
        };
        btn.onmouseup = btn.onmouseleave = () => {
            btn.style.transform = "none";
            btn.style.boxShadow = "0 3px 0 #003300";
            btn.style.background = "#111";
            btn.style.color = "#00ff00";
        };

        btn.addEventListener('click', async () => {
            const trackInfoPanel = document.getElementById('trackInfo');
            if (trackInfoPanel) trackInfoPanel.textContent = `📡 TUNING CHANNEL ${key}: ${chData.name.toUpperCase()}...`;
            
            // Clear active selection indicators across other channels
            document.querySelectorAll('.s23-preset-btn').forEach(b => b.style.borderColor = "#005500");
            btn.style.borderColor = "#00ff00";

            try {
                const res = await fetch(chData.url);
                const json = await res.json();
                
                let scrapedMp3Pool = [];
                if (json && Array.isArray(json.mp3s)) {
                    scrapedMp3Pool = json.mp3s;
                } else if (Array.isArray(json)) {
                    scrapedMp3Pool = json;
                }

                if (scrapedMp3Pool.length === 0) {
                    if (trackInfoPanel) trackInfoPanel.innerText = `DATABASE ERROR: 0 PATHS LOADED`;
                    return;
                }

                // Master search matrix intercept and gate unlock
                searchMasterMatrix = Array.from(new Set([...searchMasterMatrix, ...scrapedMp3Pool]));
                isConnected = true;

                scrapedMp3Pool.sort(() => Math.random() - 0.5);
                console.log(`🎲 Local Deck Engine Active: Transferred ${scrapedMp3Pool.length} tracks into queue for channel ${key}.`);

                if (typeof activeStreamingDeck !== 'undefined') {
                    activeStreamingDeck = [...scrapedMp3Pool];
                    audioPlayer.src = activeStreamingDeck.shift();
                    audioPlayer.play().catch(e => console.warn("Buffer lock active."));
                }
            } catch (err) {
                console.error("PRESET TUNING EXCEPTION:", err);
                if (trackInfoPanel) trackInfoPanel.innerText = `TUNING CRASHED: TARGET JSON MISSING`;
            }
        });
        sidebar.appendChild(btn);
    });

    chassis.style.position = "relative";
    chassis.appendChild(sidebar);
})();
