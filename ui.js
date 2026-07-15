/*==================================================
    Hyper Pong Engine V2
    ui.js
    Part 1
==================================================*/



class MouseManager{

    constructor(){

        this.x = 0;
        this.y = 0;

        this.down = false;
        this.clicked = false;

        this.canvas = null;

    }



    initialize(canvasElement){

        this.canvas = canvasElement;



        canvasElement.addEventListener("mousemove",e=>{

            const rect =
                canvasElement.getBoundingClientRect();

            this.x =
                (e.clientX-rect.left)*
                (canvas.width/rect.width);

            this.y =
                (e.clientY-rect.top)*
                (canvas.height/rect.height);

        });



        canvasElement.addEventListener("mousedown",()=>{

            this.down = true;
            this.clicked = true;

            if(typeof sounds!=="undefined")
                sounds.unlock();

        });



        window.addEventListener("mouseup",()=>{

            this.down = false;

        });

    }



    update(){

        this.clicked = false;

    }

}



const Mouse =
    new MouseManager();







class Animation{

    static lerp(a,b,t){

        return a+(b-a)*t;

    }



    static clamp(v,min,max){

        return Math.max(
            min,
            Math.min(max,v)
        );

    }

}








class UIComponent{

    constructor(x,y,w,h){

        this.x=x;
        this.y=y;

        this.width=w;
        this.height=h;

        this.visible=true;
        this.enabled=true;

        this.alpha=1;

    }



    contains(mx,my){

        return(

            mx>=this.x &&

            mx<=this.x+this.width &&

            my>=this.y &&

            my<=this.y+this.height

        );

    }



    update(){}



    draw(){}

}









class UIButton extends UIComponent{

    constructor(
        x,
        y,
        w,
        h,
        text,
        callback
    ){

        super(x,y,w,h);

        this.text=text;

        this.callback=callback;

        this.hover=false;

        this.glow=0;

        this.scale=1;

    }







    update(){

        if(!this.visible)return;



        this.hover=
            this.contains(
                Mouse.x,
                Mouse.y
            );



        if(this.hover){

            this.glow=
                Animation.lerp(
                    this.glow,
                    1,
                    .15
                );



            this.scale=
                Animation.lerp(
                    this.scale,
                    1.05,
                    .15
                );



            if(Mouse.clicked){

                if(this.callback){

                    this.callback();

                }

            }

        }

        else{

            this.glow=
                Animation.lerp(
                    this.glow,
                    0,
                    .15
                );



            this.scale=
                Animation.lerp(
                    this.scale,
                    1,
                    .15
                );

        }

    }







    draw(ctx){

        if(!this.visible)return;



        ctx.save();



        ctx.translate(

            this.x+this.width/2,

            this.y+this.height/2

        );



        ctx.scale(

            this.scale,

            this.scale

        );



        ctx.shadowBlur=
            25*this.glow;



        ctx.shadowColor="cyan";



        ctx.fillStyle=
            "rgba(15,25,45,.92)";



        ctx.strokeStyle=
            "cyan";



        ctx.lineWidth=2;



        ctx.beginPath();

        ctx.roundRect(

            -this.width/2,

            -this.height/2,

            this.width,

            this.height,

            14

        );



        ctx.fill();

        ctx.stroke();



        ctx.fillStyle="white";



        ctx.font=
            "24px Arial";



        ctx.textAlign="center";

        ctx.textBaseline="middle";



        ctx.fillText(

            this.text,

            0,

            0

        );



        ctx.restore();

    }

}










class UILabel extends UIComponent{

    constructor(

        x,

        y,

        text,

        size=28

    ){

        super(x,y,0,0);

        this.text=text;
        this.size=size;

    }



    draw(ctx){

        if(!this.visible)return;



        ctx.save();



        ctx.fillStyle="white";



        ctx.shadowBlur=20;

        ctx.shadowColor="cyan";



        ctx.font=
            `${this.size}px Arial`;



        ctx.textAlign="center";



        ctx.fillText(

            this.text,

            this.x,

            this.y

        );



        ctx.restore();

    }

}










class UIPanel extends UIComponent{

    constructor(

        x,

        y,

        w,

        h

    ){

        super(x,y,w,h);

    }



