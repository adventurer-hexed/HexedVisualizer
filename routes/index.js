const router = require("express").Router();
const express = require("express");
const path = require("path");
const spotifyAuthRoute = require("./spotifyAuthRoute");
const spotifyApiRoutes = require("./spotifyApiRoutes");

router.use(spotifyAuthRoute);
router.use(spotifyApiRoutes);

module.exports = router;
