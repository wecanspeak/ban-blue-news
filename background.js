/*
 * Copyright (c) 2014 Enzo Wang. Released under MIT license, see LICENSE file.
 */

var banCnt = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage( tab.id,
      {action: "[From bg] toggle blue news"},
      function(response) {});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "[From cs] ban") {
        banCnt++;
        ShowBadgeText();
    }
});

function ShowBadgeText() {
    var banCntShow;
    if (banCnt > 99) {
        banCntShow = "99+";
    } else {
        banCntShow = banCnt.toString();
    }
    chrome.browserAction.setBadgeText({text: banCntShow});
}


