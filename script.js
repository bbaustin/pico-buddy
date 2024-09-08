/*****************************
  __ _| | ___ | |__   __ _| |
 / _` | |/ _ \| '_ \ / _` | |
| (_| | | (_) | |_) | (_| | |
 \__, |_|\___/|_.__/ \__,_|_|
 |___/                       
 global
*******************************/

/**
 * Array<'feed' | 'hydrate' | 'clean' | 'play'>
 */
let DAY = 1;

const activeEvents = [];
const activeEventsHolder = document.querySelector('ol');

const eventTypeVerbs = {
  feed: 'feed',
  hydrate: 'hydrate',
  clean: 'clean',
  play: 'play',
};

const bod = document.body;
const buttonHolder = document.getElementById('bh');

/**
 *
 * @param {{
 * feed: string,
 * hydrate: string,
 * clean: string,
 * play: string}} verbs
 */
function setButtons(verbs, optionalClickEvent) {
  buttonHolder.innerHTML = '';
  Object.values(verbs).forEach((verb) => {
    const button = document.createElement('button');
    button.addEventListener('click', () => {
      giveSomething(verb);
      if (optionalClickEvent) {
        optionalClickEvent(button);
      }
    });
    button.classList.add('b');
    buttonHolder.appendChild(button);
    const p = document.createElement('p');
    p.textContent = verb;
    button.appendChild(p);
  });
}
setButtons(eventTypeVerbs);

const labels = document.querySelectorAll('.b p');

/*************************************
| |__  _   _  __| | __| (_) ___  ___ 
| '_ \| | | |/ _` |/ _` | |/ _ \/ __|
| |_) | |_| | (_| | (_| | |  __/\__ \
|_.__/ \__,_|\__,_|\__,_|_|\___||___/
buddies
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
  // Clear the previous pixels
  buddyScreen.innerHTML = '';

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
words
******************************/

const textBox = document.querySelector('#t');

/* Dictionary */
// Emojis
const BUD_EMOJIS = ['💗', '💞', '💓', '💖', '😊', '😍', '🤩', '👾'];
const EGG_EMOJIS = ['🐣', '🥚', '🍳', '🍼', '👶'];
const EYE_EMOJIS = ['👁️', '🧿', '👁️‍🗨️', '🪬', '👀'];
const BUTTON_EMOJI = '🟣 🟣 🟣 🟣 ';

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
  return `${emoji}EyeGuy${emoji}`;
};
const UNBECOMING = 'The Great Unbecoming';

// Game Phrases
const BUTTON_INSTRUCTIONS = `Use the buttons below the screen ${BUTTON_EMOJI} !`;

// const PLAY = `Your ${PICOBUDDY()} had a great time playing!`;
// const NOPE = 'It no longer has any use for this.';
const NOT_NOW = `Your ${PICOBUDDY()} doesn't need this right now! Thanks, though ${getRandom(
  BUD_EMOJIS
)} !`;
const J_NOT_NOW = 'ちょっと違うね。。！ 😅'; //'それは今必要ではないな。。。'
const PRAISE_PHRASES = [
  'Good job!',
  'Nicely done!',
  `Your ${PICOBUDDY()} is pleased!`,
  'Way to go!',
  'You rule 😎 !',
  'You rock 🎸 !',
];
const J_PRAISE_PHRASES = [
  'よくやった 👍！',
  'できた 👏！！',
  'やったね 🎉！',
  'すごい 🎸！',
];
const DAY_FINISHED_PHRASES = [
  "OK, I think that's all for today!",
  `OK, time for your ${PICOBUDDY()}'s bedtime!`,
  `OK, time for your ${PICOBUDDY()} to sleep now!`,
];
const J_DAY_FINISHED_PHRASES = 'OK, 終わりました！　おやすみなさい！';
const PROCEED = `${
  DAY === 6 ? J_DAY_FINISHED_PHRASES : getRandom(DAY_FINISHED_PHRASES)
} Click the button to the right of your ${PICOBUDDY()} device to proceed!`;
const CHECK_LIST = 'Check out the list of current demands!';
const SLOW = 'You were a little too slow... 🐢';
const J_SLOW = '遅いな。。。🐢';

