import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

export const DRAWER_WIDTH = 270;
const EDGE_SWIPE_WIDTH = 28; // left strip where an opening drag may begin
const DRAG_START_THRESHOLD = 8; // px of movement before a press becomes a drag

type Gesture = {
    pointerId: number;
    startX: number;
    startOffset: number; // visible drawer width (px) when the gesture began
    source: 'edge' | 'panel' | 'backdrop';
    active: boolean; // true once we've committed to a drag (vs. a tap/click)
};

const clamp = (value: number) => Math.max(0, Math.min(DRAWER_WIDTH, value));

const Backdrop = styled('div')(({ theme }) => ({
    position: 'fixed',
    inset: 0,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)',
    zIndex: theme.zIndex.drawer,
    touchAction: 'none',
}));

const Panel = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    // Use the dynamic viewport height so the panel ends above the browser/system
    // chrome (e.g. Android's bottom navigation bar) instead of behind it; the array
    // emits both declarations so 100vh acts as a fallback where dvh is unsupported.
    // The safe-area inset keeps bottom content clear of the nav bar / home indicator.
    height: ['100vh', '100dvh'],
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[8],
    willChange: 'transform',
    touchAction: 'pan-y',
}));

const EdgeArea = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: EDGE_SWIPE_WIDTH,
    // Below the AppBar so the brand/links stay clickable, above page content so edge swipes register.
    zIndex: theme.zIndex.appBar - 1,
    touchAction: 'pan-y',
}));

type Props = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    children: ReactNode;
};

/**
 * A drawer that can be dragged open/closed with mouse, touch, or pen.
 *
 * Unlike MUI's SwipeableDrawer (touch-only), this is built on Pointer Events,
 * so a left-to-right mouse drag from the screen edge opens it. While a gesture
 * is in progress the move/release listeners live on `window`, so once you press
 * anywhere on the open drawer or its dimmed backdrop you can drag it from there —
 * the pointer can roam over nav links or off the panel without losing the drag.
 */
export const SwipeableNavDrawer = ({ open, onOpen, onClose, children }: Props) => {
    const theme = useTheme();
    // Visible drawer width in px while dragging; null when settled (controlled by `open`).
    const [offset, setOffset] = useState<number | null>(null);
    // True while a press is being tracked; switches the listeners onto `window`.
    const [armed, setArmed] = useState(false);
    const gestureRef = useRef<Gesture | null>(null);

    const dragging = offset !== null;

    const beginGesture = (event: ReactPointerEvent, source: Gesture['source']) => {
        if (event.button !== 0 && event.pointerType === 'mouse') return; // ignore non-primary buttons
        gestureRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startOffset: source === 'edge' ? 0 : DRAWER_WIDTH,
            source,
            active: false,
        };
        setArmed(true);
    };

    // While armed, drive the drag from window-level listeners so it keeps tracking
    // no matter what element the pointer travels over (links, backdrop, off-panel).
    useEffect(() => {
        if (!armed) return;

        const stop = () => {
            gestureRef.current = null;
            setArmed(false);
        };

        const handleMove = (event: PointerEvent) => {
            const gesture = gestureRef.current;
            if (!gesture || event.pointerId !== gesture.pointerId) return;

            const delta = event.clientX - gesture.startX;

            if (!gesture.active) {
                if (Math.abs(delta) < DRAG_START_THRESHOLD) return;
                // An opening (edge) gesture must move rightward; otherwise abandon it.
                if (gesture.source === 'edge' && delta <= 0) {
                    setOffset(null);
                    stop();
                    return;
                }
                gesture.active = true;
            }

            setOffset(clamp(gesture.startOffset + delta));
            if (event.cancelable) event.preventDefault();
        };

        const handleEnd = (event: PointerEvent) => {
            const gesture = gestureRef.current;
            if (!gesture || event.pointerId !== gesture.pointerId) return;

            const wasActive = gesture.active;
            const finalOffset = clamp(gesture.startOffset + (event.clientX - gesture.startX));
            const { source } = gesture;
            stop();
            setOffset(null);

            if (!wasActive) {
                // No real drag: a tap on the backdrop closes; presses elsewhere pass through.
                if (source === 'backdrop') onClose();
                return;
            }
            if (finalOffset > DRAWER_WIDTH / 2) onOpen();
            else onClose();
        };

        window.addEventListener('pointermove', handleMove, { passive: false });
        window.addEventListener('pointerup', handleEnd);
        window.addEventListener('pointercancel', handleEnd);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerup', handleEnd);
            window.removeEventListener('pointercancel', handleEnd);
        };
    }, [armed, onOpen, onClose]);

    // Close on Escape, matching standard drawer behaviour.
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);

    const translateX = dragging
        ? -(DRAWER_WIDTH - (offset as number))
        : (open ? 0 : -DRAWER_WIDTH);
    const progress = dragging ? (offset as number) / DRAWER_WIDTH : (open ? 1 : 0);
    const transition = dragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    // Render into <body> so our position:fixed layers are viewport-relative.
    // (The AppBar uses backdrop-filter, which would otherwise make it the
    // containing block and clip the backdrop to the 64px header height.)
    return createPortal(
        <>
            {!open && (
                <EdgeArea onPointerDown={(event) => beginGesture(event, 'edge')} />
            )}

            {(open || dragging) && (
                <Backdrop
                    onPointerDown={(event) => beginGesture(event, 'backdrop')}
                    style={{
                        opacity: progress,
                        transition: dragging ? 'none' : 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1600,
                    }}
                />
            )}

            <Panel
                onPointerDown={(event) => beginGesture(event, 'panel')}
                style={{
                    transform: `translateX(${translateX}px)`,
                    transition,
                    pointerEvents: open || dragging ? 'auto' : 'none',
                    backgroundColor: theme.palette.background.default,
                    zIndex: 1601,
                }}
            >
                {children}
            </Panel>
        </>,
        document.body,
    );
};
