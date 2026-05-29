window.onload = function() {
        // 🌍 1. DYNAMIC FAVICON OVERRIDE: Injects a globe icon into the browser tab
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        // Uses a secure inline SVG data string featuring a clean green globe matrix
        faviconLink.href = 'data:image/svg+xml,<svg xmlns=%22http://w3.org viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>';
        document.head.appendChild(faviconLink);

        // 📡 2. LOOPING TEXT ENGINES: Animates the Section 23 broadcast message
        let animatedTitle = "Section 23 Live Broadcast...       ";

        setInterval(() => {
            animatedTitle = animatedTitle.substring(1) + animatedTitle[0];
            document.title = animatedTitle;
        }, 250); // Speed node: 250ms per loop cycle
    };