// Script Phrases
const SEE = "Let's see what it looks like...";
const NOT_OMINOUS = 'I assure you, this is totally normal and not ominous 😎 !';
const EVOLVING = "Oh! It's evolving!";

// Script End phrases
const TREATED = `You treated your ${PICOBUDDY()} `;
const TREATED_RESULT = `Your ${PICOBUDDY()} sees this as a sign of `;
const UNBECOMING_BEGINS = `when ${UNBECOMING} begins.`;

const REASSURING_PHRASES = [
  "Don't worry!",
  "Don't sweat it!",
  "It's totally chill!",
  'Nothing to worry about!',
  'Take a chill pill!',
];

// const NORMAL_HUNGRY_PHRASES = [
//   `Oh! Your ${PICOBUDDY()} is hungry!`,
//   `You better give your ${PICOBUDDY()} some food!`,
// ];
// const DARK_HUNGRY_PHRASES = [
//   `Your ${PICOBUDDY()} must feed!`,
//   `Your ${PICOBUDDY()} must consume!`,
// ];
// const TRIEYE_PHRASES = [
//   "It doesn't want anything.",
//   'It waits.',
//   'It watches.',
// ];

/**************************
 ___  ___ _ __(_)_ __ | |_ 
/ __|/ __| '__| | '_ \| __|
\__ \ (__| |  | | |_) | |_ 
|___/\___|_|  |_| .__/ \__|
                |_|        
                script
**************************/
/* Script */

const day12Events = [
  // `Congratulations on your new ${PICOBUDDY()} !`,
  // SEE,
  () => drawEggBaby(),
  // `Oh! It's an ${EGGBABY()} !`,
  // "It's an egg with a diaper 🥚🧷 ! That's pretty cute 😍 !",
  // `When it cries 🥺, you'll have to feed it 🍗, give it water 💦, give it a bath 🛁, or play with it 🧸 !`,
  // `${BUTTON_INSTRUCTIONS}`,
  // `Your ${PICOBUDDY()} will reach full maturity in 13 days!`,
  // `${NOT_OMINOUS}`,
  // `${getRandom(REASSURING_PHRASES)}`,
  // `Oh! Looks like your ${PICOBUDDY()} needs something!`,
  // `Check out the "Current Demands" list below your ${PICOBUDDY()} device!`,
  ...runStandardDay(3),
];

const day2Events = [
  "Good morning! Today's a brand new day! 🎉",
  `Just to let you know, your ${PICOBUDDY()} should be pretty easy to handle for the first few days. 😌`,
  'But they usually get a bit more demanding as time goes on. 😅',
  'So enjoy these early days while they last! ⏳',
  `In the end, our memories are the only things we have, as the universe continues its slow, silent march towards the eternal nothingness of ${UNBECOMING}.`,
  `Oh! I think your ${PICOBUDDY()} might be hungry! 🍇🍉🥝`,
  CHECK_LIST,
  ...runStandardDay(),
];

const day3Events = [
  'I think you got the hang of it! Today might be a little bit more intense! 🏃‍♀️💨',
  'But you totally got this! I believe in you!',
  CHECK_LIST,
  ...runStandardDay(5, 0),
];

const day4Events = [
  'So, actually, before we start today, I have something exciting to share!',
  `Your ${PICOBUDDY()} is going to 🐒evolve🚶‍♂️‍➡️ soon!`,
  "I can't wait to see what it will turn into! 🦋",
  CHECK_LIST,
  ...runStandardDay(10, 1000),
];

const day5Events = [
  EVOLVING,
  SEE,
  () => drawEyeGuy(),
  `Oh! It's an ${EYEGUY()} !`,
  `He's like a... a floating eye! ${NOT_OMINOUS}`,
  'Well, actually... I have to be totally honest with you...',
  `I've heard that weird stuff can happen if your ${PICOBUDDY()} evolves into an ${EYEGUY()}... 😬`,
  "But like, don't sweat it! 😓 ➡️ 🤗 You'll be totally fine!",
  () => delay(1000),
  () => toggleClass('flip', document.body),
  'Huh, did something just change on your end?',
  CHECK_LIST,
  ...runStandardDay(5, 1000),
];

