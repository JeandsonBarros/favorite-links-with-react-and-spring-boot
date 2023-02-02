import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../services/TokenService";

function Container({ children }) {

    const location = useLocation()
    const navigation = useNavigate()

    useEffect(() => {
       
        if ((location.pathname.includes("/login") ||
            location.pathname.includes("/register") ||
            location.pathname.includes("/forgot-password") ||
            location.pathname.includes("/change-forgot-password"))
            && getToken()
        ) {
            navigation("/")
        }

    }, [location])

    return (
        <main style={{ minHeight: "100vh" }} >
            {children}
        </main>
    );
}

export default Container;