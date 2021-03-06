/*
   Desc:   Loops through all messages displayed in the browser
           between you and your friend and decrypts them
*/
function decryptMessages()
{
  getPrivateKey(function(key){

    var observable = document.getElementById('observable');




    $("li.webMessengerMessageGroup").each(function()
    {

      var search = $(this).find($("a[data-hovercard^='/ajax/hovercard/hovercard.php?id=']"));
      var searchString = search.attr("data-hovercard");
      var offsetFilter = "id=";
      var cutoffFilter = "&";
      var offset = searchString.indexOf(offsetFilter) + offsetFilter.length;
      var cutoff = searchString.indexOf(cutoffFilter);
      var id = searchString.substr(offset, cutoff-offset);
      //Wait for the DOM to load due to the lengths of FB chat


          var encry_paragraph_search = search.parent().parent().find("._38.direction_ltr p").not("p.snowcrypted").each(function(){
            var encry_paragraph = $(this).text();
            $this = $(this);
            if (id == getUserID())   //You have sent this message
            {

              displaySent(encry_paragraph, key, function(result){
                  //console.log(result);
                  replaceEncryptedText($this, $(result));

              })
            }
            else //You have recieved this message
            {

              displayRecieved(encry_paragraph, key, function(result){
                  //console.log(result);
                  replaceEncryptedText($this, $(result));
              })
            }
          });

      });
    });

}

/*
  Desc:   Displays the sent part of the unencrypted message
  Param:  The encrypted paragraph duo (string)
  Return: The sent paragraph
*/
function displayRecieved(paragraph, key, cb)
{
  //Parse until an exclamation mark is reached
  paragraph.replace(/(\r\n|\n|\r)/gm,"");
  var splitpos = paragraph.indexOf('!');
  if(strpos("This message is encrypted with snowcrypt")){
    var received_paragraph = paragraph.substr(41, splitpos-41);
    var decrypted = cryptico.decrypt(received_paragraph, key);
    if(decrypted.status =="success"){
      cb("<p class='snowcrypted'>"+decrypted.plaintext+"<small> ("+decrypted.signature+")</small></p>");
    }
    else cb("<p>Wrong Passkey!</p>");
  }
  else cb("<p>"+paragraph+"</p>");
}

/*
  Desc:   Displays the sent part of the unencrypted message
  Param:  The encrypted paragraph duo (string)
  Return: The sent paragraph
*/
function displaySent(paragraph, key, cb)
{
//Parse until an exclamation mark is reached
  paragraph.replace(/(\r\n|\n|\r)/gm,"");

  var splitpos = paragraph.indexOf('!');
  if(strpos("This message is encrypted with snowcrypt")){
    var sent_paragraph = paragraph.substr(splitpos+1, paragraph.length - splitpos);
    var decrypted = cryptico.decrypt(sent_paragraph, key);
    if(decrypted.status =="success"){
      cb("<p class='snowcrypted'>"+decrypted.plaintext+"<small> ("+decrypted.signature+")</small></p>");
    }
    else cb("<p>Wrong Passkey!</p>");

  }
  else cb("<p>"+paragraph+"</p>");
}
