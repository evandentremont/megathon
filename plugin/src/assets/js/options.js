$(window).load(function(){
   createNewKeyPair();
   getUserPublicKey(function(key){
     $("#public_key").text(key);
   });
   getPassPhrase(function(passPhrase){
     $("#private_key").val(passPhrase);
   });

var publicKey;
var publicKey;

    $('#private_key').on({
       keypress: function () {

         privateKey = cryptico.generateRSAKey($('#private_key').val(), 512);
         publicKey = cryptico.publicKeyString(privateKey);

         $("#public_key").text(publicKey);
       }
    });




});
