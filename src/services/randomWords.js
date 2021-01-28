let wordList = [
  "hi",
  "artichokes",
  "lumberjack",
  "coding",
  "world",
  "binoculars",
  "cornflakes",
  "education",
  "notebook",
  "blacksmith",
  "animal",
  "wood",
  "programming",
  "love",
  "building",
  "zebra",
  "snowman",
  "winter",
  "scarf",
  "carrot"
]

export default function randomWords(){
  return wordList[Math.floor(Math.random()*wordList.length)];
}
