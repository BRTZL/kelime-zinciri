"use client"

import React from "react"
import ReactConfetti from "react-confetti"

type ConfettiProps = {
  isVisible?: boolean
}

export function Confetti({ isVisible }: ConfettiProps) {
  const [isConfettiVisible, setIsConfettiVisible] = React.useState(false)
  const [isConfettiRunning, setIsConfettiRunning] = React.useState(false)

  React.useEffect(() => {
    let timer: NodeJS.Timeout

    if (isVisible) {
      setIsConfettiVisible(true)
      setIsConfettiRunning(true)

      timer = setTimeout(() => {
        setIsConfettiRunning(false)
      }, 5000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isVisible])

  if (!isConfettiVisible) {
    return null
  }

  return <ReactConfetti opacity={0.6} recycle={isConfettiRunning} />
}
