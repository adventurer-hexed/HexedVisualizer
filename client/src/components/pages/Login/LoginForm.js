import React from "react";

export default ({ signIn }) => (
    <div className="form_container">
        <header className={"header_login"}>
            <h3>Visualizer PI</h3>
        </header>

        <div className="login_cta">
            <a
                className="login_btn"
                href="/auth/spotify"
                >Login with Spotify
            </a>
        </div>
    </div>
);
