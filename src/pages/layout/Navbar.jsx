import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {

    return (
        <div className="navbar">
            <div className="navbar-logo">
                Game of Life
            </div>
            <ul className="navbar-menu">
                <li>
                    <Link to="/home">
                            Home
                    </Link>
                    </li>
                <li>
                    <Link to="/game">
                        Game
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar