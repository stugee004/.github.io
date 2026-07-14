let playerData = {

    cenes:0

};


function rewardWin(difficulty){

    let rewards = {

        easy:50,

        medium:100,

        hard:250,

        expert:500,

        impossible:1000

    };


    playerData.cenes += rewards[difficulty];

}
