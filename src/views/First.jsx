import useLoader from '../hooks/use-loader';

export default function First() {
  const data = useLoader();

  return (
    <>
      <h1>first</h1>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}

export async function loader() {
  return {
    data: 'first',
  };
}
