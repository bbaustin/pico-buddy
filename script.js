/****************************
/ / /\ \ \___  _ __ __| |___ 
\ \/  \/ / _ \| '__/ _` / __|
 \  /\  / (_) | | | (_| \__ \
  \/  \/ \___/|_|  \__,_|___/
******************************/

const textBox = document.querySelector('#t');

/* Dictionary */
// Emojis
const BUD_EMOJIS = ['❤️', '💖', '😊', '😍', '🤩', '👾'];
const EGG_EMOJIS = ['🐣', '🥚', '🍳', '🍼', '👶'];
const EYE_EMOJIS = ['👁️', '🧿', '👁️‍🗨️', '🪬', '👀'];

// Names
const PICOBUDDY = `PicoBuddy ${getRandom(BUD_EMOJIS)}`;
const EGGBABY = `EggBaby ${getRandom(EGG_EMOJIS)}`;
const EYEGUY = `EyeGuy ${getRandom(EYE_EMOJIS)}`;
const UNBECOMING = 'The Great Unbecoming';

// Game Phrases
const BUTTON_INSTRUCTIONS = `Use the buttons beneath your ${PICOBUDDY}!`;

// Script Phrases
const SEE = "Let's see what it looks like...";
const NOT_OMINOUS = 'This is totally normal and not ominous!';
const EVOLVING = "Oh! It's evolving!";
const NOPE = 'It no longer has any use for this.';

// Script End phrases
const TREATED = `You treated your ${PICOBUDDY} `;
const TREATED_RESULT = `Your ${PICOBUDDY} sees this as a sign of `;
const UNBECOMING_BEGINS = `when ${UNBECOMING} begins.`;

const REASSURING_PHRASES = [
  "Don't worry!",
  "Don't sweat it!",
  'Take a chill pill!',
  "It's totally chill!",
  "Haha! It's all good!",
  "Anyway, it'll all be over soon!",
  "It's supposed to happen this way!",
];
const NORMAL_HUNGRY_PHRASES = [
  `Oh! Your ${PICOBUDDY} is hungry!`,
  `You better give your ${PICOBUDDY} some food!`,
];
const DARK_HUNGRY_PHRASES = [
  `Your ${PICOBUDDY} must feed!`,
  `Your ${PICOBUDDY} must consume!`,
];
const TRICLOPS_PHRASES = [
  "It doesn't want anything.",
  'It waits.',
  'It watches.',
];

/* Script */
// Day 1, 2, 3, 4
const t1 = `Congratulations on your new ${PICOBUDDY}!`;
const t2 = SEE;
const t3 = `Oh! It's an ${EGGBABY}!`;
const t4 = "It's an egg with a diaper! That's pretty cute!";
const t5 = `When it cries, you'll have to feed it, give it water, change its diaper, or play with it! ${BUTTON_INSTRUCTIONS}`;
const t6 = `Your ${PICOBUDDY} will reach full maturity in 13 days! ${NOT_OMINOUS} ${getRandom(
  REASSURING_PHRASES
)}`;

// Day 5, 6, 7, 8
const t7 = EVOLVING;
const t8 = SEE;
const t9 = `Oh! It's an ${EYEGUY}!`;
const t10 = `He's like a... a floating eye! ${NOT_OMINOUS}`;

// Day 9, 10, 11, 12
const t11 = EVOLVING;
const t12 = SEE;
const t13 = "Oh! It's an...";
const t14 = 'Um...';
const t15 = "It's got more eyes!";

// Day 13
const t16 = EVOLVING;
const t17 = 'This is its final form!';
const t18 = SEE;
const t19 = "Oh! That's a lotta eyes!";

// End
const t20 = `Hmm... I guess your ${PICOBUDDY} no longer requires your servitude!`;

/*************************************
| |__  _   _  __| | __| (_) ___  ___ 
| '_ \| | | |/ _` |/ _` | |/ _ \/ __|
| |_) | |_| | (_| | (_| | |  __/\__ \
|_.__/ \__,_|\__,_|\__,_|_|\___||___/
*************************************/

/** The screen where buddies are shown */
const buddyScreen = document.querySelector('#pb');

const eggBaby = {
  width: 16,
  height: 16,
  filledInTiles: [
    5, 6, 7, 8, 9, 10, 20, 27, 35, 44, 50, 61, 65, 69, 74, 78, 81, 94, 97, 102,
    105, 110, 113, 119, 120, 126, 129, 142, 145, 158, 162, 163, 164, 165, 166,
    167, 168, 169, 170, 171, 172, 173, 178, 189, 195, 200, 201, 202, 204, 211,
    220, 228, 235, 245, 246, 247, 248, 249, 250,
  ],
};

const floatingEye = {
  width: 16,
  height: 16,
  filledInTiles: [
    5, 6, 7, 8, 9, 10, 11, 12, 20, 21, 29, 30, 38, 39, 40, 41, 42,
  ],
};

