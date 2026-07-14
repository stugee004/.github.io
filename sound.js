const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playHit() {

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "square";
    osc.frequency.value = 500;

    gain.gain.value = 0.12;

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.08
    );

    osc.stop(audioContext.currentTime + 0.08);

}
