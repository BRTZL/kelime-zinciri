export class Recognition {
  private recognition: SpeechRecognition
  private onResultCallback: (result: string) => void
  private onErrorCallback: (error: SpeechRecognitionErrorEvent) => void

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition

      this.recognition = new SpeechRecognitionAPI()
      this.recognition.lang = "tr-TR"
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.maxAlternatives = 1

      this.onResultCallback = () => {}
      this.onErrorCallback = () => {}

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        this.onResultCallback(transcript)
      }

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.onErrorCallback(event)
      }
    } else {
      throw new Error("Recognition is not supported in this environment.")
    }
  }

  start() {
    this.recognition.start()
  }

  stop() {
    this.recognition.stop()
  }

  onResult(callback: (result: string) => void) {
    this.onResultCallback = callback
  }

  onError(callback: (error: SpeechRecognitionErrorEvent) => void) {
    this.onErrorCallback = callback
  }

  isSupported() {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window
  }
}