const triclops = {
  width: 32,
  height: 32,
  filledInTiles: [],
};

const finalForm = {
  width: 64,
  height: 64,
  filledInTiles: [],
};

function drawPixels(character) {
  const { width, height, filledInTiles } = character;
  const gridSize = width * height;

  for (let i = 0; i < gridSize; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('p');
    if (filledInTiles.includes(i)) {
      pixel.classList.add('fill');
    }
    buddyScreen.appendChild(pixel);
  }
}

drawPixels(floatingEye);

// class Bud {
//   constructor(
//     stage,
//   )
//
// }

/*************************************
  _____   _____ _ __ | |_ ___ 
 / _ \ \ / / _ \ '_ \| __/ __|
|  __/\ V /  __/ | | | |_\__ \
 \___| \_/ \___|_| |_|\__|___/
*************************************/
let DAY = 1;
const DAY_EVENT_SCHEDULE = [
  // egg baby
  3, 3, 3,
  // eye guy
  2, 2, 2,
  // triclops
  4, 4, 4,
  // final form
  0,
];

// TODO: Every evolution, pop an event type.
const eventTypes = ['food', 'water', 'diaper'];
const activeEvents = []; // TODO: Might not need this
const activeEventsHolder = document.querySelector('#ae');

/** 'food', 'water', 'diaper' */
let lastEvent = '';

const DELAY_BETWEEN_EVENTS = [10000, 13000, 15000];

// TODO: These might wanna be methods . I wish I were using TS
/**
 *
 * @param {'food' | 'water' | 'diaper'} event type
 */
// TODO: add these phrases in the dictionary for peace of mind, and just grab 'em here
function askForSomething(eventType) {
  // start timer. if quickly resolved, add to happiness
  let phrase = `Your ${PICOBUDDY} is `;
  if (eventType === 'food') {
    appendTextSequentially([`${phrase} hungry! ${BUTTON_INSTRUCTIONS}`]);
    activeEvents.push('food');
    createEventLi('feed');
  }
  if (eventType === 'water') {
    appendTextSequentially([`${phrase} thirsty! ${BUTTON_INSTRUCTIONS}`]);
    activeEvents.push('water');
    createEventLi('hydrate');
  }
  if (eventType === 'diaper') {
    appendTextSequentially([
      `Your ${PICOBUDDY} has a dirty diaper! ${BUTTON_INSTRUCTIONS}`,
    ]);
    activeEvents.push('diaper');
    createEventLi('clean');
  }
  return;
}

/**
 *
 * @param {string} whatToDo - a verb coming from askForSomething, based on the picobuddy's demands
 */
function createEventLi(whatToDo) {
  const listItem = document.createElement('li');
  const timer = createTimer();
  listItem.innerHTML = `${whatToDo}! - `;
  listItem.append(timer);
  activeEventsHolder.prepend(listItem);
}

function createTimer() {
  const newTimer = document.createElement('span');
  let sec = 13;
  newTimer.innerHTML = sec;
  let timing = setInterval(() => {
    // probably want a data-id to stop timer when event is achieved
    newTimer.innerHTML = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timing);
      // do happiness meter thing
    }
  }, 1000);
  return newTimer;
}

/**
 *
 * @param {'food' | 'water' | 'diaper' | 'play'} something
 */
function receiveSomething(something) {
  if (something === 'food') {
  }
  if (something === 'water') {
  }
  if (something === 'diaper') {
  }
  if (something === 'play') {
  }
}

function getRandomEvent() {
  let newEvent;
  do {
    newEvent = getRandom(eventTypes);
  } while (newEvent === lastEvent);
  lastEvent = newEvent;
  return askForSomething(newEvent);
}

getRandomEvent();

/******************
 /\ /\| |_(_) |___ 
/ / \ \ __| | / __|
\ \_/ / |_| | \__ \
 \___/ \__|_|_|___/
*******************/
/**
 * Utility function to create a delay.
 * @param {number} ms - Delay in milliseconds.
 * @returns {Promise} - A promise that resolves after the delay.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//////// TODO: You might not need this stuff? Cuz you might want arrows, so you don't have to guess how long it takes poeple to read
/**
 * Appends text to the textBox with a delay.
 * @param {number} ms - Delay in milliseconds.
 * @param {string} text - The text to display.
 */
async function appendText(ms, text) {
  await delay(ms);
  textBox.textContent = text;
}

/**
 * Sequentially appends an array of sentences to the textBox.
 * @param {Array<string>} sentences - Array of sentences to display.
 * @param {number} delayMs - Delay between each sentence.
 */
async function appendTextSequentially(sentences, delayMs) {
  for (const sentence of sentences) {
    await appendText(delayMs, sentence);
  }
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Call the function with the sentences and delay
appendTextSequentially([PICOBUDDY, EGGBABY], 3000);
