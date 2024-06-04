export class Recognition {
  private recognition: SpeechRecognition | null = null
  private onResultCallback: (result: string) => void
  private onErrorCallback: (error: SpeechRecognitionErrorEvent) => void

  constructor() {
    this.onResultCallback = () => {}
    this.onErrorCallback = () => {}

    if (this.isSupported()) {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition

      this.recognition = new SpeechRecognitionAPI()
      this.recognition.lang = "tr-TR"
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.maxAlternatives = 1

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        this.onResultCallback(transcript)
      }

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.onErrorCallback(event)
      }
    }
  }

  start() {
    if (this.recognition) {
      this.recognition.start()
    }
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop()
    }
  }

  onResult(callback: (result: string) => void) {
    this.onResultCallback = callback
  }

  onError(callback: (error: SpeechRecognitionErrorEvent) => void) {
    this.onErrorCallback = callback
  }

  isSupported() {
    return (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    )
  }
}
