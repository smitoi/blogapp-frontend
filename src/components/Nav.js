import {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const {user, userProfile, logoutUser} = useContext(AuthContext);
    return (
        <nav>
            <div>
                <h1>BlogApp</h1>
                <div>
                    <Link to='/'>Home</Link>
                    <Link to='/article'>Articles</Link>
                    {user ? (
                        <>
                            {userProfile?.is_editor ? <Link to='/editor'>Edited</Link> : null}
                            <button onClick={logoutUser}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
