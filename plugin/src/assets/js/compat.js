/*
  Desc:   Checks if the user and the recipient
          both have Snowcrypt Chrome Extension
  Return:   True if so, false elsewise
*/
function isCompatible()
{

  var recipient_public_key = getRecipientPublicKey(function(result){
      recipient_public_key = result;
      //alert(recipient_public_key);
      if (recipient_public_key == undefined)
      {
        //console.log("False from callback");
        return false;
      }
      //console.log("True from callback");
      return true;
  });


  //console.log("Final result after callback: " + recipient_public_key);

  if(recipient_public_key == true){
    return true;
  }


}
