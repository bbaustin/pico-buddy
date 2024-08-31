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
const PICOBUDDY = `PicoBuddy${getRandom(BUD_EMOJIS)}`;
const EGGBABY = `EggBaby${getRandom(EGG_EMOJIS)}`;
const EYEGUY = `EyeGuy${getRandom(EYE_EMOJIS)}`;
const UNBECOMING = 'The Great Unbecoming';

// Game Phrases
const BUTTON_INSTRUCTIONS = `Use the buttons beneath your ${PICOBUDDY}!`;
const PLAY = `Your ${PICOBUDDY} had a great time playing!`;
const NOPE = 'It no longer has any use for this.';
const NOT_NOW = `Your ${PICOBUDDY} doesn't need this right now! Thanks, though!${BUD_EMOJIS}`;

// Script Phrases
const SEE = "Let's see what it looks like...";
const NOT_OMINOUS = 'I assure you, there is nothing ominous about this!';
const EVOLVING = "Oh! It's evolving!";

// Script End phrases
const TREATED = `You treated your ${PICOBUDDY} `;
const TREATED_RESULT = `Your ${PICOBUDDY} sees this as a sign of `;
const UNBECOMING_BEGINS = `when ${UNBECOMING} begins.`;

const REASSURING_PHRASES = [
  "Don't worry!",
  "Don't sweat it!",
  "It's totally chill!",
  "It's supposed to happen this way!",
];

// TODO: Create an object of phrases for each event type. This is a bit complicated, because it does likely depend on the day etc.
/**
 * const EVENT_PHRASES = {
 *  wants {
 *    food: '',
 *    water: '',
 *    diaper: '',
 * },
 *  receives {
 *    food: '',
 *    water: '',
 *    diaper: '',
 *    play: ''
 * }
 *
 * }
 */
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
    5, 6, 7, 8, 9, 10, 11, 12, 20, 21, 29, 30, 38, 39, 40, 41, 42, 51, 52, 53,
    58, 59, 60, 65, 66, 67, 68, 76, 77, 81, 84, 86, 87, 88, 89, 92, 93, 94, 96,
    97, 99, 102, 103, 104, 105, 108, 110, 111, 112, 115, 118, 119, 121, 124,
    127, 128, 129, 132, 134, 135, 136, 137, 140, 143, 145, 146, 147, 148, 156,
    158, 159, 164, 165, 166, 171, 172, 173, 174, 182, 183, 184, 185, 186, 187,
    188, 189, 194, 195, 196, 212, 213, 214, 215, 216, 217, 218, 219,
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
  let { width, height, filledInTiles } = character;
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

function adjustGridSizeTo64(buddy, originalGridSize = 16) {
  const { filledInTiles } = buddy;
  const newFilledInTiles = [];
  const newGridSize = 64;
  // const rowOffset = 48; // 64 - 16
  // const colOffset = 24; // (64 - 16) / 2

  filledInTiles.forEach((tile) => {
    const originalRow = Math.floor(tile / originalGridSize);
    const originalCol = tile % originalGridSize;

    const newRow = originalRow + (newGridSize - originalGridSize);
    const newCol = originalCol + (newGridSize - originalGridSize) / 2;

    const newTileIndex = newRow * newGridSize + newCol;
    newFilledInTiles.push(newTileIndex);
  });
  return {
    width: 64,
    height: 64,
    filledInTiles: newFilledInTiles,
  };
}

drawPixels(adjustGridSizeTo64(eggBaby));

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

const eventTypeVerbs = {
  food: 'feed',
  water: 'hydrate',
  diaper: 'clean',
  play: 'play',
};

// TODO: Every evolution, pop an event type.
const eventTypes = ['food', 'water', 'diaper'];
/**
 * Array<'food | 'water' | 'diaper'>
 */
const activeEvents = []; // TODO: Might not need this
const activeEventsHolder = document.querySelector('ol');

/** 'food', 'water', 'diaper' */
// might not need this either? nice to have for early days though. only used in getRandomEvent
let lastEvent = '';

const DELAY_BETWEEN_EVENTS = [3000, 4000, 5000, 6000];

/**
 *
 * @param {'food' | 'water' | 'diaper'} event type
 */
function askForSomething(eventType) {
  activeEvents.push(eventType);
  createEventLi(eventType);
  return;
}

/**
 * Adds an li to go in the "list of demands". The first list item also removes the text "None"
 * @param {string} eventType - coming from askForSomething, based on the picobuddy's demands. Morphed into a 'verb' here
 */
