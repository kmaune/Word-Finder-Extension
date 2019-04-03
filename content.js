function findWord(searchWord){
	var searchregexp = new RegExp(searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
	console.log(searchregexp);
	var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(searchregexp, "FOUND_THIS_WORD");
                if (replacedText !== text) {
                    element.innerHTML = replacedText;
                }
            }
        }
    }
}
	

function updateWord(searchWord){
	var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                console.log('HERE');
                var replacedText = text.replace(/FOUND_THIS_WORD/gi, "<span class = 'highlighted' style='color:white;background-color:blue;font-weight:bold'>" +  searchWord + "</span>");
                if (replacedText !== text) {
                    element.innerHTML = replacedText;
                }
            }
        }
    }
}



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	if(request.search){
    		findWord(request.searchWord);
    		updateWord(request.searchWord);
    	}

    	if(!request.search){
    		$('span.highlighted').removeClass('highlighted').addClass('previous');
    		$('span.previous').css({'font-weight': 'normal', 'background-color': 'white', 'color': 'black'});
    	}        
        
        sendResponse({farewell: "completed"});
});


