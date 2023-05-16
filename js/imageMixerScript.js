console.log("script started");

const namOfImages =300;

var imageSlice1, imageSlice2, imageSlice3, imageSlice4, imageSlice5;
let curSlice1index = 0;
let curSlice2index = 0;
let curSlice3index = 0;
let curSlice4index  = 0;
let curSlice5index  = 0;

var allSlicesFolder = "allSlices/";

let lastCharacterIndex = -1;


imageSlice1 = document.getElementById('img_slice_1');
imageSlice2 = document.getElementById('img_slice_2');
imageSlice3 = document.getElementById('img_slice_3');
imageSlice4 = document.getElementById('img_slice_4');
imageSlice5 = document.getElementById('img_slice_5');

document.getElementById("btn_remix").onclick = function() {setRandoMix()};
document.getElementById("btn_match").onclick = function() {setRandomCharacter()};
document.getElementById("btn_download").onclick = function() {takeScreenShot()};


document.getElementById("btn_m1").onclick = function() {matchFullCharacter(1)};
document.getElementById("btn_m2").onclick = function() {matchFullCharacter(2)};
document.getElementById("btn_m3").onclick = function() {matchFullCharacter(3)};
document.getElementById("btn_m4").onclick = function() {matchFullCharacter(4)};
document.getElementById("btn_m5").onclick = function() {matchFullCharacter(5)};



let isMatchOn = false;  // Boolean flag to check if match is on

function matchFullCharacter(id) {
  console.log("M" + id + "button pressed");

  let indexToMatch; // This will be the index of the slice to match

  // Determine which slice was clicked and set the indexToMatch
  switch(id) {
    case 1:
      let filename1 = imageSlice1.src.split('/').pop();
      indexToMatch = listSlice1.findIndex((img) => img.split('/').pop() === filename1);
      break;
    case 2:
      let filename2 = imageSlice2.src.split('/').pop();
      indexToMatch = listSlice2.findIndex((img) => img.split('/').pop() === filename2);
      break;
    case 3:
      let filename3 = imageSlice3.src.split('/').pop();
      indexToMatch = listSlice3.findIndex((img) => img.split('/').pop() === filename3);
      break;
    case 4:
      let filename4 = imageSlice4.src.split('/').pop();
      indexToMatch = listSlice4.findIndex((img) => img.split('/').pop() === filename4);
      break;
    case 5:
      let filename5 = imageSlice5.src.split('/').pop();
      indexToMatch = listSlice5.findIndex((img) => img.split('/').pop() === filename5);
      break;
    default:
      console.error("Invalid slice id in matchFullCharacter");
      return;
  }

  // Set all slices to the same image according to indexToMatch
  imageSlice1.src = listSlice1[indexToMatch];
  imageSlice2.src = listSlice2[indexToMatch];
  imageSlice3.src = listSlice3[indexToMatch];
  imageSlice4.src = listSlice4[indexToMatch];
  imageSlice5.src = listSlice5[indexToMatch];

  // Set the isMatchOn flag to true
  isMatchOn = true;
}



function setRandoMix() {
  console.log("setRandoMix started");
  
  let prevIndices = [
    listSlice1.findIndex((img) => img === imageSlice1.src),
    listSlice2.findIndex((img) => img === imageSlice2.src),
    listSlice3.findIndex((img) => img === imageSlice3.src),
    listSlice4.findIndex((img) => img === imageSlice4.src),
    listSlice5.findIndex((img) => img === imageSlice5.src),
  ];

  let newIndices = [];
  let newImages = [];

  let listSlices = [listSlice1, listSlice2, listSlice3, listSlice4, listSlice5];

  for(let i=0; i<5; i++) {
    let newListSlice = [...listSlices[i]]; // Make a copy of the list
    newListSlice.splice(prevIndices[i], 1); // Remove the current image from the list
    let newIndex = Math.floor(Math.random() * newListSlice.length); // Choose from the remaining images
    newIndices.push(newIndex);
    newImages.push(newListSlice[newIndex]);
  }

  imageSlice1.src = newImages[0];
  imageSlice2.src = newImages[1];
  imageSlice3.src = newImages[2];
  imageSlice4.src = newImages[3];
  imageSlice5.src = newImages[4];
}




function setRandomCharacter(){
  console.log("setRandomCharacter started");

  let newCharacterIndex;
  do {
    newCharacterIndex = Math.floor(Math.random() * namOfImages);
  } while (newCharacterIndex === lastCharacterIndex);

  lastCharacterIndex = newCharacterIndex;

  imageSlice1.src = listSlice1[newCharacterIndex];
  imageSlice2.src = listSlice2[newCharacterIndex];
  imageSlice3.src = listSlice3[newCharacterIndex];
  imageSlice4.src = listSlice4[newCharacterIndex];
  imageSlice5.src = listSlice5[newCharacterIndex];
}


