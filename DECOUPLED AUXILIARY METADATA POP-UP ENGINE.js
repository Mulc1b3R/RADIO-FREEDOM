<!-- SECTION 23: DECOUPLED AUXILIARY METADATA POP-UP ENGINE // V1.API    -->
<!-- =================================================================== -->
<script id="s23-metadata-sandbox">
(function() {
    // 🎛️ TARGET CORE CHASSIS DIRECTLY
    const chassis = document.querySelector('.crt-chassis');
    if (!chassis) return; 

    // Ensure the chassis acts as the absolute alignment parent
    chassis.style.position = 'relative';

    // ⚙️ CONFIGURATION: Absolute positioning coordinates pinned to right chassis wall
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

    // 🔨 STEP 1: Dynamically generate the hardware button
    const metaBtn = document.createElement('button');
    metaBtn.id = 's23-meta-probe-btn';
    metaBtn.innerHTML = 'METADATA<br><span style="font-size:8px;color:#008800;">PROBE NODE</span>';
    
    Object.assign(metaBtn.style, BUTTON_STYLES);

    // Replicate mechanical tactile transitions
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

    chassis.appendChild(metaBtn);

        // 🧠 STEP 2: The URL String Splitting & Telemetry Extraction Routine (FIXED)
    function extractBaseIdentifiers() {
        const player = document.getElementById('audioPlayer');
        if (!player || !player.src || player.src.includes(window.location.hostname)) {
            return null;
        }

        try {
            const rawUrl = decodeURIComponent(player.src);
            
            if (rawUrl.includes('/download/')) {
                const urlParts = rawUrl.split('/download/');
                
                // 🔒 FIX 1: Explicitly isolate the tracking segment at index [1]
                const pathSegment = urlParts[1]; 
                const pathParts = pathSegment.split('/');
                
                // 🔒 FIX 2: Capture raw identifier and cleanly enforce lowercase for API calls
                let rawSlug = pathParts[0] || '';
                let apiCleanSlug = rawSlug.trim();
                
                let collectionSlug = pathParts[0] || 'UNKNOWN';
                let filenameSlug = pathParts[pathParts.length - 1] || 'UNKNOWN';

                filenameSlug = filenameSlug.replace(/\.[^/.]+$/, "");

                const cleanCollection = collectionSlug.replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();
                const cleanTrack = filenameSlug.replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();

                return {
                    slug: apiCleanSlug, // Passed directly to the fetch query
                    collection: cleanCollection,
                    track: cleanTrack
                };
            }
            
            const fallbackName = rawUrl.split('/').pop().replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');
            return { slug: null, collection: 'REMOTE STORAGE NODE', track: fallbackName };

        } catch (e) {
            return null;
        }
    }


       // 📺 STEP 3: Spawning the Auxiliary CRT Monitor Window (Option 2 Redirection)
    function launchMetaMonitor() {
        const localData = extractBaseIdentifiers();

        if (!localData) {
            alert("TACTICAL ERROR: No active stream detected. Link to a channel preset first.");
            return;
        }

        // Configure optimal web layout dimensions for the native archive panel
        const winWidth = 650;  
        const winHeight = 550; 
        const leftPos = (window.screen.width / 2) - (winWidth / 2) + 260; 
        const topPos = (window.screen.height / 2) - (winHeight / 2);

        // If the monitor is already active, refocus it and force the new route redirection
        if (metaWindow && !metaWindow.closed) {
            metaWindow.focus();
            redirectMonitor(localData);
            return;
        }

        // Open the window canvas shell cleanly pointing to about:blank initially
        metaWindow = window.open('about:blank', 'S23_METADATA_MONITOR', 
            `width=${winWidth},height=${winHeight},top=${topPos},left=${leftPos},resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no`
        );

        if (!metaWindow) {
            alert("POP-UP INTERCEPTED: Please white-list this terminal node to deploy the Auxiliary Metadata Monitor.");
            return;
        }

        redirectMonitor(localData);
    }
    // 📡 STEP 4: Direct Data Link Redirection Router (FIXED SYNTAX)
    function redirectMonitor(localData) {
        if (!metaWindow || metaWindow.closed) return;

        // 🔒 FIX: Use backticks (`) and add forward slash for proper interpolation
        if (localData.slug) {
            const targetUrl = `https://archive.org/details/${localData.slug}`;
            metaWindow.location.href = targetUrl;
        } else {
            // High-utility fallback template if streaming outlying assets from raw edge servers
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


    // Bind execution listener directly to the button interface
    metaBtn.addEventListener('click', launchMetaMonitor);

    // 📡 STEP 5: Live Sync Loop (Forces open pop-up to refresh instantly when tracks swap)
    const activePlayer = document.getElementById('audioPlayer');
    if (activePlayer) {
        activePlayer.addEventListener('play', () => {
            if (metaWindow && !metaWindow.closed) {
                const refreshedData = extractBaseIdentifiers();
                if (refreshedData) {
                    redirectMonitor(refreshedData);
                }
            }
        });
    }
})();
</script>