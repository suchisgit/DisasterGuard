import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Header() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { role, setrole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const logout = () => {
        setguserID('');
        setrole('');
        setguserEmail('');
        setguserName('');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">DisasterGuard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {role == '' ? <React.Fragment>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>                          
                        </React.Fragment>
                            :
                            (role == 'user' ? <React.Fragment>
                                <li className="nav-item">
                                <Link className="nav-link" to="/volunteer">volunteer</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/updateuser">Update Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/freetrials">Interactive Maps</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/updateuser">Update Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/freetrials">Interactive Maps</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/freetrials">Social Media</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout}>Logout</Link>
                                </li>
                            </React.Fragment> : (role == 'volunteer' ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/supportmaterial" >Support Material</Link>
                                    </li>
                                    <li className="nav-item">
                                    <Link className="nav-link" to="/freetrials">Interactive Maps</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/freetrials">Social Media</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout}>Logout</Link>
                                </li>
                                </React.Fragment> :''
                                
                            )
                            )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header;