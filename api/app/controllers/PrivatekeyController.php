<?php

class PrivatekeyController extends BaseController {

	public function post($hash, $key)
	{
		$privatekey = new Privatekey;
		$privatekey->hashedID = $hash;
		$privatekey->privatekey = $key;
		$privatekey->save();
	}
	
	public function get($hash)
	{
		$return = [];
		if($privatekey = Privatekey::find($hash)){
			$return = $privatekey;
		}
		$repsonse = Response::make(json_encode($return, JSON_PRETTY_PRINT), 200);
		$response->header('Access-Control-Allow-Origin', '*');
		return $response;
	}
	

}
