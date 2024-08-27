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

function drawPixels(character) {
  const { width, height, filledInTiles } = character;
  const babyMass = width * height;

  for (let i = 0; i < babyMass; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('p');
    if (filledInTiles.includes(i)) {
      pixel.classList.add('fill');
    }
    buddyScreen.appendChild(pixel);
  }
}

drawPixels(eggBaby);

// class Bud {
//   constructor(
//     stage,
//   )
//
// }

/****************************
/ / /\ \ \___  _ __ __| |___ 
\ \/  \/ / _ \| '__/ _` / __|
 \  /\  / (_) | | | (_| \__ \
  \/  \/ \___/|_|  \__,_|___/
******************************/
const textBox = document.querySelector('#t');
const EXAMPLE = 'Here is a sample sentence.';
const EXAMPLE2 = 'There right here is another sample sentence for you.';

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

// Call the function with the sentences and delay
appendTextSequentially([EXAMPLE, EXAMPLE2], 3000);

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