const japaneseVocab = ['食べる', '飲む', '入浴する', '遊ぶ'];

const day6Events = [
  () => toggleClass('flip', document.body), // return to normal.
  "Yesterday wasn't so bad, right? But glad to have things back to normal.",
  '今日は普通の日なので、よかったですね 😅 ！',
  'さ、🥰ピコバディ🥰 は今日何がほしかな。。？',
  'じゃ、始めましょうか！！',
  () =>
    setButtons({
      feed: japaneseVocab[0],
      hydrate: japaneseVocab[1],
      clean: japaneseVocab[2],
      play: japaneseVocab[3],
    }),
  ...runStandardDay(7, 3500, japaneseVocab),
];

const day7Events = [
  () => setButtons(eventTypeVerbs),
  `Seems like your ${EYEGUY()} messed up the language settings yesterday! Sorry about that 🙇!`,
  "I hate to say it, but today, something's wrong with your mouse 🖱️...",
  `I think your ${EYEGUY()} deleted the cursor png or something...`,
  // todo--> you need to toggle class here, right?
  'Well, anyway, good luck!',
  CHECK_LIST,
  ...runStandardDay(10),
];

const day8Events = [
  'OK, sorry about yesterday 🤕.',
  'We totally fixed the cursor problem 🖱️, and you should be able to see your cursor again today.',
  `Oh, one more thing: it looks like your ${PICOBUDDY()} might evolve again soon!`,
  'Just keep up the good work and it might evolve into something cute 😘 !',
  () => makeManyCursors(),
  ...runStandardDay(10),
];

/**  */
const day9Events = [
  'Super sorry about all the technical issues recently!',
  `As I said, your ${EYEGUY()} can cause some weird stuff to happen...`,
  'But, good news: today it is going to evolve!!',
  'Think of all the possibilities of life! 🧬 🐟 🦕 🐊 🐿️ 🦍 🧍',
  'I have a really good feeling about this!',
  SEE,
  () => drawTriEye(),
  "Oh! It's an...",
  'Um...',
  () => delay(1000),
  "Well, I've never seen this before.",
  "I wouldn't say it's super cute, but... 😶",
  "Beauty is in the eye of the beholder 👁️! Or, in the 'eyes', if you will... 👁️👁️👁️!",
  () => {
    labels.forEach((label) => {
      toggleClass('invisible', label);
    });
  },
  `Hmm, it looks like the labeling systems for your ${PICOBUDDY()} device's buttons suddenly stopped working.`,
  'Sorry... Good luck with today!',
  ...runStandardDay(8, 1000),
];

// TODO: Glitch text
const day10Events = [
  /* Reset back to normal */
  () => {
    labels.forEach((label) => {
      toggleClass('invisible', label);
    });
  },
  /* Add random move on button click */
  () => {
    setButtons(eventTypeVerbs, moveToRandomLocation);
  },
  `Hey! We got the labels working again on the buttons ${BUTTON_EMOJI}!`,
  "I'm not totally convinced that the buttons are working perfectly, though 😖 😖 😖 😖!",
  'As one thing is fixed 🥳, another thing breaks 🤕!',
  `It's like a microcosm of the entropic descent of ${UNBECOMING} 🫥!`,
  'Sometimes trying to keep everything from falling apart feels kind of futile 😮‍💨!',
  "But on the other hand, it's fun to witness and participate in the absurdity of human effort!",
  'Together, we can do anything 💪 But also nothing 🤔',
  "But yeah, anyway 😀! Let's keep going!",
  CHECK_LIST,
  ...runStandardDay(7, 1500),
];

