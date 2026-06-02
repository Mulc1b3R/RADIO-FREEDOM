  (function initDraggableBBCDeck() {
            const el = document.getElementById('bbc-floating-deck');
            const link = document.getElementById('bbc-broadcast-link');
            if (!el || !link) return;

            let isDragging = false;
            let hasMoved = false;
            let startX, startY, initialLeft, initialTop;

            const getCoords = (e) => e.touches ? e.touches[0] : e;

            const dragStart = (e) => {
                // If it is a touch event, don't preventDefault right away 
                // so the browser can still register clicks normally
                if (e.type !== 'touchstart') {
                    e.preventDefault();
                }
                
                isDragging = true;
                hasMoved = false;
                
                const coords = getCoords(e);
                startX = coords.clientX;
                startY = coords.clientY;
                
                const rect = el.getBoundingClientRect();
                initialLeft = rect.left;
                initialTop = rect.top;
                
                el.style.transform = 'none';
                el.style.right = 'auto';
                el.style.left = `${initialLeft}px`;
                el.style.top = `${initialTop}px`;
            };

            const dragMove = (e) => {
                if (!isDragging) return;
                
                const coords = getCoords(e);
                const dx = coords.clientX - startX;
                const dy = coords.clientY - startY;
                
                // Threshold to differentiate between a simple click and a drag movement
                if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                    hasMoved = true;
                }
                
                let newX = initialLeft + dx;
                let newY = initialTop + dy;
                
                // Screen edge protection padding
                const pad = 10;
                newX = Math.max(pad, Math.min(newX, window.innerWidth - el.offsetWidth - pad));
                newY = Math.max(pad, Math.min(newY, window.innerHeight - el.offsetHeight - pad));
                
                el.style.left = `${newX}px`;
                el.style.top = `${newY}px`;
            };

            const dragEnd = () => {
                isDragging = false;
            };

            // Block navigation link if the user was dragging the element
            link.addEventListener('click', (e) => {
                if (hasMoved) {
                    e.preventDefault();
                    hasMoved = false;
                }
            });

            // Desktop Input Mapping
            el.addEventListener('mousedown', dragStart);
            window.addEventListener('mousemove', dragMove);
            window.addEventListener('mouseup', dragEnd);

            // Mobile Touch Mapping
            el.addEventListener('touchstart', dragStart, { passive: true });
            window.addEventListener('touchmove', dragMove, { passive: false });
            window.addEventListener('touchend', dragEnd);
        })();