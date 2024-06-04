export class Speech {
  private synth: SpeechSynthesis | null = null

  constructor() {
    if (this.isSupported()) {
      this.synth = window.speechSynthesis
    }
  }

  async speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.synth) {
        if (this.synth.speaking) {
          reject(new Error("Speech synthesis is already in progress"))
          return
        }

        if (text !== "") {
          const utterThis = new SpeechSynthesisUtterance(text)
          utterThis.lang = "tr-TR"

          utterThis.onend = () => {
            resolve()
          }

          utterThis.onerror = (event: SpeechSynthesisErrorEvent) => {
            reject(event.error)
          }

          this.synth.speak(utterThis)
        } else {
          resolve()
        }
      } else {
        reject(new Error("Speech synthesis is not supported"))
      }
    })
  }

  stop() {
    if (this.synth) {
      this.synth.cancel()
    }
  }

  isSupported() {
    return typeof window !== "undefined" && "speechSynthesis" in window
  }
}
