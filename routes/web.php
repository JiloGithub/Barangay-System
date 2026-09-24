<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome');
});



Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });

    Route::get('/residents', function () {
        return Inertia::render('Resident');
    });

    Route::get('/example', function () {
        return Inertia::render('Example');
    });


});
