import "@testing-library/jest-dom"

import { fireEvent, screen } from "@testing-library/dom"
import { act, render } from "@testing-library/react"

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

    await act(async () => {
      fireEvent.click(button)
      await new Promise((resolve) => setTimeout(resolve, 200))
    })

    const time = screen.getByText(/saniye/i)

    expect(time).toBeInTheDocument()
  })
})
