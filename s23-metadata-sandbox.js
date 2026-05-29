

// =================================================================== 

// SECTION 23: DECOUPLED AUXILIARY METADATA POP-UP ENGINE  V1.API 
//=================================================================== 

(function() {
    const chassis = document.querySelector('.crt-chassis');
    if (!chassis) return;

    chassis.style.position = 'relative';

    const BUTTON_STYLES = {
        position: 'absolute',
        right: '-145px',
        top: '30px',
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

    let metaWindow = null;

    const metaBtn = document.createElement('button');
    metaBtn.id = 's23-meta-probe-btn';
    metaBtn.innerHTML = 'METADATA<br><span style="font-size:8px;color:#008800;">PROBE NODE</span>';
    Object.assign(metaBtn.style, BUTTON_STYLES);

    metaBtn.addEventListener('mouseenter', () => metaBtn.style.borderColor = '#00ff00');
    metaBtn.addEventListener('mouseleave', () => metaBtn.style.borderColor = '#005500');
    metaBtn.addEventListener('mousedown', () => {
        metaBtn.style.transform = 'translateY(2px)';
        metaBtn.style.boxShadow = '0 1px 0 #003300, inset 0 3px 6px rgba(0,0,0,0.8)';
    });
        metaBtn.addEventListener('mouseup', () => {
        metaBtn.style.transform = 'none';
        metaBtn.style.boxShadow = BUTTON_STYLES.boxShadow;
    });

    // ===================================================================
    // 🚀 INSERT PREVIOUS HARDWARE RETRACTION NODE BUTTON HERE
    // ===================================================================
    const prevBtn = document.createElement('button');
    prevBtn.id = 's23-prev-track-btn';
    prevBtn.innerHTML = '⏮️ PREVIOUS<br><span style="font-size:8px;color:#008800;">STEP HISTORY</span>';
    
    // Copy base terminal button layout styles
    Object.assign(prevBtn.style, BUTTON_STYLES);
    
    // 📐 GEOMETRIC STACK ALIGNMENT
    prevBtn.style.top = '145px'; 

    // Visual button interaction handlers (Hover/Click physics)
    prevBtn.addEventListener('mouseenter', () => prevBtn.style.borderColor = '#00ff00');
    prevBtn.addEventListener('mouseleave', () => prevBtn.style.borderColor = '#005500');
    prevBtn.addEventListener('mousedown', () => {
        prevBtn.style.transform = 'translateY(2px)';
        prevBtn.style.boxShadow = '0 1px 0 #003300, inset 0 3px 6px rgba(0,0,0,0.8)';
    });
    prevBtn.addEventListener('mouseup', () => {
        prevBtn.style.transform = 'none';
        prevBtn.style.boxShadow = BUTTON_STYLES.boxShadow;
    });

    // Execution routine: Force step back onto the carrier wave
    prevBtn.addEventListener('click', () => {
        if (!window.previouslyPlayedTrack) {
            console.warn("📡 History Warning: No previous track telemetry recorded in this session.");
            return;
        }

        const targetTrack = window.previouslyPlayedTrack;
        const player = document.getElementById('audioPlayer');
        const trackInfo = document.getElementById('trackInfo');

        if (player && trackInfo) {
            player.src = targetTrack.url;
            player.play();
            
            trackInfo.textContent = `Now playing: ${targetTrack.title}\n⏪ [MANUAL HISTORICAL STEP-BACK OVERRIDE]`;
            
            window.currentlyPlayingTrack = targetTrack;
            window.previouslyPlayedTrack = null; 
            
            console.log(`⏪ Step-Back Active: Loaded ${targetTrack.title}`);
        }
    });

    // Commit both hardware buttons onto the CRT chassis frame
    chassis.appendChild(metaBtn);
    chassis.appendChild(prevBtn);


    function extractBaseIdentifiers() {
        const player = document.getElementById('audioPlayer');
        if (!player || !player.src || player.src.includes(window.location.hostname)) {
            return null;
        }
        try {
            const rawUrl = decodeURIComponent(player.src);
            
            if (rawUrl.includes('/download/')) {
                const urlParts = rawUrl.split('/download/');
                const pathParts = urlParts[1].split('/');
                let apiCleanSlug = (pathParts[0] || '').trim();
                
                const filename = rawUrl.split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');
                return { 
                    slug: apiCleanSlug, 
                    collection: pathParts[0].replace(/[_-]/g, ' ').trim(), 
                    track: filename.trim() 
                };
            }
            
            const fallbackName = rawUrl.split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');
            return { slug: null, collection: 'REMOTE STORAGE NODE', track: fallbackName };
        } catch (e) {
            return null;
        }
    }

    function launchMetaMonitor() {
        const localData = extractBaseIdentifiers();
        if (!localData) {
            alert("TACTICAL ERROR: No active stream detected. Link to a channel preset first.");
            return;
        }
        const winWidth = 650; const winHeight = 550;
        const leftPos = (window.screen.width / 2) - (winWidth / 2) + 260;
        const topPos = (window.screen.height / 2) - (winHeight / 2);

        if (metaWindow && !metaWindow.closed) {
            metaWindow.focus();
            redirectMonitor(localData);
            return;
        }
        metaWindow = window.open('about:blank', 'S23_METADATA_MONITOR', `width=${winWidth},height=${winHeight},top=${topPos},left=${leftPos},resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no`);
        if (!metaWindow) {
            alert("POP-UP INTERCEPTED: Please white-list this terminal node to deploy the Auxiliary Metadata Monitor.");
            return;
        }
        redirectMonitor(localData);
    }

    function redirectMonitor(localData) {
        if (!metaWindow || metaWindow.closed) return;
        
        // 🚀 INSTANT REDIRECT DIRECTION ENGAGED
        if (localData && localData.slug) {
            metaWindow.location.href = `https://archive.org/details/${localData.slug}`;
        } else {
            metaWindow.document.body.innerHTML = `
                <div style="background:#000000; color:#33ff33; font-family:'Courier New', monospace; padding:20px; height:100vh; border:2px solid #33ff33; box-sizing:border-box; text-shadow: 0 0 5px #33ff33;">
                    <h3 style="font-size:13px; border-bottom:1px solid #005500; padding-bottom:5px; color:#fff;">🛰️ SECTION 23 AUXILIARY STREAM DIAGNOSTICS</h3>
                    <p style="color:#008800; font-size:10px; font-weight:bold; letter-spacing:1px; margin-top:15px;">LOCAL REPOSITORY NAME:</p>
                    <p style="color:#ffffff; font-size:12px;">${localData.collection.toUpperCase()}</p>
                    <p style="color:#008800; font-size:10px; font-weight:bold; letter-spacing:1px;">ACTIVE IDENTIFIER:</p>
                    <p style="color:#ffffff; font-size:12px;">${localData.track.toUpperCase()}</p>
                    <hr style="border:none; border-top:1px dashed #005500; margin:20px 0;">
                    <p style="color:#ffff33; font-size:11px;">📡 REDIRECTION SKIPPED: ASSET INJECTED VIA RAW REMOTE STORAGE EDGE.</p>
                </div>
            `;
        }
    }

    metaBtn.addEventListener('click', launchMetaMonitor);

    const activePlayer = document.getElementById('audioPlayer');
    if (activePlayer) {
        activePlayer.addEventListener('play', () => {
            if (metaWindow && !metaWindow.closed) {
                const refreshedData = extractBaseIdentifiers();
                if (refreshedData) redirectMonitor(refreshedData);
            }
        });
    }
})();

