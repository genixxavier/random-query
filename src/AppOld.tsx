import { useEffect, useReducer, useState } from "react";
import "./App.css";

const getRandomNumber = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
  );
  const text = await res.text();

  //throw new Error("Error");
  return parseInt(text);
};

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumber()
      .then(setNumber)
      .catch((err) => setError(err.message));
  }, [key]);

  useEffect(() => {
    if (number) {
      setIsLoading(false);
    }
  }, [number]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return (
    <>
      <div className="App App-header">
        {isLoading ? <h2>Loading ...</h2> : <h2>Number random: {number}</h2>}
        {!isLoading && error && <h2>Error: {error}</h2>}
      </div>

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? "..." : "New number"}
      </button>
    </>
  );
};
