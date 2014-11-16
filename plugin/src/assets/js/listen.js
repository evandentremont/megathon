/*
  Desc:   Listens for a change in where the FB instant messages appear
          (on the FB messenger page)
  Param:    The instant message count
  Return:   The new instant message count
*/
function messageCount()
{
  return $(".webMessengerMessageGroup").length;
  /*
  $(".webMessengerMessageGroup").find('p.snowcrypt').livequery(function () {
    //$("#statusBar").text('You may now remove items.');
    console.log("You have sent/recieved an encrypted message");
  });
  /*
  $(document).on('DOMNodeInserted', function(e) {
    if (e.target.class == 'snowcrypted') {
       //alert("Added this element: " + e.target);
       console.log("A new element has been added to the DOM!");
    }

  });*/
  //uiScrollableAreaWrap.scrollable
}
