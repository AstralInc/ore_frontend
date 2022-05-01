/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path      = require('path');
const express   = require('express');
const app       = express();

// Enable use of images, JavaScript & CSS
app.use(express.static('public'));

// Map routes
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

// Start the express server, default port is 5001
app.listen(process.env.PORT || 5001, () => {
    console.log("server started on port " + (process.env.PORT || "5001"));
})