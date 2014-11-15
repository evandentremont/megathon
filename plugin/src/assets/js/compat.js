/*
  Desc:   Checks if the user and the recipient
          both have Snowcrypt Chrome Extension
  Return:   True if so, false elsewise
*/
function isCompatible()
{
  if (getRecipientPublicKey() == '')
  {
    return false;
  }

  return true;
  //If the recipient has a public key,
  // hide the invite to snowcrypt and show encrypted reply instead
}
