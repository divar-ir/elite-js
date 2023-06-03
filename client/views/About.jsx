import useLoader from "../hooks/use-loader";

export default function About() {
  const data = useLoader();
  return (
    <>
      <h1>About</h1>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}

export async function loader() {
  return {
    data: "about",
  };
}
