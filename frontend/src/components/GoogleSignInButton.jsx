import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleSignInButton() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // ambil profil dari Google Userinfo endpoint
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                });
                const profile = await res.json();
                const user = {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    picture: profile.picture,
                };
                login(user);
                navigate("/user");
            } catch (e) {
                console.error("Google profile fetch error", e);
            }
        },
        onError: () => {
            console.error("Google login failed");
        },
        flow: "implicit"
    });

    return (
        <div>
            <button
                type="button"
                onClick={() => googleLogin()}
                className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
                Sign In with Google
            </button>
        </div>
    );
}