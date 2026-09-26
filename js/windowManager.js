// Windows 7 Window Manager: Resizing with mouse, Titlebar Dragging, and Maximize/Restore
window.win7WindowManager = (function () {
    let activeWindow = null;
    let dragMode = null; // 'drag', 'resize-se', 'resize-e', 'resize-s', 'resize-w'
    let startX = 0, startY = 0;
    let startLeft = 0, startTop = 0;
    let startWidth = 0, startHeight = 0;
    const minWidth = 520;
    const minHeight = 400;
    let maxZIndex = 10;

    function getBounds(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
        };
    }

    function bringToFront(winId) {
        const el = document.getElementById(winId);
        if (el) {
            maxZIndex++;
            el.style.zIndex = maxZIndex;
        }
    }

    function initWindow(winId) {
        const el = document.getElementById(winId);
        if (!el) return;

        // Position floating window initially in center if not yet positioned
        if (!el.dataset.initialized) {
            const taskbarH = 40;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const initialW = Math.min(1240, Math.floor(screenW * 0.92));
            const initialH = Math.min(840, Math.floor((screenH - taskbarH) * 0.92));
            
            // Add slight offset based on maxZIndex so windows don't overlap perfectly
            const offset = (maxZIndex - 10) * 30;
            
            const initialLeft = Math.max(10, Math.floor((screenW - initialW) / 2)) + offset;
            const initialTop = Math.max(10, Math.floor((screenH - taskbarH - initialH) / 2)) + offset;

            el.style.width = initialW + 'px';
            el.style.height = initialH + 'px';
            el.style.left = initialLeft + 'px';
            el.style.top = initialTop + 'px';
            
            maxZIndex++;
            el.style.zIndex = maxZIndex;
            
            el.dataset.initialized = 'true';
            el.dataset.restoredLeft = initialLeft + 'px';
            el.dataset.restoredTop = initialTop + 'px';
            el.dataset.restoredWidth = initialW + 'px';
            el.dataset.restoredHeight = initialH + 'px';
        }

        // Window click brings to front
        el.addEventListener('mousedown', function(e) {
            bringToFront(winId);
        });

        // Titlebar dragging
        const titlebar = el.querySelector('.winforms-titlebar');
        if (titlebar && !titlebar.dataset.dragBound) {
            titlebar.dataset.dragBound = 'true';
            titlebar.addEventListener('mousedown', function (e) {
                if (e.target.closest('.winforms-window-controls') || el.classList.contains('is-maximized')) {
                    return;
                }
                e.preventDefault();
                activeWindow = el;
                dragMode = 'drag';
                bringToFront(winId);
                const bounds = getBounds(el);
                startX = e.clientX;
                startY = e.clientY;
                startLeft = bounds.left;
                startTop = bounds.top;
                document.body.classList.add('win-dragging');
            });

            titlebar.addEventListener('dblclick', function (e) {
                if (e.target.closest('.winforms-window-controls')) return;
                // Double click maximize is handled in Blazor for now, but we can call it if needed.
                // It's better to let Blazor button handle it to keep state in sync.
            });
        }

        // Bottom-Right resize grip
        const grip = el.querySelector('.status-grip');
        if (grip && !grip.dataset.resizeBound) {
            grip.dataset.resizeBound = 'true';
            grip.style.cursor = 'se-resize';
            grip.addEventListener('mousedown', function (e) {
                if (el.classList.contains('is-maximized')) return;
                e.preventDefault();
                e.stopPropagation();
                activeWindow = el;
                dragMode = 'resize-se';
                bringToFront(winId);
                const bounds = getBounds(el);
                startX = e.clientX;
                startY = e.clientY;
                startWidth = bounds.width;
                startHeight = bounds.height;
                document.body.classList.add('win-resizing-se');
            });
        }

        // Right Edge resize handle
        let rightEdge = el.querySelector('.win-resize-handle-e');
        if (!rightEdge) {
            rightEdge = document.createElement('div');
            rightEdge.className = 'win-resize-handle win-resize-handle-e';
            el.appendChild(rightEdge);
        }
        rightEdge.onmousedown = function (e) {
            if (el.classList.contains('is-maximized')) return;
            e.preventDefault();
            activeWindow = el;
            dragMode = 'resize-e';
            bringToFront(winId);
            const bounds = getBounds(el);
            startX = e.clientX;
            startWidth = bounds.width;
            document.body.classList.add('win-resizing-e');
        };

        // Bottom Edge resize handle
        let bottomEdge = el.querySelector('.win-resize-handle-s');
        if (!bottomEdge) {
            bottomEdge = document.createElement('div');
            bottomEdge.className = 'win-resize-handle win-resize-handle-s';
            el.appendChild(bottomEdge);
        }
        bottomEdge.onmousedown = function (e) {
            if (el.classList.contains('is-maximized')) return;
            e.preventDefault();
            activeWindow = el;
            dragMode = 'resize-s';
            bringToFront(winId);
            const bounds = getBounds(el);
            startY = e.clientY;
            startHeight = bounds.height;
            document.body.classList.add('win-resizing-s');
        };
    }

    // Global mouse listeners
    window.addEventListener('mousemove', function (e) {
        if (!activeWindow || !dragMode) return;

        const maxAvailableW = window.innerWidth;
        const maxAvailableH = window.innerHeight - 40; 

        if (dragMode === 'drag') {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            let newLeft = startLeft + dx;
            let newTop = startTop + dy;

            newLeft = Math.max(0, Math.min(newLeft, maxAvailableW - 120));
            newTop = Math.max(0, Math.min(newTop, maxAvailableH - 40));

            activeWindow.style.left = newLeft + 'px';
            activeWindow.style.top = newTop + 'px';
            activeWindow.dataset.restoredLeft = newLeft + 'px';
            activeWindow.dataset.restoredTop = newTop + 'px';
        } else if (dragMode === 'resize-se') {
            const dw = e.clientX - startX;
            const dh = e.clientY - startY;
            const newW = Math.max(minWidth, Math.min(startWidth + dw, maxAvailableW - getBounds(activeWindow).left));
            const newH = Math.max(minHeight, Math.min(startHeight + dh, maxAvailableH - getBounds(activeWindow).top));

            activeWindow.style.width = newW + 'px';
            activeWindow.style.height = newH + 'px';
            activeWindow.dataset.restoredWidth = newW + 'px';
            activeWindow.dataset.restoredHeight = newH + 'px';
        } else if (dragMode === 'resize-e') {
            const dw = e.clientX - startX;
            const newW = Math.max(minWidth, Math.min(startWidth + dw, maxAvailableW - getBounds(activeWindow).left));
            activeWindow.style.width = newW + 'px';
            activeWindow.dataset.restoredWidth = newW + 'px';
        } else if (dragMode === 'resize-s') {
            const dh = e.clientY - startY;
            const newH = Math.max(minHeight, Math.min(startHeight + dh, maxAvailableH - getBounds(activeWindow).top));
            activeWindow.style.height = newH + 'px';
            activeWindow.dataset.restoredHeight = newH + 'px';
        }
    });

    window.addEventListener('mouseup', function () {
        if (activeWindow) {
            activeWindow = null;
            dragMode = null;
            document.body.classList.remove('win-dragging', 'win-resizing-se', 'win-resizing-e', 'win-resizing-s');
        }
    });

    function toggleMaximize(winId) {
        // Handled by CSS via Blazor's .is-maximized class
    }

    return {
        initWindow: initWindow,
        bringToFront: bringToFront,
        toggleMaximize: toggleMaximize
    };
})();
