 //Variáveis do JOGO
var screen = null;

//Variáveis dos PERSONAGENS DO JOGO
var asteroids = [];
var ship;

//Variáveis dos CONTROLES
var LG = {KEYS: []}; //Verifica se existe alguma tecla pressionada ou não


var GameLayer = cc.Layer.extend({
	
	spriteShip: [],
	score: 0,
	scoreLabel: null,

	spriteFrameCache: cc.SpriteFrameCache.getInstance(),
	animeCache: cc.AnimationCache.getInstance(),

	init:function(){
		//Pega o tamanho da tela
	    screen = cc.Director.getInstance().getWinSize();
	    //Cria o Layer do jogo
		this.layerGame = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 800, 480);    

	    // Coloca as vidas no jogo
            this.putLives();
            
            // Coloca os pontos
	    this.putScore();
	
		//Habilita o teclado/touch como controle
		if ('keyboard' in sys.capabilities)
	    	this.setKeyboardEnabled(true);
		else if('touches' in sys.capabilities)
	        this.setTouchEnabled(true);
		
	    //Coloca GameSpriteSheet na memória
	    this.spriteFrameCache.addSpriteFrames("res/spritesheets/GameSpriteSheet.plist", "res/spritesheets/GameSpriteSheet.png");

        //Coloca o SpaceShip.js no jogo
	    this.ship = new SpaceShip();
    	this.layerGame.addChild(this.ship);
	    
        //Coloca o Asteroids.js no jogo
        for(i=0; i<7; i++){
        	this.asteroids = new Asteroid();
        	this.layerGame.addChild(this.asteroids);
        }
        
        this.addChild(this.layerGame);
        this.scheduleUpdate();
        return true;
    },
    
	onKeyDown:function (e) {
        LG.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        LG.KEYS[e] = false;
    },
    
    putLives:function(){
	count = 0;
    	for(var i=0; i<3; i++)
        {
            this.spriteShip = cc.Sprite.create("res/images/ship_14-24.png");
            this.spriteShip.setPosition(30 + count, screen.height - 30);
            this.layerGame.addChild(this.spriteShip);
	    count = count + 14;
        }
    },
    putScore:function(){
        this.scoreLabel = cc.LabelTTF.create(this.score, "VectorB", 24);
	this.scoreLabel.setColor( new cc.Color3B(255, 255, 255) );
        this.scoreLabel.setPosition(new cc.Point(screen.width - 40, screen.height - 40) );
        this.layerGame.addChild(this.scoreLabel);
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});
