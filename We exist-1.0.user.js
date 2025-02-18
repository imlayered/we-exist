// ==UserScript==
// @name         We exist
// @namespace    http://auri.lol/
// @version      1.0
// @description  Adds T back to the LGBTQ acrynym on websites that have removed it
// @author       Auri (github.com/imlayered/we-exist)
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.includes("LGBQ")) {
                node.nodeValue = node.nodeValue.replace(/LGBQ/g, "LGBTQ");
            }
        } else {
            for (let child of node.childNodes) {
                replaceText(child);
            }
        }
    }

    replaceText(document.body);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((newNode) => {
                replaceText(newNode);
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();