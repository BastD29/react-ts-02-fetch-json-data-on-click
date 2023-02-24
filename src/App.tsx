import { useState } from "react";
import { Person } from "./models/person";

const App = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("../data.json", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr("err");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}

      {data.map((person) => {
        return (
          <div key={person.id}>
            <p>{person.email}</p>
            <p>{person.first_name}</p>
            <p>{person.last_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