    draw(ctx){

        if(!this.visible)return;



        ctx.save();



        ctx.fillStyle=
            "rgba(8,15,30,.82)";



        ctx.strokeStyle="cyan";



        ctx.lineWidth=2;



        ctx.shadowBlur=30;

        ctx.shadowColor="cyan";



        ctx.beginPath();



        ctx.roundRect(

            this.x,

            this.y,

            this.width,

            this.height,

            18

        );



        ctx.fill();

        ctx.stroke();



        ctx.restore();

    }

}
/*==================================================
    ui.js
    Part 2
    UI Manager
==================================================*/

class UIManager{

    constructor(){

        this.components = [];

        this.menuComponents = [];

        this.initialized = false;

        this.titlePulse = 0;

    }






    initialize(){

        if(this.initialized){

            return;

        }

        this.initialized = true;



        if(typeof canvas !== "undefined"){

            Mouse.initialize(canvas);

        }



        this.buildMainMenu();
        this.buildShop();
        this.buildAbilities();
        this.createDefaultScreens();
        this.openScreen("menu");
    }






    add(component){

        this.components.push(component);

        return component;

    }






    buildMainMenu(){

        this.menuComponents = [];



        const panel =
            new UIPanel(

                canvas.width/2-240,

                70,

                480,

                560

            );



        this.menuComponents.push(panel);






        const playButton =
            new UIButton(

                canvas.width/2-140,

                220,

                280,

                60,

                "▶ PLAY",

                ()=>{

                    if(typeof State!=="undefined"){

                        State.startGame();

                    }

                }

            );



        this.menuComponents.push(playButton);






const shopButton =
    new UIButton(

        canvas.width/2-140,

        310,

        280,

        60,

        "🛒 SHOP",

        ()=>{

            if(typeof State !== "undefined"){

                State.openShop();

            }


            if(typeof shopUI !== "undefined"){

                shopUI.open();

            }

        }

    );



        this.menuComponents.push(shopButton);






const abilitiesButton =
    new UIButton(

        canvas.width/2-140,

        380,

        280,

        60,

        "✨ ABILITIES",

        ()=>{

            if(typeof State !== "undefined"){

                State.openAbilities();

            }


            if(typeof abilitiesUI !== "undefined"){

                abilitiesUI.open();

            }

        }

    );


this.menuComponents.push(
    abilitiesButton
);





        const difficultyButton =
            new UIButton(

                canvas.width/2-140,

                490,

                280,

                60,

                "🎯 DIFFICULTY",

                ()=>{

                    this.cycleDifficulty();

                }

            );



        difficultyButton.id =
            "difficulty";



        this.menuComponents.push(difficultyButton);

    }








    cycleDifficulty(){

        if(typeof save==="undefined"){

            return;

        }



        let current =
            save.get(
                "settings.difficulty"
            );



        switch(current){

            case "easy":

                current="medium";

                break;

            case "medium":

                current="hard";

                break;

            default:

                current="easy";

        }



        save.set(

            "settings.difficulty",

            current

        );

    }








    update(){

        if(!this.initialized){

            return;

        }



        this.titlePulse += .05;



        if(

            typeof State !== "undefined"

            &&

            State.current==="menu"

        ){

            this.menuComponents.forEach(c=>{

                c.update();

            });

        }



        this.updateNotifications();

this.updateTransition();

Mouse.update();

this.updateScreens();

    }








    draw(){

        if(!this.initialized){

            return;

        }



        if(

            typeof State==="undefined"

        ){

            return;

        }

        //this.drawMenuBackground();

        switch(State.current){

            case "menu":

                this.drawMainMenu();

                break;



            case "shop":

    this.drawShopScreen();

    this.drawNotifications();

    this.drawPause();

    this.drawTransition();

    this.drawScreens();

    break;



            case "abilities":

    this.drawAbilitiesScreen();

    break;

        }
        this.drawVersion();
    }








