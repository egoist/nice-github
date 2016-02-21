// ==UserScript==
// @name         NiceHub
// @namespace    http://nicehub.egoistian.com/
// @version      0.1
// @description  try to take over the world!
// @author       EGOIST
// @match        http*://*.github.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @grant        MIT
// ==/UserScript==
/* jshint -W097 */
'use strict';

function injectCSS(css) {
    const head = document.head
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    head.appendChild(style)
}

injectCSS(`
.account-switcher {
  display: none;
  margin-bottom: 0;
}
.news .alert:nth-child(2) {
  border-top: 0;
}
.nice-github .news .alert:nth-child(2) {
  border-top: 1px solid #f1f1f1;
}
.news .alert:nth-child(2) .body {
  padding-top: 0;
}
.nice-github .news .alert:nth-child(2) .body {
  padding-top: 1em;
}
.news .alert:nth-child(2) .body .dashboard-event-icon {
  top: 0;
}
.nice-github .news .alert:nth-child(2) .body .dashboard-event-icon {
  top: 14px;
}
.file-navigation-options .file-navigation-option:not(:first-child) {
  display: none;
}
.filter-repos {
  padding-top: 0;
}
.filter-repos #your-repos-filter {
  display: none;
}
.js-site-search-form label {
  border-radius: 2px;
  border-color: #ddd;
  box-shadow: none;
}
`)

document.addEventListener('DOMContentLoaded', function () {
    const path = location.pathname
    if (path === '/') {
        // hide ads
        $('.github-jobs-promotion').hide()

        // hide org repos
        $('.dashboard-sidebar').find('.boxed-group').first().hide()
        $('.dashboard-sidebar').find('.boxed-group').eq(1).css('margin-top', '10px')

        // move account switcher to sidebar
        $('.account-switcher').prependTo('.dashboard-sidebar').show()
        $('.select-menu-button').css('width', '100%')
        const sidebarWidth = $('.dashboard-sidebar').width()
        $('.select-menu-modal').css('width', sidebarWidth + 'px')
        $('.news .alert:first-child .body').css('padding-top', 0)
    }
    // hide footer
    $('.site-footer').css('visibility', 'hidden')
    
    // hide nav tooltip
    $('.header-nav-link').removeClass('tooltipped')
    
    $('body').addClass('nice-github')
})
