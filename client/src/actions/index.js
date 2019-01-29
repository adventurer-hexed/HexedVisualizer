import { SIGN_IN, SIGN_OUT } from "./types";
import axios from "axios";
import history from "../history";

export const signIn = id => async dispatch => {
    getUser();
};

export const signOut = () => async dispatch => {
    const res = await axios.get("/api/logout");
    dispatch({ type: SIGN_OUT, payload: res.data });
    history.push("/login");
};

export const getUser = () => async dispatch => {
    const res = await axios.get("/current_user");
    if (res.data.id) {
        dispatch({
            type: SIGN_IN,
            payload: { isSignedIn: true, id: res.data.id }
        });
        history.push("/");
    } else {
        history.push("/login");
    }
};
