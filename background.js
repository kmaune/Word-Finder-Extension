chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.remove(['lastSearched'], function(){
    	console.log('reset chrome.storage.sync  lastSearched');
    })
});