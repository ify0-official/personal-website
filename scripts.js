// ==========================================
// 1. PROCEDURAL AUDIO GENERATOR (GLOBAL)
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Unlock audio on user interaction
async function unlockAudio() {
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }
}

document.addEventListener('mouseenter', unlockAudio);
document.addEventListener('keydown', unlockAudio);
document.addEventListener('click', unlockAudio);
document.addEventListener('touchstart', unlockAudio);

async function playProceduralTick() {
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    const t = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.03;
    const buffer = audioCtx.createBuffer(
        1,
        bufferSize,
        audioCtx.sampleRate,
    );
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3000;
    filter.Q.value = 1;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start(t);
    noise.stop(t + 0.03);
}

// Expose globally for app.js
window.playProceduralTick = playProceduralTick;

// Navigation setup - will be called after app.js loads
window.setupKeyboardNavigation = () => {
    const buttons = document.querySelectorAll(".bar-link");

    buttons.forEach((btn) => {
        btn.addEventListener("mouseenter", playProceduralTick);
        btn.addEventListener("touchstart", playProceduralTick, {
            passive: true,
        });
    });

    document.addEventListener("keydown", async (event) => {
        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        )
            return;

        const key = event.key;
        if (key >= "1" && key <= "5") {
            const targetId = `nav-${key}`;
            const targetButton = document.getElementById(targetId);

            if (targetButton) {
                event.preventDefault();

                // 1. Play the sound and wait for audio context to unlock
                await playProceduralTick();

                const nextPage = targetButton.getAttribute("data-page");

                // In SPA mode, just show the page instead of navigating
                if (typeof window.showPage === 'function') {
                    await delay(30);
                    window.showPage(nextPage);
                    targetButton.focus({ preventScroll: true });
                } else {
                    console.error('showPage function not found');
                }
            }
        }
    });
};

// Helper to pause execution for X milliseconds
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
