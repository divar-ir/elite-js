import React from 'react'
import { Link } from 'react-router-dom'
import useLoader from '../../hooks/use-loader'

export default function ItemsIndex ({ todoList = [] }) {
  const data = useLoader()
  return (
    <>
      <ul>{
        todoList.map((item, i) => {
          return <li key={`item-${i}`}><Link to={`/items/${i}`}>{item}</Link></li>
        })
      }</ul>
      <p>
        <Link to="/">Go to the index</Link>
      </p>
      <code>{JSON.stringify(data)}</code>
    </>
  )
}

export async function loader() {
  return {
    data: 'items'
  }
}
