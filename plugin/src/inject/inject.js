chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			SnowcryptMessageBox();
			toggleInvite();
			createKeyPair();

			var numMessages = 0;
			var newMessages = 0;

			setInterval(
				function(){
					newMessages = jQuery('.webMessengerMessageGroup').length;
					if( newMessages != numMessages){
						numMessages = newMessages;
						console.log("Now " + numMessages + " messages");
						decryptMessages();
					}
				}, 2500);
		}
	}, 10);
});
