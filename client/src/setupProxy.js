const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(proxy("/auth/spotify", { target: "http://localhost:5000" }));
    app.use(proxy("/current_user", { target: "http://localhost:5000" }));
    app.use(proxy("/api/*", { target: "http://localhost:5000 " }));
};
