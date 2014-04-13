function resetBanCounter() {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.banCnt=0;
    bkg.ShowBadgeText();
}
document.getElementById('resetBtn').addEventListener('click', resetBanCounter);

