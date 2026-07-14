const sounds = {

    function playHit() {
    const audio = new AudioContext();

    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = "square";
    osc.frequency.value = 500;

    gain.gain.value = 0.15;

    osc.connect(gain);
    gain.connect(audio.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 0.08
    );

    osc.stop(audio.currentTime + 0.08);
}

    score: new Audio("sounds/score.wav"),

    victory: new Audio("sounds/victory.wav"),

    ability: new Audio("sounds/ability.wav")

};


function playSound(name){

    if(sounds[name]){

        sounds[name].currentTime = 0;
        sounds[name].play();

    }

}
