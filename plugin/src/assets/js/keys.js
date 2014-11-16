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
    //$( "#snowcrypt_textarea" ).val( "Posting done." );
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
      if(data != '[\n\n]')
      {
        var json = $.parseJSON(data);
      var json = $.parseJSON(data);
          return json[0].publickey;
      }
  });
  return -1;
}


function getPrivateKey(cb)
{
    chrome.storage.sync.get(['passPhrase', 'bits'], function(result){
        rsakey = cryptico.generateRSAKey(result.passPhrase, result.bits);
        cb(rsakey);
    });
}

function createNewKeyPair(){
    var PassPhrase = "A random string test";
    var Bits = 512;
    var gen_private_key = cryptico.generateRSAKey(PassPhrase, Bits);
    var gen_public_key =  cryptico.publicKeyString(gen_private_key);

    chrome.storage.sync.set({passPhrase: PassPhrase, bits: Bits, public_key: gen_public_key}, function(){
      postKey(gen_public_key);
    });
}

/*
  Desc:   Creates a private and a public key pair
*/
function createKeyPair(){
  chrome.storage.sync.get(['passPhrase', 'public_key'], function(result){
    if(!result.length){
      createNewKeyPair();
    }
  });
}

/*
  Desc: Checks if you and the recipient both have public keys available
  Return:
*/

function getUserPublicKey(cb){
  chrome.storage.sync.get('public_key', function(result){
    cb(result.public_key);
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
    if(data != '[\n\n]'){
      var json = $.parseJSON(data);
      cb(json[0].publickey);
    }else{
      //console.log("Public key not found!");
      cb(undefined);
    }
      //cb(false);
  });
  //return -1;
}
