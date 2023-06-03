export default function Home() {
  return <h1>Home</h1>;
}

export async function loader() {
  return {
    data: "home",
  };
}