    drawMainMenu(){

        this.menuComponents.forEach(c=>{

            c.draw(ctx);

        });





        ctx.save();



        ctx.textAlign="center";



        ctx.shadowBlur=

            35+

            Math.sin(

                this.titlePulse

            )*10;



        ctx.shadowColor="cyan";



        ctx.fillStyle="white";



        ctx.font="bold 72px Arial";



        ctx.fillText(

            "HYPER PONG",

            canvas.width/2,

            150

        );





        ctx.font="20px Arial";



        ctx.shadowBlur=10;



        let cenes=0;



        if(typeof economy!=="undefined"){

            cenes=economy.cenes;

        }



        ctx.fillText(

            "💰 "+cenes+" Cenes",

            canvas.width/2,

            190

        );





        let difficulty="Medium";



        if(

            typeof save!=="undefined"

        ){

            difficulty=

                save.get(

                    "settings.difficulty"

                );

        }



        difficulty=

            difficulty.charAt(0).toUpperCase()

            +

            difficulty.slice(1);



        ctx.fillStyle="cyan";



        ctx.font="18px Arial";



        ctx.fillText(

            "Difficulty: "+difficulty,

            canvas.width/2,

            585

        );



        ctx.restore();

    }








    drawShopPlaceholder(){

        ctx.save();



        ctx.fillStyle="white";



        ctx.textAlign="center";



        ctx.font="52px Arial";



        ctx.fillText(

            "SHOP",

            canvas.width/2,

            120

        );



        ctx.font="24px Arial";



        ctx.fillText(

            "Coming in Part 3",

            canvas.width/2,

            180

        );



        ctx.restore();

    }








    drawAbilitiesPlaceholder(){

        ctx.save();



        ctx.fillStyle="white";



        ctx.textAlign="center";



        ctx.font="52px Arial";



        ctx.fillText(

            "ABILITIES",

            canvas.width/2,

            120

        );



        ctx.font="24px Arial";



        ctx.fillText(

            "Coming in Part 4",

            canvas.width/2,

            180

        );



        ctx.restore();

    }

}



const UI =
    new UIManager();
/*==================================================
    ui.js
    Part 3
    Shop Screen
==================================================*/

UI.shopButtons = [];



UI.buildShop = function(){

    this.shopButtons = [];



    let y = 170;



    if(typeof shop === "undefined"){

        return;

    }



    Object.keys(shop.items).forEach(key=>{

        const item =
            shop.items[key];



        const button =
            new UIButton(

                canvas.width-250,

                y+20,

                170,

                44,

                item.owned ?
                    "OWNED" :
                    "BUY",

                ()=>{

                    if(item.owned){

                        return;

                    }



                    shop.buy(key);



                    this.buildShop();

                }

            );



        button.itemKey = key;



        this.shopButtons.push(button);



        y += 95;

    });

};







UI.drawShopScreen = function(){

    ctx.save();



    const panel =
        new UIPanel(

            70,

            50,

            canvas.width-140,

            canvas.height-100

        );



    panel.draw(ctx);





    ctx.fillStyle = "white";

    ctx.textAlign = "center";



    ctx.font = "bold 56px Arial";



    ctx.shadowBlur = 30;

    ctx.shadowColor = "cyan";



    ctx.fillText(

        "SHOP",

        canvas.width/2,

        105

    );





    let cenes = 0;

    if(typeof economy !== "undefined"){

        cenes = economy.cenes;

    }



    ctx.font = "24px Arial";



    ctx.fillStyle = "gold";



    ctx.fillText(

        "💰 " + cenes + " Cenes",

        canvas.width/2,

        140

    );





    if(typeof shop === "undefined"){

        ctx.restore();

        return;

    }





    let y = 170;



    Object.keys(shop.items).forEach(key=>{

        const item =
            shop.items[key];



        ctx.fillStyle =
            "rgba(18,28,48,.9)";



        ctx.strokeStyle = "cyan";



        ctx.lineWidth = 2;



        ctx.beginPath();



        ctx.roundRect(

            100,

            y,

            canvas.width-320,

            75,

            14

        );



        ctx.fill();

        ctx.stroke();





        ctx.fillStyle = "white";



        ctx.font = "bold 24px Arial";



        ctx.fillText(

            item.name,

            220,

            y+30

        );





        ctx.font = "16px Arial";



        ctx.fillStyle = "#99ddff";



        ctx.fillText(

            item.description || "",

            260,

            y+56

        );





        ctx.fillStyle = "gold";



        ctx.font = "20px Arial";



        ctx.fillText(

            item.cost + " C",

            canvas.width-340,

            y+42

        );



        y += 95;

    });





    this.shopButtons.forEach(button=>{

        button.update();

        button.draw(ctx);

    });





    ctx.restore();

};
/*==================================================
    ui.js
    Part 4
    Abilities + Navigation
==================================================*/

