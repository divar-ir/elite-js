import { Link } from 'react-router-dom';

import useLoader from '@/hooks/use-loader';

export default function First() {
  const data = useLoader();

  return (
    <>
      <h1>first</h1>
      <p>
        <Link to="/first/second">Go to /first/second</Link>
      </p>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}

export async function loader() {
  return {
    data: 'first',
  };
}
