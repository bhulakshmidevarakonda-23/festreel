const quotes = [
  "Attendance is temporary, memories are permanent. 😂",
  "You came for the degree, stayed for the memories. ❤️",
  "College lo deadlines kanna friendships ekkuva important. 😎",
  "One campus, thousands of stories. ✨",
  "Fest starts with a plan and ends with a story. 🎉",
  "Notes may be missing, but memories never are. 😂",
  "Best college moments are usually unplanned. 🤍",
  "Classroom memories fade, fest memories don't. 🔥",
  "Scan chesav ante… nee luck ippudu start! 🎲",
  "Enjoy the moment before the attendance reminder. 😅"
];

const reels = [
  "reels/reel1.mp4",
  "reels/reel2.mp4",
  "reels/reel3.mp4"
];

const video = document.getElementById("reel");
const quoteBox = document.getElementById("quoteBox");
const quote = document.getElementById("quote");
const category = document.getElementById("category");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const another = document.getElementById("another");

let lastKey = "";

function randomItem() {
  const all = [
    ...quotes.map((text, i) => ({ key: "q" + i, type: "💬 QUOTE", text })),
    ...reels.map((src, i) => ({ key: "r" + i, type: "🎬 REEL", src }))
  ];

  let item;
  do {
    item = all[Math.floor(Math.random() * all.length)];
  } while (all.length > 1 && item.key === lastKey);

  lastKey = item.key;
  return item;
}

async function showRandom() {
  loading.hidden = false;
  error.hidden = true;
  video.hidden = true;
  quoteBox.hidden = true;

  const item = randomItem();
  category.textContent = item.type;

  if (item.type === "💬 QUOTE") {
    quote.textContent = item.text;
    quoteBox.hidden = false;
    loading.hidden = true;
    return;
  }

  video.src = item.src;
  video.currentTime = 0;
  video.load();

  try {
    await video.play();
  } catch (_) {
    // Muted autoplay is generally allowed; user can press play if a browser blocks it.
  }

  video.hidden = false;
  loading.hidden = true;
}

video.addEventListener("error", () => {
  loading.hidden = true;
  video.hidden = true;
  error.hidden = false;
});

another.addEventListener("click", showRandom);
showRandom();
