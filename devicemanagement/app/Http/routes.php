<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});

Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/home', 'HomeController@index');
});
Route::group(['middleware' => ['auth']], function () {
    Route::post('events/{event}', 'EventsController@update');
    Route::resource('events', 'EventsController');
    Route::get('profiles', 'ProfilesController@index');
    Route::get('profiles/{id}', 'ProfilesController@index')->where('id', '[0-9]+');
    Route::post('profiles/change-user-name', 'ProfilesController@changeUserName');
    Route::post('events/{event}/purchase', 'EventsController@purchase');
    Route::get('profiles/change-password', 'ProfilesController@getChangePassword');
    Route::post('profiles/change-password/{userId}', array('as' => 'profiles.change_password', 'uses' => 'ProfilesController@postChangePassword'));
    Route::post('events/{event}/share', 'EventsController@share');
    Route::post('events/{event}/publish', 'EventsController@publish');
    Route::resource('events/{events}/comments', 'CommentsController', ['only' => ['store', 'destroy']]);
    Route::resource('events/{events}/tags', 'TagsController', ['only' => ['destroy', 'store']]);
    Route::get('events/{events}/real-time-tags', 'TagTypesController@realTimeTag');

    //Define route admin for K2xSax Website
    Route::group(['namespace' => 'Admin', 'prefix' => 'admin'], function() {
        Route::resource('dashboard', 'DashboardController', ['only' => ['index']]);
        Route::resource('master-tag', 'MasterTagTypesController');
    });
});