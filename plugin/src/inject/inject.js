chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		SnowcryptMessageBox();
		toggleInvite();
		createKeyPair();

		//getPublicKey(getUserID());
		//postKey("This is a key", getUserID());
		decryptMessages();
		$(".uiScrollableAreaBody").bind('DOMNodeInserted', function(event) {
      console.log('inserted ' + event.target.nodeName + // new node
            ' in ' + event.target.nodeName); // parent
		});
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});
