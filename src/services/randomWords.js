let wordList = [
  "test"
]

export default function randomWords() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