// Add better script here
const day11Events = [
  () => {
    document
      .querySelectorAll('.b')
      .forEach((button) => (button.style.position = 'initial'));
  },
  () =>
    setButtons({
      hydrate: 'hydrate',
      play: 'play',
      feed: 'feed',
      clean: 'clean',
    }),
  'Hey there!',
  `Your ${PICOBUDDY()} is really causing some problems with its device's buttons ${BUTTON_EMOJI}!`,
  'But the problem is allllmoooooossssst fixed!',
  "Alright, let's have an awesome day 🌈 ! What do you say? 😊",
  CHECK_LIST,
  ...runStandardDay(7),
];

// All eye emojis for labels and text?
const day1Events = [
  garbleText("Hey! I've got good news 😊 and... more good news 😇!"),
  garbleText('The button issue is finally resolved, I think 🙌!'),
  garbleText(
    `Also, I think your ${PICOBUDDY()} will evolve one last time 🥳!!!`
  ),
  garbleText('This is its final form!!'), // TODO: Special text?
  garbleText(
    "The last two evolutions weren't that cute 😒, so I have really high hopes for this last one 😍 !!!"
  ),
  garbleText("Alright, let's work hard 💪 play hard ⛹️ until then!"),
  ...runStandardDay(7),
];

const day13Events = [
  'OK, this is the 13th day!!!',
  `Your ${PICOBUDDY()} is going to evolve into its final form!`,
  SEE,
  () => drawFinalForm(),
  'Wow!!!',
  'I recognize this 👀! This is super exciting!!!',
  `This is the harbinger of ${UNBECOMING}!`,
  'I think this is ⭐️literally⭐️ the last day!',
  'Everything we worked for leads up to this!',
  `So let's have fun with our ${PICOBUDDY()} one more time 😄`,
  CHECK_LIST,
  ...runStandardDay(13, 0),
  // TODO: Run events with a mix of stuf from pervious chaos days
  // End
  'OK, finished!',
  `Hmm... From now on... I guess your ${PICOBUDDY()} no longer requires your servitude!`,

  // TODO: Determine ending based on happiness
];

function runStandardDay(
  numberOfEvents = 3,
  overriddenDelay,
  overriddenEventTypes
) {
  const events = [];

  for (let i = 0; i < numberOfEvents; i++) {
    events.push(() => getRandomEvent(overriddenEventTypes));
    events.push(() => delayBetweenEvents(overriddenDelay));
  }

  /* Remove last delay */
  events.pop();

  return events;
}

const calendar = new Map([
  // [0, { events: [], expectedEvents: 0 }],
  [1, { events: day1Events, expectedEvents: 3 }],
  [2, { events: day2Events, expectedEvents: 3 }],
  [3, { events: day3Events, expectedEvents: 5 }],
  [4, { events: day4Events, expectedEvents: 10 }],
  [5, { events: day5Events, expectedEvents: 5 }],
  [6, { events: day6Events, expectedEvents: 7 }],
  [7, { events: day7Events, expectedEvents: 10 }],
  [8, { events: day8Events, expectedEvents: 10 }],
  [9, { events: day9Events, expectedEvents: 10 }],
  [10, { events: day10Events, expectedEvents: 2 }],
  [11, { events: day11Events, expectedEvents: 1 }],
  [12, { events: day12Events, expectedEvents: 0 }],
  [13, { events: day13Events, expectedEvents: 0 }],
]);

let PLAY_COUNTER = 0;
let COMPLETED_EVENT_COUNT = 0;

handleScriptEventsSequentially([]);

/*************************************
  _____   _____ _ __ | |_ ___ 
 / _ \ \ / / _ \ '_ \| __/ __|
|  __/\ V /  __/ | | | |_\__ \
 \___| \_/ \___|_| |_|\__|___/
events
*************************************/

/* Start of Game */
const modalButton = document.getElementById('mb');
modalButton.addEventListener('click', () => {
  document.getElementById('modal').remove();
  handleScriptEventsSequentially(day1Events);
});

const dayButton = document.getElementById('day');
dayButton.addEventListener('click', () => {
  advanceDay();
  dayButton.disabled = true;
  handleScriptEventsSequentially(calendar.get(DAY).events);
});

async function allowForAdvanceDay() {
  // End of day text
  await delay(1500);
  renderEachLetter(PROCEED);
  dayButton.textContent = `Proceed to Day ${DAY + 1}`;
  dayButton.disabled = false;
}

