const router = require("express").Router();
const express = require("express");
const path = require("path");
const spotifyAuthRoute = require("./spotifyAuthRoute");

router.use(spotifyAuthRoute);

module.exports = router;
