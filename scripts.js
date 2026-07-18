document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. PROCEDURAL AUDIO GENERATOR
    // ==========================================
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

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

    // Helper to pause execution for X milliseconds
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // ==========================================
    // 2. NAVIGATION LOGIC
    // ==========================================
    const buttons = document.querySelectorAll(".bar-link");
    const currentPath =
        window.location.pathname.split("/").pop() || "index.html";

    buttons.forEach((btn) => {
        const targetPage = btn.getAttribute("data-page");

        if (targetPage === currentPath) {
            btn.setAttribute("aria-current", "page");
            btn.classList.add("force-focus");
            btn.focus({ preventScroll: true });
        } else {
            btn.removeAttribute("aria-current");
            btn.classList.remove("force-focus");
        }

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

                if (nextPage === currentPath) {
                    targetButton.focus({ preventScroll: true });
                    targetButton.classList.add("force-focus");
                } else {
                    // 2. WAIT 150ms to let the sound finish playing before leaving the page
                    await delay(30);
                    window.location.href = nextPage;
                }
            }
        }
    });
});
