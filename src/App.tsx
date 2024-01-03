import "./App.css";
import { useRandom } from "./hooks/useRandom";

export const App = () => {
  const query = useRandom();

  return (
    <>
      <div className="App App-header">
        {query.isFetching ? (
          <h2>Loading ...</h2>
        ) : (
          <h2>Number random: {query.data}</h2>
        )}
        {!query.isFetching && query.isError && (
          <h2>Error: {`${query.error}`}</h2>
        )}
      </div>

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? "..." : "New number"}
      </button>
    </>
  );
};
