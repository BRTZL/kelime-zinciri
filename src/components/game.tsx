"use client"

import React from "react"
import { useGameContext } from "@/game"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/ui/avatar"
import { Button } from "@/ui/button"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

const WordChainGameComponent: React.FC = () => {
  const { gameState, errorMessage, winner, startGame } = useGameContext()

  return (
    <div className="bg-background h-screen w-screen">
      <div className="container flex size-full items-center justify-center overflow-y-auto overflow-x-hidden py-20">
        <Card className="flex size-full flex-1 flex-col">
          <CardHeader>
            <CardTitle>Kelime Zinciri</CardTitle>
            <CardDescription>
              Keline zinciri, oyuncuların belirli bir kelime ile başlayarak
              sırayla birbirlerine kelime eklemesi ve kelime zincirini devam
              ettirmesi gereken bir kelime oyunudur.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            {gameState.usedWords.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <Button onClick={startGame} className="px-12 py-5 text-xl">
                  Oyuna Başla
                </Button>
              </div>
            ) : (
              <>
                <span className="text-center text-3xl font-semibold">
                  {Math.ceil(gameState.remainingTime / 1000)} seconds
                </span>
                <div className="size-full overflow-x-hidden overflow-y-scroll">
                  <AnimatePresence>
                    {gameState.usedWords.map(
                      ({ word, from, isError }, index) => (
                        <motion.div
                          key={index}
                          layout
                          initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                          exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                          transition={{
                            opacity: { duration: 0.1 },
                            layout: {
                              type: "spring",
                              bounce: 0.3,
                              duration: index * 0.05 + 0.2,
                            },
                          }}
                          style={{
                            originX: 0.5,
                            originY: 0.5,
                          }}
                          className={cn(
                            "flex flex-col gap-2 whitespace-pre-wrap p-4",
                            from === "user" ? "items-end" : "items-start"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {from === "pc" && (
                              <Avatar className="flex items-center justify-center">
                                <AvatarFallback>PC</AvatarFallback>
                              </Avatar>
                            )}
                            <span
                              className={cn(
                                "max-w-xs rounded-md p-3 text-xl font-medium",
                                isError ? "bg-destructive" : "bg-accent"
                              )}
                            >
                              <span>{word.slice(0, word.length - 1)}</span>
                              <span className="text-primary">
                                {word.charAt(word.length - 1)}
                              </span>
                            </span>
                            {from === "user" && (
                              <Avatar className="flex items-center justify-center">
                                <AvatarFallback>ME</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </motion.div>
                      )
                    )}

                    {!gameState.gameOver && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                        transition={{
                          opacity: { duration: 0.1 },
                          layout: {
                            type: "spring",
                            bounce: 0.3,
                            duration: gameState.usedWords.length * 0.05 + 0.2,
                          },
                        }}
                        style={{
                          originX: 0.5,
                          originY: 0.5,
                        }}
                        className={cn(
                          "flex flex-col gap-2 whitespace-pre-wrap p-4",
                          gameState.userTurn ? "items-end" : "items-start"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {!gameState.userTurn && (
                            <Avatar className="flex items-center justify-center">
                              <AvatarFallback>PC</AvatarFallback>
                            </Avatar>
                          )}
                          <span
                            className={"bg-accent/60 max-w-xs rounded-md p-3"}
                          >
                            <div className="flex flex-row items-center justify-center gap-2 pt-1">
                              <span className="sr-only">Loading...</span>
                              <div className="size-3 animate-bounce rounded-full bg-black [animation-delay:-0.3s]" />
                              <div className="size-3 animate-bounce rounded-full bg-black [animation-delay:-0.15s]" />
                              <div className="size-3 animate-bounce rounded-full bg-black" />
                            </div>
                          </span>
                          {gameState.userTurn && (
                            <Avatar className="flex items-center justify-center">
                              <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {errorMessage && (
                  <Alert variant={winner === "pc" ? "destructive" : "default"}>
                    <AlertTitle>
                      {winner === "pc" ? "Kaybettin 😔" : "Kazandın 😉"}
                    </AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WordChainGameComponent
