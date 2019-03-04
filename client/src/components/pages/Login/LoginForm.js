import React from "react";
import spotifyLogo from "./spotify1.svg";

export default ({ signIn }) => (
    <div className="form_container">
        <div className="login_cta">
            <a
                className="login_btn"
                href="/auth/spotify"
            >Login with Spotify
            </a>
        </div>
    </div>
);
