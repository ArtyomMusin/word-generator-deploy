import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link className="nav-link" to="/">My try</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
