import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemsIndex ({ todoList = [] }) {
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
    </>
  )
}

export async function loader() {
  return {
    data: 'items'
  }
}
