import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookie.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <ul className="nav-container">
        <Link to="/" className="nav-item">
          <li className="nav-list-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </li>
        </Link>
        <li className="nav-list-item">
          <div className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
            <Link to="/jobs" className="nav-links">
              Jobs
            </Link>
          </div>
        </li>
        <li className="nav-list-item">
          <button type="button" onClick={onLogout} className="nav-logout">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
