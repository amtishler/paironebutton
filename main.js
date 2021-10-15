title = "Getaway";

description = `
Try to Escape!
`;

characters = [
`
  ll
  ll  
l ll l
llllll
ll  ll
cc  cc
`,`
 LLL  
 LlLL
LLLLLL
LLLLLL
 LLLL
  LLL
`,`
  ll  
 llll
rrrrrr
rrrrrr
rrrrrr
rrrrrr
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 150,
	LANES: 4,
	LANE_WIDTH: 100 / 4,
	SHIP_SPEED: 5,
	ITEM_SPEED: 10,
	ITEM_SPAWN_RATE: 10,
	PLAYER_INPUT_FRAMES: 10
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "pixel"
};

/**
* @typedef {{
* pos: Vector,
* speed: number
* }} Star
*/

/**
* @type { Star [] }
*/
let stars;

/**
* @typedef {{
* pos: Vector,
* isBoosting: boolean,
* frameTimer: number,
* frameTimerEnabled: boolean,
* move: boolean,
* isMovingLeft: boolean
* }} Player
*/

/**
* @type { Player }
*/
let player;

/**
* @type { number }
*/
let currentHeight;

/**
* @typedef {{
* pos: Vector
* }} Item
*/

/**
* @type { Item }
*/
let meteor;

/**
* @type { Item }
*/
let boost;


function initialize()
{
	//initialize the stars
	stars = times(20, () => {
		const posX = rnd(0, G.WIDTH);
		const posY = rnd(0, G.HEIGHT);
		return {
			pos: vec(posX, posY),
			speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
		};
	});

	player = {
		pos: vec((G.LANE_WIDTH * (G.LANES / 2)) - (G.LANE_WIDTH / 2), G.HEIGHT / 2),
		isBoosting: false,
		frameTimer: 0,
		frameTimerEnabled: false,
		move: false,
		isMovingLeft: false
	}

	currentHeight = G.HEIGHT / 2;
}

function characterController()
{
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	player.pos.y += 0.5;
	if (player.pos.y <= G.HEIGHT/4) player.pos.y = G.HEIGHT/4
	if (player.pos.y >= G.HEIGHT) end();

	if(input.isJustPressed) {
		player.frameTimerEnabled = true;
	}

	if(player.move)
	{
		if(player.isMovingLeft)
		{
			color("cyan");
			line(player.pos.x, player.pos.y, player.pos.x - G.LANE_WIDTH, player.pos.y, 5);
			player.pos.x -= G.LANE_WIDTH;
		} else
		{
			color("cyan");
			line(player.pos.x, player.pos.y, player.pos.x + G.LANE_WIDTH, player.pos.y, 5);
			player.pos.x += G.LANE_WIDTH;
		}
		player.move = false;
	}

	if(player.isBoosting)
	{
		boostFunction();
	}

	if(player.pos.x >= (G.LANE_WIDTH * G.LANES) - (G.LANE_WIDTH / 2))
	{
		player.isMovingLeft = true;
	} else if(player.pos.x <= (G.LANE_WIDTH / 2))
	{
		player.isMovingLeft = false;
	}
	
	color("black");
	char("a", player.pos);
}

function inputTimer()
{
	if(player.frameTimerEnabled)
	{
		player.frameTimer++;
		if(input.isJustReleased)
		{
			player.move = true;
			player.frameTimer = 0;
			player.frameTimerEnabled = false;
		}else if(player.frameTimer >= G.PLAYER_INPUT_FRAMES)
		{
			player.isBoosting = true;
			player.frameTimer = 0;
			player.frameTimerEnabled = false;
		}
	}
}

function boostFunction()
{
	player.pos.y -= 1;
	color("cyan");
	particle(
		player.pos.x - 2.5,
		player.pos.y + 3,
		4,
		1,
		PI/2,
		PI/8
	)
	color("cyan");
	particle(
		player.pos.x + 1.5,
		player.pos.y + 3,
		4,
		1,
		PI/2,
		PI/8
	)

	if(input.isJustReleased)
	{
		player.isBoosting = false;
	}
}

function starManager()
{
		stars.forEach((s) => {
		s.pos.y += s.speed;
		s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

		color("light_cyan");
		box(s.pos, 1);
	});
}

function update() {
	if (!ticks) {
		initialize();
	}

	characterController();

	inputTimer();

	starManager();

}
