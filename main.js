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
	LANE_WIDTH: 20,
	SHIP_SPEED: 5,
	ITEM_SPEED: 10,
	ITEM_SPAWN_RATE: 10
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "dark"
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
* isBoosting: boolean
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



function update() {
	if (!ticks) {
		stars = times(20, () => {
			const posX = rnd(0, G.WIDTH);
			const posY = rnd(0, G.HEIGHT);
			return {
				pos: vec(posX, posY),
				speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
			};
		});

		player = {
			pos: vec(G.WIDTH / 2, G.HEIGHT / 2),
			isBoosting: false
		}

		currentHeight = G.HEIGHT / 2;
	}
	//Control scheme 1
	player.pos = vec(input.pos.x, currentHeight);
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	currentHeight += 0.5;
	if (currentHeight <= G.HEIGHT/4) currentHeight = G.HEIGHT/4
	if(input.isPressed) {
		currentHeight -= 1;
		color("cyan");
		particle(
			player.pos.x - 2,
			player.pos.y + 3,
			4,
			1,
			PI/2,
			PI/8
		)
		color("cyan");
		particle(
			player.pos.x + 2,
			player.pos.y + 3,
			4,
			1,
			PI/2,
			PI/8
		)
	}


	color("black");
	char("a", player.pos);

	stars.forEach((s) => {
		s.pos.y += s.speed;
		s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

		color("light_cyan");
		box(s.pos, 1);
	});
}
