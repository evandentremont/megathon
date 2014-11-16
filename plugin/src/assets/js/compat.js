/*
  Desc:   Checks if the user and the recipient
          both have Snowcrypt Chrome Extension
  Return:   True if so, false elsewise
*/
function isCompatible()
{
  getRecipientPublicKey(function(result){
    var recipient_public_key = result;
    //alert(recipient_public_key);
    if (recipient_public_key)
    {
      return true;
    }
    else return false;
  });
  });


  console.log("Final result after callback: " + recipient_public_key);

  if(recipient_public_key == true){
    return true;
  return false;
}
