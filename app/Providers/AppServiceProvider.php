<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // if APP_ENV=production
        // this will prohibit these commands:
        // db:wipe
        // migrate:fresh
        // migrate:refresh
        // migrate:reset
        DB::prohibitDestructiveCommands($this->app->isProduction());
    }
}
