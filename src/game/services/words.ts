import wordList from "@/game/db/names.json"

export class Words {
  private wordList: string[]

  constructor() {
    this.wordList = wordList
  }

  getWordList(): string[] {
    return this.wordList
  }

  getRandomWord(): string {
    return this.wordList[Math.floor(Math.random() * this.wordList.length)]
  }

  getAvailableWordsByInitialLetter(initialLetter: string): string[] {
    return this.wordList.filter((word) => word.charAt(0) === initialLetter)
  }

  isValidWord(word: string): boolean {
    return this.wordList.includes(word)
  }
}
