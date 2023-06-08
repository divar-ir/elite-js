import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <>
      <p>
        <Link to="/first">Go to /first</Link>
      </p>
      <p>
        <Link to="/second">Go to /second</Link>
      </p>
    </>
  );
}
