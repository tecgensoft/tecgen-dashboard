

const Authenticate = ({ children }: { children: any }) => {
    // const location = useLocation();
    // const { pathname, state } = location;
    // const {userToken, userInfo} = useAppSelector((state) => state.auth);

    // if (!userToken && !userInfo) {
    //     return children;
    // }

    // if (userToken && userInfo) {
    //     return <Navigate to="/" state={{ ...state, path: pathname }} />;
    // }
    return children;
};

export default Authenticate;