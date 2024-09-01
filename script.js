/*************************************
| |__  _   _  __| | __| (_) ___  ___ 
| '_ \| | | |/ _` |/ _` | |/ _ \/ __|
| |_) | |_| | (_| | (_| | |  __/\__ \
|_.__/ \__,_|\__,_|\__,_|_|\___||___/
*************************************/

/** The screen where buddies are shown */
const buddyScreen = document.querySelector('#pb');

/**
 * EggBaby has its tiles drawn in a 16x16 grid, instead of the final 64x64 grid.
 * So, to render EggBaby on the full-sized grid, we need to adjust its filled-in tiles.
 * This will render it correctly:
 * drawPixels([...adjustGridSizeTo64(eggBaby)]);
 */
function drawEggBaby() {
  drawPixels([...adjustGridSizeTo64(eggBaby)]);
  // make sound
}
const eggBaby = [
  5, 6, 7, 8, 9, 10, 20, 27, 35, 44, 50, 61, 65, 69, 74, 78, 81, 94, 97, 102,
  105, 110, 113, 119, 120, 126, 129, 142, 145, 158, 162, 163, 164, 165, 166,
  167, 168, 169, 170, 171, 172, 173, 178, 189, 195, 200, 201, 202, 204, 211,
  220, 228, 235, 245, 246, 247, 248, 249, 250,
];

/**
 * EyeGuy has its tiles drawn in a 16x16 grid, instead of the final 64x64 grid.
 * So, to render EggBaby on the full-sized grid, we need to adjust its filled-in tiles.
 * This will render it correctly:
 * drawPixels([...adjustGridSizeTo64(eyeGuy)]);
 */
function drawEyeGuy() {
  drawPixels([...adjustGridSizeTo64(eyeGuy, 16, 32, 0)]);
}
const eyeGuy = [
  5, 6, 7, 8, 9, 10, 11, 12, 20, 21, 29, 30, 38, 39, 40, 41, 42, 51, 52, 53, 58,
  59, 60, 65, 66, 67, 68, 76, 77, 81, 84, 86, 87, 88, 89, 92, 93, 94, 96, 97,
  99, 102, 103, 104, 105, 108, 110, 111, 112, 115, 118, 119, 121, 124, 127, 128,
  129, 132, 134, 135, 136, 137, 140, 143, 145, 146, 147, 148, 156, 158, 159,
  164, 165, 166, 171, 172, 173, 174, 182, 183, 184, 185, 186, 187, 188, 189,
  194, 195, 196, 212, 213, 214, 215, 216, 217, 218, 219,
];

/**
 * TriEye's tiles are already adjusted to the 64x64 grid.
 * So, to render, you can just use:
 * drawPixels(triEye);
 */
function drawTriEye() {
  drawPixels(triEye);
}
const triEye = [
  ...adjustGridSizeTo64(eyeGuy, 16, 32, 0),
  ...adjustGridSizeTo64(eyeGuy, 16, 22, 9),
  ...adjustGridSizeTo64(eyeGuy, 16, 23, -7),
];

/**
 * Final Form's tiles are already adjusted to the 64x64 grid.
 * So, to render, you can just use:
 * drawPixels(finalForm)
 */
function drawFinalForm() {
  drawPixels(finalForm);
}
const finalForm = [
  // top
  ...adjustGridSizeTo64(eyeGuy, 16, 45, 0),
  // row 2
  ...adjustGridSizeTo64(eyeGuy, 16, 36, -7),
  ...adjustGridSizeTo64(eyeGuy, 16, 35, 8),
  // row 3
  ...adjustGridSizeTo64(eyeGuy, 16, 25, -16),
  ...adjustGridSizeTo64(eyeGuy, 16, 24, 0),
  ...adjustGridSizeTo64(eyeGuy, 16, 25, 16),
  // row 4
  ...adjustGridSizeTo64(eyeGuy, 16, 15, -23),
  ...adjustGridSizeTo64(eyeGuy, 16, 13, -8),
  ...adjustGridSizeTo64(eyeGuy, 16, 13, 8),
  ...adjustGridSizeTo64(eyeGuy, 16, 13, 22),
  // row 5
  ...adjustGridSizeTo64(eyeGuy, 16, 1, -17),
  ...adjustGridSizeTo64(eyeGuy, 16, 3, -1),
  ...adjustGridSizeTo64(eyeGuy, 16, 3, 15),
];

function drawPixels(filledInTiles) {
  for (let i = 0; i < 4096; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('p');
    if (filledInTiles.includes(i)) {
      pixel.classList.add('fill');
    }
    buddyScreen.appendChild(pixel);
  }
}

function adjustGridSizeTo64(
  filledInTiles,
  originalGridSize = 16,
  extraRowOffset = 4,
  extraColOffset = 0
) {
  const newFilledInTiles = [];
  const newGridSize = 64;

  filledInTiles.forEach((tile) => {
    const originalRow = Math.floor(tile / originalGridSize);
    const originalCol = (tile % originalGridSize) + extraColOffset;

    const newRow =
      originalRow + (newGridSize - originalGridSize - extraRowOffset);
    const newCol = originalCol + (newGridSize - originalGridSize) / 2;

    const newTileIndex = newRow * newGridSize + newCol;
    newFilledInTiles.push(newTileIndex);
  });
  return newFilledInTiles;
}

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
const PICOBUDDY = () => {
  const emoji = getRandom(BUD_EMOJIS);
  return `${emoji}PicoBuddy${emoji}`;
};
const EGGBABY = () => {
  const emoji = getRandom(EGG_EMOJIS);
  return `${emoji}EggBaby${emoji}`;
};
const EYEGUY = () => {
  const emoji = getRandom(EYE_EMOJIS);
  `${emoji}EyeGuy${emoji}`;
};
const UNBECOMING = 'The Great Unbecoming';

