import { Recognition } from "./recognition"
import { Speech } from "./speech"
import { Words } from "./words"

interface UsedWord {
  word: string
  from: PlayerType
  isError: boolean
}

interface GameState {
  currentWord: string
  usedWords: UsedWord[]
  userTurn: boolean
  gameOver: boolean
  remainingTime: number
}

type PlayerType = "user" | "pc"

interface GameOptions {
  turnDuration?: number
}

const DEFAULT_TURN_DURATION = 10000

class WordChainGame {
  private words: Words
  private recognition: Recognition
  private speech: Speech
  private state: GameState
  private turnDuration: number
  private timer: NodeJS.Timeout | null
  private onUpdateCallback: (state: GameState) => void
  private onGameOverCallback: (winner: PlayerType) => void
  private onErrorCallback: (error: string) => void

  constructor(options?: GameOptions) {
    const turnDuration = options?.turnDuration || DEFAULT_TURN_DURATION

    this.words = new Words()
    this.recognition = new Recognition()
    this.speech = new Speech()
    this.state = {
      currentWord: "",
      usedWords: [],
      userTurn: true,
      gameOver: false,
      remainingTime: turnDuration,
    }
    this.turnDuration = turnDuration
    this.timer = null
    this.onUpdateCallback = () => {}
    this.onGameOverCallback = () => {}
    this.onErrorCallback = () => {}
  }

  private startListening() {
    if (this.state.userTurn && !this.state.gameOver) {
      this.recognition.start()
      this.startTimer()
    }
  }

  private stopListening() {
    this.recognition.stop()
    this.clearTimer()
  }

  private async handleUserInput(userInput: string) {
    if (!this.state.userTurn || this.state.gameOver) {
      return
    }

    userInput = userInput.toLowerCase()
    const error = this.isValidUserInput(userInput)
    const isError = typeof error === "string"

    this.state.currentWord = userInput
    this.state.usedWords.push({
      word: userInput,
      from: "user",
      isError,
    })
    this.state.userTurn = false
    this.onUpdateCallback(this.state)

    if (isError) {
      this.onErrorCallback(error)
      this.clearTimer()
      this.state.gameOver = true
      this.onGameOverCallback("pc")
      return
    }

    if (this.isGameOver()) {
      this.clearTimer()
      this.state.gameOver = true
      this.onGameOverCallback("user")
      return
    }

    this.stopListening()
    await this.computerTurn()
  }

  private async computerTurn() {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 3000 + 1000)
    )

    const lastLetter = this.state.currentWord.slice(-1)
    const availableWords = this.words
      .getAvailableWordsByInitialLetter(lastLetter)
      .filter(
        (word) =>
          !this.state.usedWords.some((usedWord) => usedWord.word === word)
      )

    if (availableWords.length === 0) {
      this.clearTimer()
      this.state.gameOver = true
      this.onGameOverCallback("user")
      return
    }

    const computerWord =
      availableWords[Math.floor(Math.random() * availableWords.length)]
    this.state.currentWord = computerWord
    this.state.usedWords.push({
      word: computerWord,
      from: "pc",
      isError: false,
    })
    this.state.userTurn = true
    this.onUpdateCallback(this.state)

    await this.speech.speak(computerWord)

    if (this.isGameOver()) {
      this.clearTimer()
      this.state.gameOver = true
      this.onGameOverCallback("pc")
    } else {
      this.startListening()
    }
  }

  private isValidUserInput(userInput: string): string | boolean {
    const lastLetter = this.state.currentWord.slice(-1)
    if (userInput.charAt(0) !== lastLetter) {
      return "Söylediğiniz kelime bir önceki kelimenin son harfiyle başlamıyor."
    } else if (!this.words.isValidWord(userInput)) {
      return "Söylediğiniz kelime geçerli bir kelime değil."
    } else if (
      this.state.usedWords.some((usedWord) => usedWord.word === userInput)
    ) {
      return "Bu kelime daha önce kullanıldı."
    }

    return true
  }

  private isGameOver(): boolean {
    const lastLetter = this.state.currentWord.slice(-1)
    const availableWords = this.words
      .getAvailableWordsByInitialLetter(lastLetter)
      .filter(
        (word) =>
          !this.state.usedWords.some((usedWord) => usedWord.word === word)
      )
    return availableWords.length === 0
  }

  private startTimer() {
    this.clearTimer()
    this.state.remainingTime = this.turnDuration
    this.timer = setInterval(() => {
      this.state.remainingTime -= 1000
      this.onUpdateCallback(this.state)

      if (this.state.remainingTime <= 0) {
        this.clearTimer()
        if (!this.state.gameOver) {
          this.clearTimer()
          this.state.gameOver = true
          this.onGameOverCallback(this.state.userTurn ? "pc" : "user")
          this.stopListening()
        }
      }
    }, 1000)
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  private handleRecognitionError(error: SpeechRecognitionErrorEvent) {
    this.onErrorCallback(
      "Söylediğinizi tam olarak anlayamadım. Lütfen tekrar deneyin."
    )
  }

  public start() {
    const initialWord = this.words.getRandomWord()
    this.state.currentWord = initialWord
    this.state.usedWords.push({ word: initialWord, from: "pc", isError: false })
    this.onUpdateCallback(this.state)

    if (this.recognition.isSupported()) {
      this.recognition.onResult(this.handleUserInput.bind(this))
      this.recognition.onError(this.handleRecognitionError.bind(this))
      this.startListening()
    } else {
      this.onErrorCallback(
        "Tarayıcınızda konuşma tanıma özelliği desteklenmiyor."
      )
    }
  }

  public onUpdate(callback: (state: GameState) => void) {
    this.onUpdateCallback = callback
  }

  public onGameOver(callback: (winner: PlayerType) => void) {
    this.onGameOverCallback = callback
  }

  public onError(callback: (error: string) => void) {
    this.onErrorCallback = callback
  }
}

export { WordChainGame }
export type { GameState, PlayerType, UsedWord }