UI.abilityButtons = [];





UI.buildAbilities = function(){

    this.abilityButtons = [];



    if(typeof abilities === "undefined"){

        return;

    }



    let y = 170;



    Object.keys(
        abilities.abilities
    ).forEach(key=>{

        const ability =
            abilities.abilities[key];



        const button =
            new UIButton(

                canvas.width-250,

                y+20,

                170,

                44,

                ability.unlocked ?
                    "UNLOCKED" :
                    "UNLOCK",

                ()=>{

                    if(ability.unlocked){

                        return;

                    }



                    abilities.unlock(key);



                    this.buildAbilities();

                }

            );



        button.abilityKey = key;



        this.abilityButtons.push(button);



        y += 95;

    });





    this.backButton =

        new UIButton(

            70,

            canvas.height-70,

            180,

            45,

            "← BACK",

            ()=>{

                if(typeof State!=="undefined"){

                    State.openMenu();

                }

            }

        );

};









UI.drawAbilitiesScreen = function(){

    const panel =

        new UIPanel(

            70,

            50,

            canvas.width-140,

            canvas.height-100

        );



    panel.draw(ctx);





    ctx.save();



    ctx.textAlign = "center";



    ctx.shadowBlur = 30;

    ctx.shadowColor = "cyan";



    ctx.fillStyle = "white";



    ctx.font = "bold 54px Arial";



    ctx.fillText(

        "ABILITIES",

        canvas.width/2,

        105

    );





    let cenes = 0;

    if(typeof economy!=="undefined"){

        cenes = economy.cenes;

    }



    ctx.font = "22px Arial";



    ctx.fillStyle = "gold";



    ctx.fillText(

        "💰 "+cenes+" Cenes",

        canvas.width/2,

        140

    );





    if(typeof abilities!=="undefined"){

        let y = 170;



        Object.keys(

            abilities.abilities

        ).forEach(key=>{

            const ability =

                abilities.abilities[key];



            ctx.fillStyle =

                "rgba(20,30,55,.90)";



            ctx.strokeStyle =

                "cyan";



            ctx.lineWidth = 2;



            ctx.beginPath();



            ctx.roundRect(

                100,

                y,

                canvas.width-320,

                75,

                14

            );



            ctx.fill();

            ctx.stroke();





            ctx.fillStyle = "white";



            ctx.font = "bold 24px Arial";



            ctx.fillText(

                ability.name,

                220,

                y+30

            );





            ctx.fillStyle = "#99ddff";



            ctx.font = "16px Arial";



            ctx.fillText(

                ability.description || "",

                250,

                y+56

            );





            ctx.fillStyle =

                ability.unlocked ?

                "#55ff88" :

                "gold";



            ctx.font = "20px Arial";



            ctx.fillText(

                ability.unlocked ?

                "Unlocked" :

                ability.cost+" C",

                canvas.width-340,

                y+42

            );



            y += 95;

        });

    }





    this.abilityButtons.forEach(button=>{

        button.update();

        button.draw(ctx);

    });





    this.backButton.update();

    this.backButton.draw(ctx);



    ctx.restore();

};









UI.drawMenuBackground = function(){

    ctx.save();



    const gradient =

        ctx.createLinearGradient(

            0,

            0,

            0,

            canvas.height

        );



    gradient.addColorStop(

        0,

        "#04060d"

    );



    gradient.addColorStop(

        1,

        "#081a33"

    );



    ctx.fillStyle = gradient;



    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    ctx.restore();

};









UI.drawVersion = function(){

    ctx.save();



    ctx.font = "16px Arial";



    ctx.fillStyle = "#66ccff";



    ctx.textAlign = "right";



    ctx.fillText(

        "Hyper Pong V2",

        canvas.width-20,

        canvas.height-20

    );



    ctx.restore();

};
/*==================================================
    ui.js
    Part 5
    Notifications
    Fade Transitions
    Pause Overlay
==================================================*/



UI.notifications = [];



UI.transition = {

    alpha:0,

    target:0,

    speed:0.06

};



UI.paused = false;





UI.notify = function(

    text,

    color="cyan"

){

    this.notifications.push({

        text,

        color,

        life:240,

        y:40

    });

};









