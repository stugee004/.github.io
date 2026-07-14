function saveGame(){

    localStorage.setItem(
        "hyperPongSave",
        JSON.stringify(playerData)
    );

}

function loadGame(){

    const save = localStorage.getItem("hyperPongSave");

    if(save)
        Object.assign(playerData,JSON.parse(save));

}
