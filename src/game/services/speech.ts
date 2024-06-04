export class Speech {
  private synth: SpeechSynthesis

  constructor() {
    this.synth = window.speechSynthesis
  }

  async speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
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
    })
  }

  stop() {
    this.synth.cancel()
  }

  isSupported() {
    return "speechSynthesis" in window
  }
}
