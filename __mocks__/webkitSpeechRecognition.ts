class MockSpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult:
    | ((event: {
        results: Array<Array<{ transcript: string; confidence: number }>>
      }) => void)
    | null
  onerror: ((event: Error) => void) | null
  onend: (() => void) | null

  constructor() {
    this.continuous = false
    this.interimResults = false
    this.lang = "en-US"
    this.onresult = null
    this.onerror = null
    this.onend = null
  }

  start() {}

  stop() {
    if (this.onend) {
      this.onend()
    }
  }

  abort() {
    if (this.onerror) {
      this.onerror(new Error("aborted"))
    }
  }

  submitResult(
    results: Array<Array<{ transcript: string; confidence: number }>>
  ) {
    this.onresult?.({ results })
  }
}

Object.defineProperty(window, "webkitSpeechRecognition", {
  writable: true,
  value: MockSpeechRecognition,
  configurable: true,
})
