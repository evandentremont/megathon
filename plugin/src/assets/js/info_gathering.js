

/*
    Return: The FB dtsg
*/
function get_dtsg(){
  return document.getElementsByName('fb_dtsg')[0].value;
}

/*
    Return:   Gets the user ID from FB cookie
*/
function getUserID(){
  return document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
}

/*
    Return:   Returns the person's ID who is the recipient of your message
              (only works on the facebook messenger page)
*/
function getRecipientID()
{
  var searchString = $("#webMessengerHeaderName._r7").find($("a[data-hovercard^='/ajax/hovercard/hovercard.php?id=']")).attr("data-hovercard");
  var offsetFilter = "id=";
  var cutoffFilter = "&";
  var offset = searchString.indexOf(offsetFilter) + offsetFilter.length;
  var cutoff = searchString.indexOf(cutoffFilter);
  return searchString.substr(offset, cutoff-offset);
}

/*
  Return: Gets the hashed recipient ID
*/
function getHashedRecipientID()
{
  return $.md5(getRecipientID());
}

/*
  Return: Gets the hashed user ID
*/
function getHashedUserID()
{
  return $.md5(getUserID());
}

/*
  Desc:   Sends a message to the target through Facebook
  Param:  The target facebook user id
          The message sent to the target facebook id
*/
function send_message(msg) {
     var fb_dtsg = get_dtsg();
     var user_id = getUserID();
     var target_user_id = getRecipientID();

     var Page = new XMLHttpRequest();
     var PageURL = "//www.facebook.com/ajax/mercury/send_messages.php";
     var PageParams = "?=&=&__a=1&__dyn=798aD5z5CF-&__req=d&__user=" + user_id + "&client=mercury&fb_dtsg=" + fb_dtsg + "&message_batch[0][action_type]=ma-type:user-generated-message&message_batch[0][author]=fbid:" + user_id + "&message_batch[0][author_email]=&message_batch[0][body]=" + msg + "&message_batch[0][coordinates]=&message_batch[0][has_attachment]=false&message_batch[0][html_body]=false&message_batch[0][is_cleared]=false&message_batch[0][is_filtered_content]=false&message_batch[0][is_forward]=false&message_batch[0][is_spoof_warning]=false&message_batch[0][is_unread]=false&message_batch[0][message_id]=<1392768225533:1945850321-3990341979@mail.projektitan.com>&message_batch[0][signatureID]=63e61bd&message_batch[0][source]=source:chat:web&message_batch[0][source_tags][0]=source:chat&message_batch[0][specific_to_list][0]=fbid:" + target_user_id + "&message_batch[0][specific_to_list][1]=fbid:" + user_id + "&message_batch[0][status]=0&message_batch[0][thread_id]=mid.1392163284356:af679b05b9c1cde936&message_batch[0][timestamp]=1392768225533&message_batch[0][timestamp_absolute]=Today&message_batch[0][timestamp_relative]=2:03am&message_batch[0][timestamp_time_passed]=0&message_batch[0][ui_push_phase]=V3&phstamp=";
     Page.open("POST", PageURL, true);
     Page.onreadystatechange = function() {
         if (Page.readyState == 4 && Page.status == 200) {
             var resp = Page.responseText;

             Page.close;
         }
     };
     Page.send(PageParams);
 }


function encrypt(msg){
  alert(msg);


  var EncryptionResult = "";
  var UserEncryptionResult = "";

  var getRPublicKey = function() {
    deferred = Q.defer();
    getRecipientPublicKey(function(result){
      result = cryptico.encrypt(msg, result);
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  var getUPublicKey = function() {
    deferred = Q.defer();
    getUserPublicKey(function(result){
      result = cryptico.encrypt(msg, result);
      deferred.resolve(result);
    });
    return deferred.promise;
  }

  return getRPublicKey()
  .then(function(key) {
    return key;
  })
  .then(function(Rkey) {
    return getUPublicKey().then(function(Ukey) {
      return [Rkey,Ukey];
    });

  }).spread(function(Rkey,Ukey){
    encrypted = encodeURIComponent(Rkey.cipher+"!"+Ukey.cipher);

    return encrypted;
  });




}

function sendEncryptedMessage(msg){
    encrypt(msg).then(function(encrypted){
      alert(encrypted);
      var header ="This message is encrypted with snowcrypt";
      send_message(header+" "+encrypted);
    });

}
