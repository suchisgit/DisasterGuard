import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Header() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const logout = () => {
        setguserID('');
        setguserRole('');
        setguserEmail('');
        setguserName('');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Golds Gym </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {guserID == '' ? <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </React.Fragment>
                            :
                            (guserRole == 'admin' ? <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/enrollusers">Enroll users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/checkinout">Check in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/freetrials">Free trials</Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Analytics dashboards
                                    </Link>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" to="/dashboard">Class enrollments</Link></li>
                                        <li><Link class="dropdown-item" to="/hoursspent">Hours spent</Link></li>
                                        <li><Link class="dropdown-item" to="/noofvisitors">Number of visitors</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout}>Logout</Link>
                                </li>
                            </React.Fragment> : (guserRole == 'Member' ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/schedule" >My classes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/activity">View activites</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signupforclass">Book class</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/loghours">Log hours</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={logout}>Logout</Link>
                                    </li>
                                </React.Fragment> :
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout}>Logout</Link>
                                </li>
                            )
                            )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header;