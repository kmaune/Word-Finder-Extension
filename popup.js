function sendSearch(searchWord, searchregexp) {
   //console.log("popup.js > sendClicks()");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {searchWord: searchWord, search: true}, function(response) {
            console.log(response);
        });
    });

}

function resetLastWord(lastSearched){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {lastSearched: lastSearched, search: false}, function(response){
            console.log(response);
        });
    });    
}



$(function() {
    $('#find-word').click(function(){
        chrome.storage.sync.get(['lastSearched'], function(word){
            var searchWord = $('#search').val()
            if(word.lastSearched){
                resetLastWord(word.lastSearched);
                if(searchWord){
                    chrome.storage.sync.set({'lastSearched':searchWord});
                    sendSearch(searchWord);
                }
            }

            else{
                if(searchWord){
                    chrome.storage.sync.set({'lastSearched':searchWord});
                    sendSearch(searchWord);
                }
            }
        });
        //var searchregexp = new RegExp($('#search').val().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
        //highlightWord(searchWord, searchregexp);
        
    });
});