async function takeScreenShot() {

  const imageSlice1 = document.getElementById('img_slice_1');
  const imageSlice2 = document.getElementById('img_slice_2');
  const imageSlice3 = document.getElementById('img_slice_3');
  const imageSlice4 = document.getElementById('img_slice_4');
  const imageSlice5 = document.getElementById('img_slice_5');

  const elements = [imageSlice1, imageSlice2, imageSlice3, imageSlice4, imageSlice5];

  // Modify the scale option here (set it to 2 for double the resolution, 3 for triple, etc.)
  const scale = 2;

  const canvases = await Promise.all(elements.map(element => html2canvas(element, { scale })));

  const finalCanvas = document.createElement('canvas');
  const context = finalCanvas.getContext('2d');

  let totalHeight = 0;

  canvases.forEach(canvas => {
    finalCanvas.width = Math.max(finalCanvas.width, canvas.width);
    totalHeight += canvas.height;
  });

  finalCanvas.height = totalHeight;

  let currentHeight = 0;

  canvases.forEach(canvas => {
    context.drawImage(canvas, 0, currentHeight);
    currentHeight += canvas.height;
  });

  // Now you have a canvas with all images. You can convert it to a data URL or a blob to download it.
  const dataUrl = finalCanvas.toDataURL('image/jpeg', 1);
  

  // Create a link to download the image
  const link = document.createElement('a');
  
  link.href = dataUrl;
  link.download = 'myMix.jpg';
  link.click();
}







// Generate image lists


function generateImageLists(namOfImages) {
  const lists = Array.from({ length: 5 }, () => []);
  for (let i = 1; i <= namOfImages; i++) {
    for (let j = 1; j <= 5; j++) {
      lists[j - 1].push(allSlicesFolder + `man_0${i}_slice_0${j}.jpg`);
      //console.log("name generated" + `man_0${i}_slice_0${j}.jpg`);
    }
  }
  return lists;
}


const [listSlice1, listSlice2, listSlice3, listSlice4, listSlice5] = generateImageLists(namOfImages);

// Set initial image sources
imageSlice1.src = listSlice1[0];
imageSlice2.src = listSlice2[0];
imageSlice3.src = listSlice3[0];
imageSlice4.src = listSlice4[0];
imageSlice5.src = listSlice5[0];

// ... rest of your code





function addSwipeListeners(imageElement, onSwipeLeft, onSwipeRight) {
  let startX;
  let endX;

  const handleStart = (event) => {
    startX = event.clientX || event.touches[0].clientX;
  };

  const handleEnd = (event) => {
    endX = event.clientX || event.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) { // You can adjust this threshold (50) for detecting a swipe
      if (diffX > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
  };

  const handleClick = (event) => {
    const rect = imageElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    if (clickX < rect.width / 2) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  imageElement.addEventListener('touchstart', handleStart);
  imageElement.addEventListener('touchend', handleEnd);
  imageElement.addEventListener('mousepress', handleStart);
  imageElement.addEventListener('mouseup', handleEnd);
  imageElement.addEventListener('click', handleClick);
}






addSwipeListeners(imageSlice1, () => showPreviousImage(listSlice1, imageSlice1), () => showNextImage(listSlice1, imageSlice1));
addSwipeListeners(imageSlice2, () => showPreviousImage(listSlice2, imageSlice2), () => showNextImage(listSlice2, imageSlice2));
addSwipeListeners(imageSlice3, () => showPreviousImage(listSlice3, imageSlice3), () => showNextImage(listSlice3, imageSlice3));
addSwipeListeners(imageSlice4, () => showPreviousImage(listSlice4, imageSlice4), () => showNextImage(listSlice4, imageSlice4));
addSwipeListeners(imageSlice5, () => showPreviousImage(listSlice5, imageSlice5), () => showNextImage(listSlice5, imageSlice5));



function showNextImage(imageArray, imageElement) {
  const currentFilename = imageElement.src.split('/').pop();
  const currentIndex = imageArray.findIndex((img) => img.split('/').pop() === currentFilename);
  const nextIndex = (currentIndex + 1) % imageArray.length;
  imageElement.src = imageArray[nextIndex];
}

function showPreviousImage(imageArray, imageElement) {
  const currentFilename = imageElement.src.split('/').pop();
  const currentIndex = imageArray.findIndex((img) => img.split('/').pop() === currentFilename);
  const prevIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
  imageElement.src = imageArray[prevIndex];
}


setRandomCharacter();


