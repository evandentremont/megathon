/*
   Desc:   Loops through all messages displayed in the browser
           between you and your friend and decrypts them
*/
function decryptMessages()
{
  getPrivateKey(function(key){


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


          var encry_paragraph_search = search.parent().parent().find("._38.direction_ltr p").each(function(){
            var encry_paragraph = $(this).text();
            $this = $(this);
            if (id == getUserID())   //You have sent this message
            {

              displaySent(encry_paragraph, key, function(result){
                  console.log(result);
                  replaceEncryptedText($this, $("<p>"+result+"</p>"));

              })
            }
            else //You have recieved this message
            {

              displayRecieved(encry_paragraph, key, function(result){
                  console.log(result);
                  replaceEncryptedText($this, $("<p>"+result+"</p>"));
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
  if(splitpos){
    var received_paragraph = paragraph.substr(41, splitpos-41);
    var decrypted = cryptico.decrypt(received_paragraph, key);
    cb(decrypted.plaintext);
  }
  else cb("");
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
  if(splitpos){
    var sent_paragraph = paragraph.substr(splitpos+1, paragraph.length - splitpos);
    var decrypted = cryptico.decrypt(sent_paragraph, key);
    cb(decrypted.plaintext);
  }
  else cb("");
}
