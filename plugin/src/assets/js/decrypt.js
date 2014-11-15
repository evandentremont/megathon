/*
   Desc:   Loops through all messages displayed in the browser
           between you and your friend and decrypts them
*/
function decryptMessages()
{
  console.log("Searching Message...");
  $("li.webMessengerMessageGroup").each(function(i, val)
  {

    var search = $(this).find($("a[data-hovercard^='/ajax/hovercard/hovercard.php?id=']"));
    var searchString = search.attr("data-hovercard");
    var offsetFilter = "id=";
    var cutoffFilter = "&";
    var offset = searchString.indexOf(offsetFilter) + offsetFilter.length;
    var cutoff = searchString.indexOf(cutoffFilter);
    var id = searchString.substr(offset, cutoff-offset);

    //Wait for the DOM to load due to the lengths of FB chat
    $(function(){
        var encry_paragraph_search = search.parent().parent().find("._38.direction_ltr p").each(function(){
          var encry_paragraph = $(this).text();
          if (id == getUserID())   //You have sent this message
          {
            console.log(displaySent(encry_paragraph));
            console.log("Message " + i + " belongs to me");
          }
          else //You have recieved this message
          {
            console.log(displayRecieved(encry_paragraph));
            console.log("Message " + i + " does not belong to me");
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
function displaySent(paragraph)
{
  //Parse until an exclamation mark is reached
  var sent_paragraph = paragraph.substr(0, paragraph.indexOf('!'));
  return sent_paragraph;
}

/*
  Desc:   Displays the sent part of the unencrypted message
  Param:  The encrypted paragraph duo (string)
  Return: The sent paragraph
*/
function displayRecieved(paragraph)
{
  //Parse from the exclamation mark until the end of the paragraph
  var recieved_paragraph = paragraph.substr(paragraph.indexOf('!') + 1, paragraph.length);
  return recieved_paragraph;
}
