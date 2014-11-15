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

  var snowcrypt_textarea = $('<textarea/>');
  snowcrypt_textarea.attr("id", "snowcrypt_textarea");

  var snowcrypt_replybutton = $('<input/>', {
    id: "snowcrypt_replybutton",
    type: "button",
    value: "Encrypted Reply"
  });

  var snowcrypt_invitebutton = $('<input/>', {
    id: "snowcrypt_invitebutton",
    type: "button",
    value: "Invite to Snowcrypt"
  });

  /*Add all JS elements to DOM*/
  snowcrypt_textarea_container.append(snowcrypt_textarea);
  snowcrypt_textarea_container.append(snowcrypt_replybutton);
  snowcrypt_messagebox.append(snowcrypt_invitebutton);
  snowcrypt_messagebox.append(snowcrypt_textarea_container);

  snowcrypt_messagebox.after($("#js_p"));
}
