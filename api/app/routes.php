<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::post('/keys', array('uses' => 'PublickeyController@post'));

Route::get('/keys/{hash}', array('uses' => 'PublickeyController@get'));

