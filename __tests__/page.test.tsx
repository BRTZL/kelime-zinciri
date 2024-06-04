import "@testing-library/jest-dom"

import { screen } from "@testing-library/dom"
import { render } from "@testing-library/react"

import Page from "@/app/page"

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />)

    const heading = screen.getByRole("heading")

    expect(heading).toBeInTheDocument()
  })

  it("renders a play button", () => {
    render(<Page />)

    const button = screen.getByRole("button")

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("Oyuna Başla")
  })

  it("starts the game when clicking the play button", async () => {
    render(<Page />)

    const button = screen.getByRole("button")

    button.click()

    await new Promise((resolve) => setTimeout(resolve, 200))

    const time = screen.getByText(/saniye/i)

    expect(time).toBeInTheDocument()
  })

  // it("shows the first word from pc when the game is started", async () => {
  //   const mockRecognition = new (window as any).webkitSpeechRecognition()
  //   mockRecognition.onresult = jest.fn()

  //   render(<Page />)

  //   const button = screen.getByRole("button")

  //   button.click()

  //   await new Promise((resolve) => setTimeout(resolve, 200))

  //   mockRecognition.submitResult([
  //     [
  //       {
  //         transcript: "random word",
  //         confidence: 0.95,
  //       },
  //     ],
  //   ])

  //   await new Promise((resolve) => setTimeout(resolve, 300))

  //   const alertDiv = screen.getByRole("alert")

  //   expect(alertDiv).toBeInTheDocument()
  // })
})
