<!-- =================================================================== -->
<!-- SECTION 25: AUXILIARY "LIKE THIS" RADAR SEARCH FINDER               -->
<!-- =================================================================== -->

(() => {
    const chassis = document.querySelector('.crt-chassis');
    if (!chassis) return;

    // ⚙️ GEOMETRIC ALIGNMENT: Stacked perfectly 55px below your Metadata Button on the right flank
    const RADAR_BUTTON_STYLES = {
        position: 'absolute',
        right: '-145px',
        top: '85px',     // Drops cleanly beneath the metadata node's 30px boundary
        width: '130px',
        height: '48px',
        background: '#111',
        color: '#00ff00',
        border: '2px solid #005500',
        borderRadius: '5px',
        fontFamily: "'Courier New', monospace",
        fontSize: '11px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 3px 0 #003300, inset 0 1px 2px rgba(255,255,255,0.1)',
        textShadow: '0 0 4px rgba(0, 255, 0, 0.6)',
        textTransform: 'uppercase',
        zIndex: '9999'
    };

    let radarWindow = null;

    // 🔨 Mount the hardware button faceplate dynamically
    const radarBtn = document.createElement('button');
    radarBtn.id = 's25-radar-find-btn';
    radarBtn.innerHTML = 'LIKE THIS<br><span style="font-size:8px;color:#008800;">RADAR FIND</span>';
    Object.assign(radarBtn.style, RADAR_BUTTON_STYLES);

    // Mechanical animation physics
    radarBtn.addEventListener('mouseenter', () => radarBtn.style.borderColor = '#00ff00');
    radarBtn.addEventListener('mouseleave', () => radarBtn.style.borderColor = '#005500');
    radarBtn.addEventListener('mousedown', () => {
        radarBtn.style.transform = 'translateY(2px)';
        radarBtn.style.boxShadow = '0 1px 0 #003300, inset 0 3px 6px rgba(0,0,0,0.8)';
    });
    radarBtn.addEventListener('mouseup', () => {
        radarBtn.style.transform = 'none';
        radarBtn.style.boxShadow = RADAR_BUTTON_STYLES.boxShadow;
    });

    chassis.appendChild(radarBtn);

    // 🧠 INTELLIGENCE MATRIX: Maps active keywords to related channel search keys
    const RADAR_DICTIONARY = {
        "TWILIGHT": { genre: "SCI-FI ANTHOLOGY", searchKey: "Sci Fi" },
        "SUSPENSE": { genre: "PSYCHOLOGICAL THRILLER", searchKey: "Suspense" },
        "MURDER": { genre: "DETECTIVE NOIR & MYSTERY", searchKey: "Murder" },
        "SCOTLAND": { genre: "BRITISH PROCEDURAL MYSTERY", searchKey: "BBC" },
        "SHERLOCK": { genre: "VICTORIAN DETECTIVE NOIR", searchKey: "Sherlock" },
        "BBC": { genre: "BRITISH HERITAGE DRAMA", searchKey: "BBC" },
        "LOTR": { genre: "EPIC LITERARY FANTASY", searchKey: "lord-of-the-rings" },
        "ALFRED": { genre: "MACABRE MYSTERY AUDIO", searchKey: "Alfred" },
        "RAY": { genre: "SPECULATIVE LITERARY SCI-FI", searchKey: "Ray" },
        "OTRB": { genre: "SANDBOX TELEMETRY NODE", searchKey: "OTRB" },
        "LOTR": { genre: "EPIC LITERARY FANTASY", searchKey: "lord-of-the-rings" },
        "WORLD IN ACTION": { genre: "MACABRE MYSTERY AUDIO", searchKey: "Alfred" },
        "RAY": { genre: "SPECULATIVE LITERARY SCI-FI", searchKey: "Ray" },
        "OTRB": { genre: "SANDBOX TELEMETRY NODE", searchKey: "OTRB" }

    };

    function analyzeActiveStream() {
        const player = document.getElementById('audioPlayer');
        if (!player || !player.src || player.src.includes(window.location.hostname)) return null;

        const rawUrl = decodeURIComponent(player.src).toUpperCase();
        let matchedKey = "DEFAULT";
        let genreData = { genre: "GENERIC BROADCAST BLOCK", searchKey: "Suspense" };

        for (let key in RADAR_DICTIONARY) {
            if (rawUrl.includes(key)) {
                matchedKey = key;
                genreData = RADAR_DICTIONARY[key];
                break;
            }
        }

        let extractedTitle = "UNKNOWN SOURCE CARRIER";
        const urlFilename = rawUrl.split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');
        if (urlFilename) extractedTitle = urlFilename;

        return { title: extractedTitle, genre: genreData.genre, searchKey: genreData.searchKey };
    }

    function launchRadarMonitor() {
        const streamAnalysis = analyzeActiveStream();
        if (!streamAnalysis) {
            alert("TACTICAL ERROR: No active stream detected. Link a channel preset first.");
            return;
        }

        const winWidth = 480; const winHeight = 450;
        const leftPos = (window.screen.width / 2) - (winWidth / 2) + 260;
        const topPos = (window.screen.height / 2) - (winHeight / 2) + 80;

        if (radarWindow && !radarWindow.closed) {
            radarWindow.focus();
            renderRadarData(streamAnalysis);
            return;
        }

        radarWindow = window.open('', 'S25_RADAR_FIND_MONITOR', `width=${winWidth},height=${winHeight},top=${topPos},left=${leftPos},resizable=no,scrollbars=no,status=no,location=no,toolbar=no,menubar=no`);
        if (!radarWindow) {
            alert("POP-UP INTERCEPTED: Please white-list this terminal node to deploy the Radar Finder.");
            return;
        }

        const htmlPayload = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>[AUX RADAR] Related Signals</title>
                <style>
                    body { background-color: #000000; color: #33ff33; font-family: 'Courier New', monospace; text-shadow: 0 0 5px #33ff33; padding: 15px; margin: 0; overflow: hidden; border: 2px solid #33ff33; box-sizing: border-box; height: 100vh; }
                    .crt-scanlines { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%); background-size: 100% 4px; pointer-events: none; z-index: 999; }
                    .telemetry-grid { border: 1px solid #005500; background: rgba(0, 10, 0, 0.8); padding: 12px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; gap: 10px; }
                    .header { font-size: 11px; border-bottom: 1px solid #005500; padding-bottom: 4px; color: #fff; text-shadow: 0 0 8px #00ff00; }
                    .meta-block { font-size: 11px; margin-bottom: 5px; line-height: 1.3; }
                    .label { color: #008800; font-size: 10px; font-weight: bold; letter-spacing: 1px; }
                    .vector-list-box { border: 1px solid #003300; background: #000300; flex: 1; overflow-y: auto; border-radius: 3px; }
                    .vector-row { display: flex; justify-content: space-between; align-items: center; padding: 8px; font-size: 11px; border-bottom: 1px solid #002200; cursor: pointer; }
                    .vector-row:hover { background: #001500; color: #fff; }
                    .scan-trigger-btn { background: #000; border: 1px solid #00ff00; color: #00ff00; font-family: monospace; font-size: 9px; font-weight: bold; padding: 3px 6px; cursor: pointer; border-radius: 3px; }
                    .scan-trigger-btn:hover { background: #00ff00; color: #000; }
                </style>
            </head>
            <body>
                <div class="crt-scanlines"></div>
                <div class="telemetry-grid" id="displayBox">
                    <div class="header">🛰️ RADAR POSITION COMPILED</div>
                    <div style="color:#ffff33; padding:10px;">ANALYSING WAVELENGTH...</div>
                </div>
            </body>
            </html>
        `;

        radarWindow.document.write(htmlPayload);
        radarWindow.document.close();
        radarWindow.onload = () => { renderRadarData(streamAnalysis); };
    }

    async function renderRadarData(analysis) {
        const box = radarWindow.document.getElementById('displayBox');
        if (!box) return;

        box.innerHTML = `
            <div class="header">🛰️ SECTION 25 AUXILIARY RADAR CROSS-REFERENCE</div>
            <div class="meta-block">
                <span class="label">PROBED TRACK:</span><br>
                <span style="color:#ffffff; font-size:10px;">${analysis.title.toUpperCase()}</span><br>
                <span class="label">RADAR TARGET MATCH KEY:</span><br>
                <span style="color:#ffff33;">${analysis.searchKey.toUpperCase()} [${analysis.genre}]</span>
            </div>
            <div class="label" style="margin-bottom: -5px;">AUTO-COMPILING CROSS-CHANNEL MATCHES:</div>
            <div class="vector-list-box" id="vectorList">
                <div style="color:#ffaa00; padding:10px;">Crawling repository maps...</div>
            </div>
        `;

        const listContainer = radarWindow.document.getElementById('vectorList');
        let matchedTracks = [];

        try {
            for (let id in window.PRESET_CHANNELS) {
                const ch = window.PRESET_CHANNELS[id];
                const res = await fetch(ch.url);
                if (!res.ok) continue;
                const data = await res.json();
                const tracks = Array.isArray(data) ? data : (data.mp3s || []);
                
                tracks.forEach(t => {
                    if (decodeURIComponent(t).toUpperCase().includes(analysis.searchKey.toUpperCase())) {
                        matchedTracks.push(t);
                    }
                });
            }

            listContainer.innerHTML = '';
            const uniqueTracks = Array.from(new Set(matchedTracks)).slice(0, 15);

            if (uniqueTracks.length === 0) {
                listContainer.innerHTML = `<div style="color:#ff3333; padding:10px;">No exact sister frequencies tracked.</div>`;
                return;
            }

            uniqueTracks.forEach(track => {
                const tName = decodeURIComponent(track).split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');
                const row = radarWindow.document.createElement('div');
                row.className = 'vector-row';
                row.innerHTML = `
                    <span style="max-width:320px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">⚡ ${tName.toUpperCase()}</span>
                    <button class="scan-trigger-btn">INJECT</button>
                `;

                row.querySelector('.scan-trigger-btn').addEventListener('click', () => {

                            const mainPlayer = window.document.getElementById('audioPlayer');
                const mainInfo = window.document.getElementById('trackInfo');
                
                if (mainPlayer && mainInfo) {
                    mainPlayer.src = track;
                    mainPlayer.play().catch(e => console.warn("Lock active"));
                    mainInfo.innerHTML = `MANUAL OVERRIDE: ${tName.toUpperCase()}<br>[RADAR INTERCEPT ACTIVE]`;
                    row.style.background = '#003300';
                }
            });

            listContainer.appendChild(row);
        });

    } catch (err) {
        listContainer.innerHTML = `<div style="color:#ff3333; padding:10px;">Crawl failed.</div>`;
    }
}

radarBtn.addEventListener('click', launchRadarMonitor);
})();
