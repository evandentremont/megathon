/*
  Desc:   Posts the given key to snowcrypt.ca/keys
  Param:  The key that will be posted to the URL
          The ID associated with the user
*/
function postKey(key)
{
  var ID = getUserID();
  var hashed_id = $.md5(ID); //Referenced at https://github.com/placemarker/jQuery-MD5
  var postAction = $.post( "http://snowcrypt.ca/keys", {
    hashedID : hashed_id,
    publickey: key
  });

  postAction.done(function()
  {
    $( "#snowcrypt_textarea" ).val( "Posting done." );
  });

}

/*
  Desc:   Gets the key from snowcrypt.ca/keys/<hash of the key>
  Param:  Hash of the key
  Return: The private key associated with the hash, -1 if any failure
*/
function getPublicKey(ID)
{
  var hashed_key = $.md5(ID);
  $.get( "http://snowcrypt.ca/keys/" + hashed_key, function( data ) {
    var json = $.parseJSON(data);
    return json[0].publickey;
  });

  return -1;
}

/*
  Desc:   Creates a private and a public key pair
*/
function createKeyPair(){
  var storage = chrome.storage.local;
  var sentinel = 1;


  storage.get(['private_key', 'public_key'], function(result){
    console.log(result.public_key);
    console.log(result.private_key);
    sentinel = 0;
  });

  if (sentinel){
    var PassPhrase = "A random string";
    var Bits = 512;
    var gen_private_key = cryptico.generateRSAKey(PassPhrase, Bits);
    var gen_public_key =  cryptico.publicKeyString(gen_private_key);

    storage.set({private_key: gen_private_key, public_key: gen_public_key}, function(){
      postKey(gen_public_key);
    });
  }
}









/*
  Return:   The user public key, retrieved locally
*/
function getUserPublicKey(){
  var storage = chrome.storage.local;
  storage.get(['private_key', 'public_key'], function(result){
    return result.public_key;
  });

  return "";
}

/*
  Return:   The recipient public key, retrieved by request
*/
function getRecipientPublicKey(){
  return getPublicKey(getRecipientID());
}
