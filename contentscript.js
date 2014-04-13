/*
 * Copyright (c) 2014 Enzo Wang. Released under MIT license, see LICENSE file.
 */

var BanProvider=['TVBS', '聯合新聞網', '旺報', '中央社', '東森新聞','中時電子報'];
var isBanned = false;
var providerList, h1List, providerBanned, h1Banned;

(function BanFindAndHide() {
    for (var i = 0; i < BanProvider.length; i++) {
        var findProvider = "[content=\""+BanProvider[i]+"\"]";
        providerList = document.body.querySelectorAll(findProvider);
        h1List = document.body.querySelectorAll('h1');
        if (providerList.length > 0) {
            providerBanned = providerList[0];
            h1Banned = h1List[0];
            BanHide();
        }
    }
})();

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.action == "[From bg] toggle blue news") {
        //alert("isBanned = " + isBanned);
        if (isBanned) { BanShow(); } 
        else          { BanHide(); }
    }
});

function NotifyBanStatus(banStatus) {
    if (banStatus === true) {
        chrome.runtime.sendMessage({action: "[From cs] ban"}, function(response) { });
    } else {
        chrome.runtime.sendMessage({action: "[From cs] not ban"}, function(response) { });
    }
}

function BanHide() {
    providerBanned.parentNode.style.display='none';
    h1Banned.style.display = 'none';
    isBanned = true;
    NotifyBanStatus(isBanned);
}

function BanShow() {
    providerBanned.parentNode.style.display='inherit';
    h1Banned.style.display = 'inherit';
    isBanned = false;
    NotifyBanStatus(isBanned);
}