function advanceDay() {
  DAY++;
  dayButton.textContent = `Day ${DAY}`;
  // renderEachLetter(NEXT_DAY_STARTING);
  delay(1500);
  COMPLETED_EVENT_COUNT = 0;
  PLAY_COUNTER = 0;
  activeEventsHolder.textContent = 'None!';
}

function handleEventCompletion() {
  COMPLETED_EVENT_COUNT++;
  /* Check if the number of events you completed matches the number of expected events for the day */
  if (COMPLETED_EVENT_COUNT === calendar.get(DAY).expectedEvents) {
    allowForAdvanceDay();
  }
}

const DELAY_BETWEEN_EVENTS = getRandomInt(500, 2000);

/**
 * If nothing is provided, it will delay 3, 4, 5, or 6 seconds. Otherwise, it delays however many ms you provide
 * @param {number} overriddenDelay - ms. If provided will delay this much between events
 * @returns delay function
 */
async function delayBetweenEvents(overriddenDelay) {
  if (!overriddenDelay) {
    return delay(getRandom(DELAY_BETWEEN_EVENTS));
  }
  return delay(overriddenDelay);
}

/**
 *
 * @param {'feed' | 'hydrate' | 'clean' | 'play'} event type
 */
async function askForSomething(eventType, timeAllotted = 13) {
  activeEvents.push(eventType);
  createEventLi(eventType, timeAllotted);
  // animation
  playAskSound('eggBaby');
}

function playAskSound(character) {
  if (character === 'eggBaby') {
    return zzfx(
      ...[
        0.5,
        1.15,
        200,
        0.1,
        0.11,
        0.07,
        ,
        3.4,
        ,
        99,
        386,
        0.07,
        0.04,
        ,
        ,
        ,
        ,
        0.81,
        0.28,
      ]
    ); // Powerup 263  return;
  }
}

/**
 * Adds an li to go in the "list of demands". The first list item also removes the text "None"
 * @param {string} eventType - coming from askForSomething, based on the picobuddy's demands. Morphed into a 'verb' here
 */
function createEventLi(eventType, timeAllotted) {
  if (activeEventsHolder.textContent.includes('None')) {
    activeEventsHolder.textContent = '';
  }
  const listItem = document.createElement('li');
  const timer = createTimer(listItem, timeAllotted);
  listItem.innerHTML = `${shouldGarble(eventType, 0.8)}! - `;
  listItem.dataset.eventType = eventType;
  listItem.append(timer);
  activeEventsHolder.prepend(listItem);
}

/**
 * Creates timer, which counts down from 13 seconds by default, or whatever you passed as timeAllotted in `askForSomething`.
 * To be added to the "list of demands" li
 * @returns timer (HTMLSpanElement)
 */
function createTimer(listItem, timeAllotted) {
  const newTimer = document.createElement('span');
  let sec = timeAllotted;
  newTimer.innerHTML = sec;

  /* Set interval for timer to count down every 1 sec */
  let timing = setInterval(() => {
    sec--;
    newTimer.innerHTML = sec;
    /** EVENT FAILED SCENARIO */
    if (sec <= 0) {
      manageHappines(-1.67, false);
      handleEventCompletion();
      listItem.classList.add('e');
      listItem.dataset.expired = 'true';
      clearInterval(timing);
    }
  }, 1000);

  /* Return a function to stop the timer */
  newTimer.stop = () => {
    clearInterval(timing);
  };

  return newTimer;
}

/**
 *
 * @param {'feed' | 'hydrate' | 'clean' | 'play'} something
 */
