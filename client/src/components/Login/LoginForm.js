import React from "react";
import spotifyLogo from "./spotify1.svg";

export default ({ signIn }) => (
    <div className="form_container">
        <header className={"header_login"}>
            <h3>Continue with</h3>
            <h3>Spotify</h3>
        </header>

        <figure onClick={() => signIn()} className={"logo_container"}>
            <a href="/auth/spotify">
                <img alt="Spotify logo" width="200px" src={spotifyLogo} />
            </a>
        </figure>
    </div>
);
