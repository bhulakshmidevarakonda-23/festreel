// Replace these filenames with your actual MP4 files.
const reels = [
  "reels/reel1.mp4",
  "reels/reel2.mp4",
  "reels/reel3.mp4",
  "reels/reel4.mp4"
];

const video = document.getElementById("reel");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const label = document.getElementById("reelLabel");
const another = document.getElementById("another");

let lastIndex = -1;

function chooseRandomIndex() {
  if (reels.length === 0) return -1;
  if (reels.length === 1) return 0;

  let index;
  do {
    index = Math.floor(Math.random() * reels.length);
  } while (index === lastIndex);

  return index;
}

async function showRandomReel() {
  loading.hidden = false;
  error.hidden = true;

  const index = chooseRandomIndex();
  if (index < 0) {
    error.hidden = false;
    loading.hidden = true;
    return;
  }

  lastIndex = index;
  video.src = reels[index];
  video.load();

  try {
    await video.play();
  } catch (_) {
    // Browser may block autoplay with sound.
    // Video is muted, so most browsers will allow autoplay.
  }

  label.textContent = `Reel ${index + 1}`;
  loading.hidden = true;
}

video.addEventListener("error", () => {
  loading.hidden = true;
  error.hidden = false;
});

another.addEventListener("click", showRandomReel);

showRandomReel();