function giveSomething(something) {
  /* Look in the JS array of active events for the first instance of whatever button you clicked */
  const firstIndexOfGivenEvent = activeEvents.indexOf(something);
  const hasGivenEvent = firstIndexOfGivenEvent !== -1;

  /* Account for foreign language day*/
  const praisePhrases = DAY !== 6 ? PRAISE_PHRASES : J_PRAISE_PHRASES;
  const slow = DAY !== 6 ? SLOW : J_SLOW;
  const notNow = DAY !== 6 ? NOT_NOW : J_NOT_NOW;

  const garbleChance = 0.75;

  /* Handle wrong thing given */
  if (!hasGivenEvent) {
    // sound
    return renderEachLetter(shouldGarble(notNow), garbleChance);
  }

  /* Grab all the DOM li */
  const lis = activeEventsHolder.querySelectorAll('li');

  /* Get the first one that matches what you gave AND is not completed yet */
  const oldestMatchingEvent = [...lis]
    .reverse()
    .find(
      (li) =>
        li.dataset.eventType === something &&
        !li.dataset.completed &&
        !li.dataset.expired
    );

  /* It should totally exist */
  if (!oldestMatchingEvent) {
    return;
  }

  const timer = oldestMatchingEvent.querySelector('span');

  /* Stop the timer */
  timer.stop();

  const timerRemainder = parseFloat(timer.textContent);

  /* Add some stylin' */
  oldestMatchingEvent.style.textDecoration = 'line-through';

  /* Add 'completed' for further button clicks */
  oldestMatchingEvent.dataset.completed = true;

  /* Remove from JS array */
  activeEvents.splice(firstIndexOfGivenEvent, 1);

  /* Add to the day's completed event count */
  handleEventCompletion();

  /* Update the happiness meter, depending on how many seconds are left in the timer */
  // TODO: This 9 is kinda arbitrary, since timers might not always be the same. Maybe get rid of this feature
  if (timerRemainder > 9) {
    manageHappines(2);
    return renderEachLetter(
      shouldGarble(getRandom(praisePhrases)),
      garbleChance
    );
  } else if (timerRemainder > 0) {
    manageHappines(1);
    return renderEachLetter(
      shouldGarble(getRandom(praisePhrases)),
      garbleChance
    );
  } else {
    return renderEachLetter(shouldGarble(slow), garbleChance);
  }
}

let animationTimeout;

function toggleGivenAnimation() {
  clearTimeout(animationTimeout);

  buddyScreen.classList.remove('bb');

  // Force a reflow to ensure the browser registers the change
  void buddyScreen.offsetWidth;

  buddyScreen.classList.add('bb');

  animationTimeout = setTimeout(() => {
    buddyScreen.classList.remove('bb');
  }, 1250);
}

/** used in getRandomEvent */
let lastEvent = '';

/**
 *
 * @param {Array<string>} customEventTypes - array of events that must match the event listener of the picobuddy device buttons
 * @returns
 */
