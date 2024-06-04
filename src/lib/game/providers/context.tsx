"use client"

import React, { createContext, useContext, useReducer } from "react"

import { GameState, PlayerType, WordChainGame } from "../services/game"

const TURN_DURATION = 8000
const TIMEOUT_FAILURE_RATE = 0.1
const REPEATED_WORD_FAILURE_RATE = 0.3

interface GameContextType {
  gameState: GameState
  startGame: () => void
  restartGame: () => void
  errorMessage?: string
  winner?: PlayerType
  timeoutDuration: number
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const initialGameState: GameState = {
  currentWord: "",
  usedWords: [],
  userTurn: true,
  gameOver: false,
  remainingTime: 0,
}

function gameReducer(state: GameState, action: Partial<GameState>) {
  return { ...state, ...action }
}

type GameProviderProps = {
  children: React.ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [game] = React.useState(
    () =>
      new WordChainGame({
        turnDuration: TURN_DURATION,
        timeoutFailureRate: TIMEOUT_FAILURE_RATE,
        repeatedWordFailureRate: REPEATED_WORD_FAILURE_RATE,
      })
  )
  const [errorMessage, setErrorMessage] = React.useState<string>()
  const [winner, setWinner] = React.useState<PlayerType>()
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState)

  const handleGameUpdate = (state: GameState) => {
    dispatch(state)
  }

  const handleGameOver = (winner: PlayerType) => {
    setWinner(winner)
  }

  const handleGameError = (error: string) => {
    setErrorMessage(error)
  }

  const startGame = () => {
    setErrorMessage(undefined)
    setWinner(undefined)
    game.start()
  }

  const restartGame = () => {
    setErrorMessage(undefined)
    setWinner(undefined)
    game.restart()
  }

  React.useEffect(() => {
    game.onUpdate(handleGameUpdate)
    game.onGameOver(handleGameOver)
    game.onError(handleGameError)
  }, [game])

  const contextValue: GameContextType = {
    errorMessage,
    winner,
    gameState,
    startGame,
    restartGame,
    timeoutDuration: TURN_DURATION,
  }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
