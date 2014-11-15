/*
  Desc:   Posts the given key to snowcrypt.ca/keys
  Param:  The key that will be posted to the URL
          The ID associated with the user
*/
function postKey(key, ID)
{

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
