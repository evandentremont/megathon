chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		SnowcryptMessageBox();
		checkMessages();
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		var target_user_id = 1454430259;
		var msg = "This is a test";


		var PassPhrase = "Five Dollar Wrench";
		var UserPassPhrase = "Obelisk";
		var Bits = 512;

		var RecipientRSAKey = cryptico.generateRSAKey(PassPhrase, Bits);
		var PublicKeyString = cryptico.publicKeyString(RecipientRSAKey);
		var EncryptionResult = cryptico.encrypt(msg, PublicKeyString);

		var UserRSAKey = cryptico.generateRSAKey(UserPassPhrase, Bits);
		var UserPublicKeyString = cryptico.publicKeyString(UserRSAKey);
		var UserEncryptionResult = cryptico.encrypt(msg, UserPublicKeyString);


		send_message(target_user_id, encodeURIComponent(EncryptionResult.cipher+"!"+UserEncryptionResult.cipher));
	}
	}, 10);
});
