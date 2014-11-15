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
    id: "snowcrypt_textarea"
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
