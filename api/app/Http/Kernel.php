<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        \Illuminate\Http\Middleware\HandleCors::class, // Middleware CORS
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \Fruitcake\Cors\HandleCors::class,
    ];
}