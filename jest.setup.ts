// jest.setup.ts
Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
})

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  value: jest.fn(),
})
