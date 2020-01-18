const express = require('express');
var mjAPI = require("mathjax-node");
mjAPI.config({
    MathJax: {
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            // inlineMath: [ ['$','$'], ["\\(","\\)"] ],
            displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
            processEscapes: true
        },
        "HTML-CSS": { fonts: ["TeX"] }
    }
});
mjAPI.start();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    mjAPI.typeset({
        math: 'This formula x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a} is an example.',
        format: "TeX", // or "inline-TeX", "MathML"
        html:true,      // or svg:true, or html:true
    }, function (data) {
        // if (!data.errors) {console.log(data.html)}
        res.send(data.html);
    });


});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
