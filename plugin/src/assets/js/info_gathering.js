function getRecipientID()
{

}

function getUserID()
{
  //var searchString = $("a.fbxWelcomeBoxName").attr("data-gt");
  var userID = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
  console.log(searchString);
}

/*
<a class="fbxWelcomeBoxName" data-gt="
{&quot;bmid&quot;:1454430259,&quot;count&quot;
  :0,&quot;bookmark_type&quot;:&quot;type_self_timeline&quot;}"
   href="https://www.facebook.com/ItsBrianY">Brian Yip</a>
   */
