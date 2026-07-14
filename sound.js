const audioContext = new (window.AudioContext || window.webkitAudioContext)();

document.addEventListener("click", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}, { once: true });

function tone(type, frequency, duration, volume = 0.15) {

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.value = frequency;

    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + duration
    );

    osc.stop(audioContext.currentTime + duration);

}

// Paddle hit
function playHit(){
    tone("square", 550, 0.06);
}

// Wall hit
function playWall(){
    tone("triangle", 300, 0.05);
}

// Score
function playScore(){

    tone("triangle", 350, 0.08);

    setTimeout(()=>{
        tone("triangle",550,0.12);
    },90);

}

// Ability unlocked
function playAbility(){

    tone("sine",500,0.08);

    setTimeout(()=>{
        tone("sine",700,0.08);
    },80);

    setTimeout(()=>{
        tone("sine",900,0.15);
    },160);

}

// Coin / Cenes
function playCoin(){

    tone("triangle",900,0.05);

    setTimeout(()=>{
        tone("triangle",1300,0.08);
    },40);

}

// Victory
function playVictory(){

    const notes = [523,659,784,1047];

    notes.forEach((note,index)=>{

        setTimeout(()=>{
            tone("triangle",note,0.25);
        },index*170);

    });

}

// Defeat
function playDefeat(){

    const notes = [400,320,260];

    notes.forEach((note,index)=>{

        setTimeout(()=>{
            tone("sawtooth",note,0.25);
        },index*170);

    });

}

// Constellation discovered
function playConstellation(){

    const notes=[900,1200,1500];

    notes.forEach((note,index)=>{

        setTimeout(()=>{
            tone("sine",note,0.12,0.08);
        },index*80);

    });

}
