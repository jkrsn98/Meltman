let wordList = [
  "winter", "cold", "snow", "freeze", "snowman", "sled", "ice", "coat", "snowflake", "fireplace", "firewood", "blizzard", "sweater", "snowball"
]

export default function randomWords() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