function getRandomEvent(customEventTypes) {
  let newEvent;
  const eventTypes = customEventTypes || ['feed', 'hydrate', 'clean', 'play'];

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
 * @param {number} happinessAddend - amount to add / subtract to the happiness meter. 3 for super fast, 2 for normal, and 1 for playing. minus is -1.67
 */
function manageHappines(happinessAddend, isHappy = true) {
  happiness += happinessAddend;
  happiness = clamp(happiness, -45, 45);
  handleHappinessMeterMarker(happiness);
  happinessMeterMarker.style.bottom = `${happiness}%`;
  if (isHappy) {
    toggleGivenAnimation();
    zzfx(
      ...[
        5,
        0.8,
        422,
        0.02,
        0.02,
        0.19,
        ,
        1.2,
        ,
        51,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        0.64,
        0.03,
        ,
        975,
      ]
    ); // Jump 284
  } else {
    zzfx(
      ...[
        0.6,
        0.2,
        75,
        0.01,
        0.13,
        0.06,
        2,
        1.6,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        0.96,
        0.01,
        0.48,
        -1371,
      ]
    ); // Music 315
  }
}

function handleHappinessMeterMarker(happiness) {
  if (happiness === -45) {
    happinessMeterMarker.textContent = '😭';
  } else if (happiness < -10) {
    happinessMeterMarker.textContent = '😢';
  } else if (happiness < 10) {
    happinessMeterMarker.textContent = '🙂';
  } else if (happiness < 45) {
    happinessMeterMarker.textContent = '😀';
  } else {
    happinessMeterMarker.textContent = '🥰';
  }
}

/***************************                     
  ___| |__   __ _  ___  ___ 
 / __| '_ \ / _` |/ _ \/ __|
| (__| | | | (_| | (_) \__ \
 \___|_| |_|\__,_|\___/|___/
 chaos
 ****************************/

function setCursor(showCursor) {
  document.body.classList.remove(showCursor ? 'nc' : 'c');
  document.body.classList.add(showCursor ? 'c' : 'nc');
}

function moveToRandomLocation(element) {
  const margin = 20;
  const randomX = getRandomInt(
    margin,
    window.innerWidth - element.offsetWidth - margin
  );
  const randomY = getRandomInt(
    margin,
    window.innerHeight - element.offsetHeight - margin
  );
  element.style.position = 'absolute';
  element.style.left = `${randomX}px`;
  element.style.top = `${randomY}px`;
}

/**
 *
 * @param {string} text
 * @param {number} percentage - Percent that text will NOT be garbled. Should be between 0 and 1. Default is .95 (meaning 5% chance to garble), but this value can be overridden.
 * @returns
 */
function garbleText(text, percentage = 0.95) {
  const percent = clamp(percentage, 0, 1);
  let newText = '';
  for (const character of text) {
    if (character === ' ') {
      newText += ' ';
    } else if (Math.random() > percent) {
      newText += '👁️';
    } else {
      newText += character;
    }
  }
  return newText;
}

/**
 * Checks if it's DAY 12, because on that day, we get text interspersed with eye emojis.
 * @param {string} text to be rendered
 * @returns text augmented with eyes if DAY 12, otherwise the original text
 */
function shouldGarble(text, optionalPercentOverride) {
  return DAY === 1 ? garbleText(text, optionalPercentOverride) : text;
}

function duplicateCursors() {
  const pic = document.createElement('img');
  pic.src = './c.png';
  pic.style.position = 'absolute';
  pic.style.width = '11px';
  bod.append(pic);

  const margin = 13;
  let directionX = 1; // 1 means right, -1 means left
  let directionY = 1; // 1 means down, -1 means up
  let speed = 1;
  let pause = false;
  let posX = 13;
  let posY = 13;

  function randomSpeed() {
    return getRandomInt(0.5, 5);
  }

  function randomPause() {
    return getRandomInt(250, 500);
  }

  function moveImage() {
    if (!pause) {
      // Update position
      posX += directionX * speed;
      posY += directionY * speed;

      // Apply movement to the img element // TODO: This can be a util maybe
      pic.style.left = `${posX}px`;
      pic.style.top = `${posY}px`;

      // Randomly change direction
      if (Math.random() < 0.01) {
        directionX = Math.random() > 0.5 ? 1 : -1; // Randomly switch left or right
        directionY = Math.random() > 0.5 ? 1 : -1; // Randomly switch up or down
      }

      // Occasionally vary speed
      if (Math.random() < 0.05) {
        speed = randomSpeed();
      }

      // If it gets close to the edge of the screen, reverse direction
      const windowWidth = window.innerWidth - pic.width - margin;
      const windowHeight = window.innerHeight - pic.height - margin;

      if (posX <= margin || posX >= windowWidth) {
        directionX *= -1; // Reverse horizontal direction
      }
      if (posY <= margin || posY >= windowHeight) {
        directionY *= -1; // Reverse vertical direction
      }

      // Occasionally stop to mimic human-like pauses
      if (Math.random() < 0.01) {
        pause = true;
        setTimeout(() => {
          pause = false;
        }, randomPause()); // Pause for a random duration
      }
    }

    requestAnimationFrame(moveImage);
  }

  // Start moving the image
  moveImage();
}

function makeManyCursors() {
  for (let i = 0; i < 50; i++) {
    duplicateCursors();
  }
}
/******************
 /\ /\| |_(_) |___ 
/ / \ \ __| | / __|
\ \_/ / |_| | \__ \
 \___/ \__|_|_|___/
 utils
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
 * @param {Array<string | function>} messages - array of messages.
 * @param {boolean} delayBetweenMessages - if you want a delay between each separate message, add it here
 */
async function handleScriptEventsSequentially(scriptEvents) {
  console.log(scriptEvents);
  for (const scriptEvent of scriptEvents) {
    if (typeof scriptEvent === 'string') {
      await renderEachLetter(scriptEvent);
    } else if (typeof scriptEvent === 'function') {
      await scriptEvent();
    }

    /* Calculate delay based on message length */
    const baseDelay = 500; // Base delay in ms for short messages
    const lengthFactor = 25; // Additional ms per character in the message
    const messageDelay = baseDelay + scriptEvent.length * lengthFactor;
    await delay(messageDelay);
  }
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toggleClass(className, element) {
  element.classList.contains(className)
    ? element.classList.remove(className)
    : element.classList.add(className);
}

let // ZzFXMicro - Zuper Zmall Zound Zynth - v1.3.1 by Frank Force ~ 1000 bytes
  zzfxV = 0.3, // volume
  zzfxX = new AudioContext(), // audio context
  zzfx = // play sound
    (
      p = 1,
      k = 0.05,
      b = 220,
      e = 0,
      r = 0,
      t = 0.1,
      q = 0,
      D = 1,
      u = 0,
      y = 0,
      v = 0,
      z = 0,
      l = 0,
      E = 0,
      A = 0,
      F = 0,
      c = 0,
      w = 1,
      m = 0,
      B = 0,
      N = 0
    ) => {
      let M = Math,
        d = 2 * M.PI,
        R = 44100,
        G = (u *= (500 * d) / R / R),
        C = (b *= ((1 - k + 2 * k * M.random((k = []))) * d) / R),
        g = 0,
        H = 0,
        a = 0,
        n = 1,
        I = 0,
        J = 0,
        f = 0,
        h = N < 0 ? -1 : 1,
        x = (d * h * N * 2) / R,
        L = M.cos(x),
        Z = M.sin,
        K = Z(x) / 4,
        O = 1 + K,
        X = (-2 * L) / O,
        Y = (1 - K) / O,
        P = (1 + h * L) / 2 / O,
        Q = -(h + L) / O,
        S = P,
        T = 0,
        U = 0,
        V = 0,
        W = 0;
      e = R * e + 9;
      m *= R;
      r *= R;
      t *= R;
      c *= R;
      y *= (500 * d) / R ** 3;
      A *= d / R;
      v *= d / R;
      z *= R;
      l = (R * l) | 0;
      p *= zzfxV;
      for (h = (e + m + r + t + c) | 0; a < h; k[a++] = f * p)
        ++J % ((100 * F) | 0) ||
          ((f = q
            ? 1 < q
              ? 2 < q
                ? 3 < q
                  ? Z(g ** 3)
                  : M.max(M.min(M.tan(g), 1), -1)
                : 1 - (((((2 * g) / d) % 2) + 2) % 2)
              : 1 - 4 * M.abs(M.round(g / d) - g / d)
            : Z(g)),
          (f =
            (l ? 1 - B + B * Z((d * a) / l) : 1) *
            (f < 0 ? -1 : 1) *
            M.abs(f) ** D *
            (a < e
              ? a / e
              : a < e + m
              ? 1 - ((a - e) / m) * (1 - w)
              : a < e + m + r
              ? w
              : a < h - c
              ? ((h - a - c) / t) * w
              : 0)),
          (f = c
            ? f / 2 +
              (c > a
                ? 0
                : ((a < h - c ? 1 : (h - a) / c) * k[(a - c) | 0]) / 2 / p)
            : f),
          N
            ? (f = W = S * T + Q * (T = U) + P * (U = f) - Y * V - X * (V = W))
            : 0),
          (x = (b += u += y) * M.cos(A * H++)),
          (g += x + x * E * Z(a ** 5)),
          n && ++n > z && ((b += v), (C += v), (n = 0)),
          !l || ++I % l || ((b = C), (u = G), (n = n || 1));
      p = zzfxX.createBuffer(1, h, R);
      p.getChannelData(0).set(k);
      b = zzfxX.createBufferSource();
      b.buffer = p;
      b.connect(zzfxX.destination);
      b.start();
    };
