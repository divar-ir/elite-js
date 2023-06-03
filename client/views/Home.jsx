import useLoader from "../hooks/use-loader";

export default function Home() {
  const data = useLoader();
  return (
    <>
      <h1>Home</h1>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}

export async function loader() {
  return {
    data: 'home',
  };
}
