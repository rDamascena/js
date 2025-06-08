// ==UserScript==
// @name        Untranslate
// @description Automatically shows original Google search results
// @version     2023-12-14
// @author      David Trapp
// @namespace   https://david-trapp.com/
// @match       *://*.google.com/search?*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant       none
// ==/UserScript==

(function() {
    'use strict'

    function untranslate() {
        [...document.querySelectorAll('svg[viewBox="0 0 24 24"]')]
        .reverse()
            .map(x => x.closest('[data-ved]')?.querySelector('[jsaction]'))
            .filter(x => x?.innerText.includes('English') && !x?.classList.contains('untranslated') && x?.closest('[jscontroller]'))
            .forEach(x => {
                x.closest('[jscontroller]').style.display = 'none' // Prevent scroll on .focus() and get rid of the translation box entirely
                x.classList.add('untranslated')
                x.click()
            })
    }

    untranslate()
    new MutationObserver(untranslate).observe(document.body, {
        subtree: true,
        childList: true
    })
})()
