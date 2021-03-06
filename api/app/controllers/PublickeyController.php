<?php

class PublickeyController extends BaseController {

	public function post()
	{
		$publickey = Publickey::firstOrNew(array('hashedID' => Input::get('hashedID') ));
		$publickey->hashedID = Input::get('hashedID');
		$publickey->publickey = Input::get('publickey');
		$publickey->save();

		$response = Response::make("OK", 200);
		$response->header('Access-Control-Allow-Origin', '*');
		return $response;
	}

	public function get($hash)
	{
		$return = [];
		if($publickey = Publickey::where('hashedID', '=', $hash)->get() ){
			$return = $publickey;
		}
		$response = Response::make(json_encode($return, JSON_PRETTY_PRINT), 200);
		$response->header('Access-Control-Allow-Origin', '*');

		return $response;
	}

}
