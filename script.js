/* Create PicoBuddy Image */
const screen = document.querySelector('#pb');

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
    screen.appendChild(pixel);
  }
}

drawPixels(eggBaby);
