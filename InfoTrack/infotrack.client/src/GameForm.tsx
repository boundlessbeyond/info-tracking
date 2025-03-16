import { useState } from "react";
import "./App.css";
import { UserGame } from "./Models";
import DynamicGameRules from "./DynamicGameRules";

function MainGame() {
  const [gameForm, setGameForm] = useState<UserGame>();

  const contents = (
    <>
      <label>
        Game name:
        <input
          value={gameForm?.name}
          onChange={(e) => {
            setGameForm({
              ...gameForm,
              name: e.target.value,
            });
          }}
        />
      </label>
      <label>
        Time Limit:
        <input
          value={gameForm?.timeLimit}
          onChange={(e) => {
            setGameForm({
              ...gameForm,
              timeLimit: e.target.value,
            });
          }}
        />
      </label>
      <label>
        Minimum:
        <input
          value={gameForm?.minimum}
          onChange={(e) => {
            setGameForm({
              ...gameForm,
              minimum: e.target.value,
            });
          }}
        />
      </label>
      <label>
        Maximum:
        <input
          value={gameForm?.maximum}
          onChange={(e) => {
            setGameForm({
              ...gameForm,
              maximum: e.target.value,
            });
          }}
        />
      </label>
    </>
  );

  return (
    <form>
      <h1>GAME TIME!</h1>
      <p>Fill in the rules of your game.</p>
      {contents}
      <DynamicGameRules />
    </form>
  );
}

export default MainGame;
