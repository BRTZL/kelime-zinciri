import "@testing-library/jest-dom"

import { screen } from "@testing-library/dom"
import { render } from "@testing-library/react"

import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders a button", () => {
    render(<Button />)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("renders a button with text", () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("Click Me")
  })

  it("calls the onClick function", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    const button = screen.getByRole("button")
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
