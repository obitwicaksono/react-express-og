import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// helper decode JWT tanpa library
function decodeJwt(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

export default function GoogleSignInButton() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    try {
                        const decoded = decodeJwt(credentialResponse.credential);
                        if (!decoded) throw new Error("Invalid token");
                        const user = {
                            id: decoded.sub,
                            name: decoded.name,
                            email: decoded.email,
                            picture: decoded.picture,
                        };
                        login(user);
                        navigate("/user");
                    } catch (e) {
                        console.error("decode error", e);
                    }
                }}
                onError={() => {
                    console.error("Google login failed");
                }}
            />
        </div>
    );
}