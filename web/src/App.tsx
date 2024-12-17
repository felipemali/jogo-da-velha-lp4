import { useGameState } from "./socket/useGameState";
import { Waiting } from "./pages/Waiting";
import { Home } from "./pages/Home";

function App() {
  const { game, isConnected, isWaiting } = useGameState();

  return isConnected ? <Home game={game} /> : <Waiting isWaiting={isWaiting} />;
}

export default App;