function createEventLi(eventType) {
  if (activeEventsHolder.textContent.includes('None')) {
    activeEventsHolder.textContent = '';
  }
  const listItem = document.createElement('li');
  const timer = createTimer();
  listItem.innerHTML = `${eventTypeVerbs[eventType]}! - `;
  listItem.dataset.eventType = eventType;
  listItem.append(timer);
  activeEventsHolder.prepend(listItem);
}

/**
 * Creates timer, which counts down from 13 seconds. To be added to the "list of demands" li
 * @returns timer (HTMLSpanElement)
 */
function createTimer() {
  const newTimer = document.createElement('span');
  let sec = 13;
  newTimer.innerHTML = sec;
  let timing = setInterval(() => {
    sec--;
    newTimer.innerHTML = sec;
    if (sec <= 0) {
      manageHappines(-1.67);
      // TODO: determine if you want stuff to get greyed out etc.
      clearInterval(timing);
    }
  }, 1000);

  // Return a function to stop the timer
  newTimer.stop = () => {
    clearInterval(timing);
  };

  return newTimer;
}

const buttons = document.getElementsByClassName('b');
buttons[0].addEventListener('click', () => {
  giveSomething('food');
});
buttons[1].addEventListener('click', () => {
  giveSomething('water');
});
buttons[2].addEventListener('click', () => {
  giveSomething('diaper');
});
buttons[3].addEventListener('click', () => {
  giveSomething('play');
});

/**
 *
 * @param {'food' | 'water' | 'diaper' | 'play'} something
 */
function giveSomething(something) {
  /* Handle PLAY, which is never requested */
  if (something === 'play') {
    if (DAY < 4) {
      manageHappines(1);
      // animation
      // sound
      return renderEachLetter(PLAY);
    } else {
      return renderEachLetter(NOPE);
    }
  }
  /* Look in the JS array of active events for the first instance of whatever button you clicked */
  const firstIndexOfGivenEvent = activeEvents.indexOf(something);
  const hasGivenEvent = firstIndexOfGivenEvent !== -1;

  /* Handle wrong thing given */
  if (!hasGivenEvent) {
    return renderEachLetter(NOT_NOW);
  }

  /* Grab all the DOM li */
  const lis = activeEventsHolder.querySelectorAll('li');

  /* Get the first one that matches what you gave AND is not completed yet */
  const firstFound = [...lis].find(
    (li) => li.dataset.eventType === something && !li.dataset.completed
  );

  /* It should totally exist */
  if (!firstFound) {
    console.log('wtf');
    return;
  }

  const timer = firstFound.querySelector('span');

  /* Stop the timer */
  timer.stop();

  const timerRemainder = parseFloat(timer.textContent);

  /* Update the happiness meter, depending on how many seconds are left in the timer */
  if (timerRemainder > 9) {
    manageHappines(2);
  } else if (timerRemainder > 0) manageHappines(1);

  /* Add some stylin' */
  firstFound.style.textDecoration = 'line-through';

  /* Add 'completed' for further button clicks */
  firstFound.dataset.completed = true;

  /* Remove from JS array */
  activeEvents.splice(firstIndexOfGivenEvent, 1);
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
getRandomEvent();
getRandomEvent();

const happinessMeterMarker = document.querySelector('#hmm');
let happiness = 0;
/**
 * Add a percentage to move the happiness meter. Max is 45%, min is -45%.
 * // TODO: Smooth move with
 * @param {number} happinessAddend - amount to add / subtract to the happiness meter. 3 for super fast, 2 for normal, and 1 for playing. minus is -1.67
 */
function manageHappines(happinessAddend) {
  happiness += happinessAddend;
  happiness = clamp(happiness, -45, 45);
  handleHappinessMeterMarker(happiness);
  happinessMeterMarker.style.left = `${happiness}%`;
}

function handleHappinessMeterMarker(happiness) {
  if (happiness === -45) {
    happinessMeterMarker.textContent = '😭';
  } else if (happiness < -15) {
    happinessMeterMarker.textContent = '😢';
  } else if (happiness < 15) {
    happinessMeterMarker.textContent = '🙂';
  } else if (happiness < 45) {
    happinessMeterMarker.textContent = '😀';
  } else {
    happinessMeterMarker.textContent = '🥰';
  }
}

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

async function renderEachLetter(text) {
  let temp = '';
  for (const character of text) {
    temp += character;
    textBox.textContent = temp;
    await delay(20);
  }
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

renderEachLetter(t6);
