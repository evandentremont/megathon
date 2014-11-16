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
      console.log(typeof json);
      if (json == null)
        return json[0].publickey;
  });
  return -1;
}


function getPrivateKey()
{
  storage.get('private_key', function(result){
    return result.private_key;
  });

}

/*
  Desc:   Creates a private and a public key pair
*/
function createKeyPair(){
  var storage = chrome.storage.local;
  var sentinel = 1;

  storage.get(['private_key', 'public_key'], function(result){
    console.log("createKeyPair" + result.public_key);
    console.log("createKeyPair" + result.private_key);
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
  Desc: Checks if you and the recipient both have public keys available
  Return:
*/

function getUserPublicKey(cb){
  var storage = chrome.storage.local;
  storage.get('public_key', function(result){
    console.log("getUserPublicKey " + result.public_key);
    cb(result.public_key.trim());
  });
}

/*
  Desc:   Gets the key from snowcrypt.ca/keys/<hash of the key>
  Param:  Hash of the key
  Return: The private key associated with the hash, -1 if any failure
*/

function getRecipientPublicKey(cb){
  var hashed_id = $.md5(getRecipientID());
  $.get( "http://snowcrypt.ca/keys/" + hashed_id, function( data ) {
    var json = $.parseJSON(data);
    console.log("getRecipientPublicKey " + json[0].publickey);
    cb(json[0].publickey);
  });
}
