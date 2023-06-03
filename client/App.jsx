import { Link, Route, Routes } from 'react-router-dom'
import routes from './routes'

console.log(routes);

export function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ path }) => {
            return (
              <li key={path}>
                <Link to={path}>{path}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component }) => {
          return <Route Component={component} key={path} path={path}></Route>
        })}
      </Routes>
    </>
  )
}
