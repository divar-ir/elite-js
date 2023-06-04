import { Link } from 'react-router-dom';
import './First.scss';

function First() {
  return (
    <>
      <h1 className="title-a">First View</h1>
      <Link to="/second">second route</Link>
    </>
  );
}

export default First;
