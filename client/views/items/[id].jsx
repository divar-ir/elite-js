import React from "react";
import { Link } from "react-router-dom";
import useLoader from "../../hooks/use-loader";

export async function loader({ params }) {
  return { item: params };
}

export default function Item({ item }) {
  const data = useLoader();
  return (
    <>
      <p>{item}</p>
      <p>
        <Link to="/">Go to the index</Link>
      </p>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}
