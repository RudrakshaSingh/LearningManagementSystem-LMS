import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);

    return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
        <Outlet /> //renders child component in app.jsx
    ) : isLoggedIn ? (
        <Navigate to="/denied" /> //loggedin but not allowed role
    ) : (
        <Navigate to="login" /> // not loggedin as well as not allowed role
    );
}

export default RequireAuth;
