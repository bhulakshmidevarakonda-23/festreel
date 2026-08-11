const content = [
  { text: "Attendance is temporary, memories are permanent. 😂", type: "💬 QUOTE" },
  { text: "You came for the degree, stayed for the memories. ❤️", type: "💬 QUOTE" },
  { text: "College lo deadlines kanna friendships ekkuva important. 😎", type: "💬 QUOTE" },
  { text: "One campus, thousands of stories. ✨", type: "💬 QUOTE" },
  { text: "Fest starts with a plan and ends with a story. 🎉", type: "💬 QUOTE" },
  { text: "Notes may be missing, but memories never are. 😂", type: "💬 QUOTE" },
  { text: "Best college moments are usually unplanned. 🤍", type: "💬 QUOTE" },
  { text: "Classroom memories fade, fest memories don't. 🔥", type: "💬 QUOTE" },
  { text: "Scan chesav ante… nee luck ippudu start! 🎲", type: "💬 QUOTE" },
  { text: "Enjoy the moment before the attendance reminder. 😅", type: "💬 QUOTE" }
];

const quote = document.getElementById("quote");
const category = document.getElementById("category");
const another = document.getElementById("another");
let lastIndex = -1;

function showRandom() {
  let index;
  do {
    index = Math.floor(Math.random() * content.length);
  } while (content.length > 1 && index === lastIndex);

  lastIndex = index;
  quote.textContent = content[index].text;
  category.textContent = content[index].type;
}

another.addEventListener("click", showRandom);
showRandom();
