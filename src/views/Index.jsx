import { Link } from 'react-router-dom';

import useLoader from '@/hooks/use-loader';

export default function Index() {
  const data = useLoader();

  return (
    <>
      <p>
        <Link to="/first">Go to /first</Link>
      </p>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}

export async function getSSFDataList() {
  return {
    data: 'second',
  };
}
