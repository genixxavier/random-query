import { useQuery } from "@tanstack/react-query";

const getRandomNumber = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
  );
  const text = await res.text();

  //throw new Error("Error");
  return parseInt(text);
};

export const useRandom = () => {
  const query = useQuery({
    queryKey: ["randomNumber"],
    queryFn: getRandomNumber,
  });

  return query;
};
