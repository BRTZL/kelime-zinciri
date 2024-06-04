import { GameProvider } from "@/lib/game"
import WordChainGameComponent from "@/components/game"

export default function Home() {
  return (
    <GameProvider>
      <WordChainGameComponent />
    </GameProvider>
  )
}
