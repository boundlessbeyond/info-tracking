import { useState } from "react";
import "./App.css";
import { GameRule } from "./Models";

function DynamicGameRules() {
  const [gameForm, setGameForm] = useState<GameRule[]>([
    { divisor: "", word: "" },
  ]);

  const handleAddInput = () => {
    setGameForm([...gameForm, { divisor: "", word: "" }]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const onChangeIndex = [...gameForm];
    onChangeIndex[index] = { ...onChangeIndex[index], [name]: value };
    setGameForm(onChangeIndex);
  };

  const handleRemoveInput = (index: number) => {
    const values = [...gameForm];
    values.splice(index, 1);
    setGameForm(values);
  };

  return (
    <div className="container">
      {gameForm.map((item, index) => (
        <div className="input_container" key={index}>
          <label>
            Divisor:
            <input
              name="divisor"
              type="text"
              value={item.divisor}
              onChange={(event) => handleChange(event, index)}
            />
          </label>
          <label>
            Word:
            <input
              name="word"
              type="text"
              value={item.word}
              onChange={(event) => handleChange(event, index)}
            />
          </label>
          {gameForm.length > 1 && (
            <button onClick={() => handleRemoveInput(index)}>Delete</button>
          )}

          {index === gameForm.length - 1 && (
            <button onClick={() => handleAddInput()}>Add</button>
          )}
        </div>
      ))}
      {/* <div className="body"> {JSON.stringify(gameForm)} </div> */}
    </div>
  );
}

export default DynamicGameRules;