// Game Phrases
const BUTTON_INSTRUCTIONS = `Use the buttons below the screen 🟣 🟣 🟣 🟣 !`;
const PLAY = `Your ${PICOBUDDY()} had a great time playing!`;
const NOPE = 'It no longer has any use for this.';
const NOT_NOW = `Your ${PICOBUDDY()} doesn't need this right now! Thanks, though!${BUD_EMOJIS.join(
  ' '
)}`;

// Script Phrases
const SEE = "Let's see what it looks like...";
const NOT_OMINOUS = 'I assure you, there is nothing ominous about this 😎 !';
const EVOLVING = "Oh! It's evolving!";

// Script End phrases
const TREATED = `You treated your ${PICOBUDDY()} `;
const TREATED_RESULT = `Your ${PICOBUDDY()} sees this as a sign of `;
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
  `Oh! Your ${PICOBUDDY()} is hungry!`,
  `You better give your ${PICOBUDDY()} some food!`,
];
const DARK_HUNGRY_PHRASES = [
  `Your ${PICOBUDDY()} must feed!`,
  `Your ${PICOBUDDY()} must consume!`,
];
const TRIEYE_PHRASES = [
  "It doesn't want anything.",
  'It waits.',
  'It watches.',
];

/**************************
 ___  ___ _ __(_)_ __ | |_ 
/ __|/ __| '__| | '_ \| __|
\__ \ (__| |  | | |_) | |_ 
|___/\___|_|  |_| .__/ \__|
                |_|        
**************************/
/* Script */
// Day 1, 2, 3, 4
const eventsDay1To4 = [
  `Congratulations on your new ${PICOBUDDY()} !`,
  SEE,
  () => drawEggBaby(),
  // `Oh! It's an ${EGGBABY()} !`,
  // "It's an egg with a diaper 🥚🧷 ! That's pretty cute 😍 !",
  // `When it cries 🥺, you'll have to feed it 🍗, give it water 💦, change its diaper 🧷, or play with it 🧸 !`,
  // `${BUTTON_INSTRUCTIONS}`,
  // `Your ${PICOBUDDY()} will reach full maturity in 13 days!`,
  // `${NOT_OMINOUS}`,
  // `${getRandom(REASSURING_PHRASES)}`,
  // `Oh! Looks like your ${PICOBUDDY()} needs something!`,
  `Check out the "Current Demands" list below your ${PICOBUDDY()} device!`,
  () => getRandomEvent(),
  () => delay(8000),
  () => getRandomEvent(),
  () => delayBetweenEvents(),
  () => getRandomEvent(),
];

// Day 5, 6, 7, 8
const eventsDay5To8 = [
  EVOLVING,
  SEE,
  () => drawEyeGuy(),
  `Oh! It's an ${EYEGUY()} !`,
  `He's like a... a floating eye! ${NOT_OMINOUS}`,
];

// Day 9, 10, 11, 12
const eventsDay9To12 = [
  EVOLVING,
  SEE,
  () => drawTriEye(),
  "Oh! It's an...",
  'Um...',
  "It's got more eyes!",
];

// Day 13
const eventsDay13 = [
  EVOLVING,
  'This is its final form!',
  SEE,
  () => drawFinalForm(),
  "Oh! That's a lotta eyes!",
  // End
  `Hmm... I guess your ${PICOBUDDY()} no longer requires your servitude!`,
];

handleScriptEventsSequentially(eventsDay1To4);

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
  // triEye
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

async function delayBetweenEvents() {
  delay(getRandom(DELAY_BETWEEN_EVENTS));
}

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

/**
 * Renders text character-by-character, like old-school video game scroll.
 * TODO: These can be color-coded based on 1. fun or 2. type by adding class to newTextContainer
 * @param { string } text
 */
async function renderEachLetter(text) {
  const newTextContainer = document.createElement('div');
  textBox.prepend(newTextContainer);
  let temp = '';
  for (const character of text) {
    temp += character;
    newTextContainer.innerHTML = temp;
    await delay(20);
  }
}

/**
 * This will take an array of messages; it will render the first one,
 * look at the number of characters in the previous one, and
 * render the next one based on the total time it takes to render the previous one
 *
 * @param {Array<string>} messages - array of messages.
 * @param {boolean} delayBetweenMessages - if you want a delay between each separate message, add it here
 */
async function handleScriptEventsSequentially(scriptEvents, addDelay = true) {
  for (const scriptEvent of scriptEvents) {
    if (typeof scriptEvent === 'string') {
      await renderEachLetter(scriptEvent);
    } else if (typeof scriptEvent === 'function') {
      await scriptEvent();
    }

    if (addDelay) {
      /* Calculate delay based on message length */
      const baseDelay = 500; // Base delay in ms for short messages
      const lengthFactor = 20; // Additional ms per character in the message
      const messageDelay = baseDelay + scriptEvent.length * lengthFactor;
      await delay(messageDelay);
    }
  }
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