UI.updateNotifications = function(){

    this.notifications.forEach(n=>{

        n.life--;

        n.y += 0.15;

    });



    this.notifications =

        this.notifications.filter(

            n=>n.life>0

        );

};









UI.drawNotifications = function(){

    ctx.save();



    ctx.textAlign="center";



    this.notifications.forEach((n,i)=>{

        ctx.globalAlpha=

            Math.min(

                1,

                n.life/60

            );



        ctx.fillStyle=

            "rgba(15,25,45,.92)";



        ctx.strokeStyle=

            n.color;



        ctx.lineWidth=2;



        ctx.beginPath();



        ctx.roundRect(

            canvas.width/2-170,

            n.y+i*60,

            340,

            42,

            12

        );



        ctx.fill();

        ctx.stroke();



        ctx.fillStyle="white";



        ctx.font="20px Arial";



        ctx.fillText(

            n.text,

            canvas.width/2,

            n.y+27+i*60

        );

    });



    ctx.restore();

};









UI.fadeToBlack=function(){

    this.transition.target=1;

};





UI.fadeIn=function(){

    this.transition.target=0;

};









UI.updateTransition=function(){

    this.transition.alpha=

        Animation.lerp(

            this.transition.alpha,

            this.transition.target,

            this.transition.speed

        );

};









UI.drawTransition=function(){

    if(this.transition.alpha<0.01)

        return;



    ctx.save();



    ctx.globalAlpha=

        this.transition.alpha;



    ctx.fillStyle="black";



    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    ctx.restore();

};









UI.drawPause=function(){

    if(!this.paused)

        return;



    ctx.save();



    ctx.fillStyle=

        "rgba(0,0,0,.65)";



    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    ctx.textAlign="center";



    ctx.fillStyle="white";



    ctx.shadowBlur=30;

    ctx.shadowColor="cyan";



    ctx.font="bold 70px Arial";



    ctx.fillText(

        "PAUSED",

        canvas.width/2,

        canvas.height/2-20

    );



    ctx.font="22px Arial";



    ctx.fillText(

        "Press ESC to Resume",

        canvas.width/2,

        canvas.height/2+40

    );



    ctx.restore();

};









window.addEventListener(

    "keydown",

    e=>{

        if(e.key==="Escape"){

            UI.paused=!UI.paused;



            if(typeof State!=="undefined"){

                if(UI.paused){

                    State.pause();

                }

                else{

                    State.resume();

                }

            }

        }

    }

);









State.onChange((current)=>{

    UI.fadeToBlack();



    setTimeout(()=>{

        UI.fadeIn();

    },180);





    switch(current){

        case "shop":

            UI.notify(

                "Opened Shop"

            );

            break;



        case "abilities":

            UI.notify(

                "Opened Abilities"

            );

            break;



        case "playing":

            UI.notify(

                "Good Luck!"

            );

            break;

    }

});
/*==================================================
    ui.js
    Part 6
    Screen Manager
==================================================*/



class UIScreen{

    constructor(name){

        this.name = name;

        this.components = [];

        this.visible = false;

    }



    add(component){

        this.components.push(component);

        return component;

    }



    show(){

        this.visible = true;

    }



    hide(){

        this.visible = false;

    }



    update(){

        if(!this.visible){

            return;

        }

        this.components.forEach(c=>c.update());

    }



    draw(){

        if(!this.visible){

            return;

        }

        this.components.forEach(c=>c.draw(ctx));

    }

}







UI.screens = {};

UI.currentScreen = null;





UI.addScreen = function(name){

    const screen =

        new UIScreen(name);

    this.screens[name] = screen;

    return screen;

};





UI.openScreen = function(name){

    Object.values(this.screens).forEach(screen=>{

        screen.hide();

    });

    if(this.screens[name]){

        this.screens[name].show();

        this.currentScreen = this.screens[name];

    }

};





UI.updateScreens = function(){

    if(this.currentScreen){

        this.currentScreen.update();

    }

};





UI.drawScreens = function(){

    if(this.currentScreen){

        this.currentScreen.draw();

    }

};







UI.createDefaultScreens = function(){

    this.addScreen("menu");

    this.addScreen("shop");

    this.addScreen("abilities");

    this.addScreen("pause");

    this.addScreen("victory");

};







if(typeof State !== "undefined"){

    State.onChange(state=>{

        UI.openScreen(state);

    });

}
