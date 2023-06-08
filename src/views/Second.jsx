import useLoader from '../hooks/use-loader';

export default function Second() {
  const data = useLoader();

  return (
    <>
      <h1>second</h1>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}

export async function loader() {
  return {
    data: 'second',
  };
}
