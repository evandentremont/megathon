/*
  Desc: Replaces the Facebook chat messagebox
        with Snowcrypt's messagebox
*/

function SnowcryptMessageBox()
{
  /*Create all JS elements*/

  var snowcrypt_messagebox = $('<div/>');
  snowcrypt_messagebox.attr("id", "snowcrypt_messagebox");

  var snowcrypt_textarea_container = $('<div/>', {
    id: "snowcrypt_textarea_container"
  });

  var snowcrypt_textarea = $('<textarea/>', {
    id: "snowcrypt_textarea",
    class: "snowcrypted"
  });

  var snowcrypt_replylabel = $('<label/>', {
    id: "snowcrypt_replylabel"
  });

  var snowcrypt_replybutton = $('<input/>', {
    id: "snowcrypt_replybutton",
    type: "button",
    value: "Encrypted Reply"
  });


  var snowcrypt_invitelabel = $('<label/>', {
    id: "snowcrypt_invitelabel"
  });

  var snowcrypt_invitebutton = $('<input/>', {
    id: "snowcrypt_invitebutton",
    type: "button",
    value: "Invite to Snowcrypt"
  });

  /*Add all JS elements to DOM*/
  snowcrypt_replylabel.append(snowcrypt_replybutton);
  snowcrypt_invitelabel.append(snowcrypt_invitebutton);
  snowcrypt_textarea_container.append(snowcrypt_textarea);
  snowcrypt_textarea_container.append(snowcrypt_invitelabel);
  snowcrypt_textarea_container.append(snowcrypt_replylabel);
  snowcrypt_messagebox.append(snowcrypt_textarea_container);

  $("div[aria-labelledby='webMessengerHeaderName']").parent().append(snowcrypt_messagebox);
  //snowcrypt_messagebox.after($("#js_p"));

  $(document).on('click', "#snowcrypt_replybutton", function(){
    sendEncryptedMessage($('#snowcrypt_textarea').val());
    $('#snowcrypt_textarea').val("");
  })
}

/*
  Desc:   Toggles whether the "Invite to Snowcrypt!" button should
          appear, or if "Send Encrytped Message" should be displayed
*/
function toggleInvite()
{
  var invite = $("#snowcrypt_invitelabel");
  var send_encrypted_message = $("#snowcrypt_replylabel");
//  var compat = isCompatible();
  getRecipientPublicKey(function(result){
      recipient_public_key = result;
      alert(recipient_public_key);
      console.log("Here is the retrieved public key: " + recipient_public_key);
      if (recipient_public_key != undefined)
      {
        console.log("True from callback");
        invite.hide();
        return true;
      }
      console.log("False from callback");
      send_encrypted_message.hide();
      return false;
  });

}

/*
  Desc:   Replaces the encrypted text with the decrypted text
  Param:  The encrypted text; Note that this should be a jQuery p object
          The corresponding decrypted text; Note that this also has to be a jQuery p object
  Notes:  It is advised to do something to the class of decrypted_text so that a font
          can be applied
*/
function replaceEncryptedText(encrypted_text, decrypted_text)
{
  decrypted_text.attr("class", "snowcrypted");
  var decrypted_text_result = decrypted_text.html();
  encrypted_text.replaceWith(decrypted_text_result);
}
