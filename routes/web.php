<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified', sprintf(
        'role:%s|%s|%s',
        RolesEnum::Admin->value,
        RolesEnum::User->value,
        RolesEnum::Commenter->value
    )])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('/feature', FeatureController::class)
            ->middleware('can:' . PermissionsEnum::ManageFeatures->value)
            ->except(['index', 'show']);

        Route::get('/feature', [FeatureController::class, 'index'])
            ->name('feature.index');

        Route::get('/feature/{feature}', [FeatureController::class, 'show'])
            ->name('feature.show');

        Route::post('/upvote/{feature}', [UpvoteController::class, 'store'])->name('upvote.store');
        Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])->name('upvote.destroy');

        Route::post('/comment/{feature}', [CommentController::class, 'store'])->name('comment.store')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);
        Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);

        Route::middleware(['permission:' . PermissionsEnum::ManageUsers->value])->group(function () {
            Route::get('/user', [UserController::class, 'index'])->name('user.index');
            Route::get('/user/{user}', [UserController::class, 'edit'])->name('user.edit');
            Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
        });
    });
});

require __DIR__ . '/auth.php';
