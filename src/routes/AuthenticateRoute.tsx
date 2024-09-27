import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";


const Authenticate = ({ children }: { children: any }) => {
    const location = useLocation();
    const { pathname, state } = location;
    const {token, userInfo} = useAppSelector((state) => state.auth);
    // console.log('ok', token, userInfo)
    if (!token && !userInfo) {
        console.log(!token)
        return children;
    }

    if (token && userInfo) {
        console.log(token)
        return <Navigate to="/" state={{ ...state, path: pathname }} />;
    }
    return children;
};

export default Authenticate;