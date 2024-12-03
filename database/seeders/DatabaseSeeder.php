<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $commenterRole = Role::create(['name' => RolesEnum::Commenter->value]);

        $userRole = Role::create(['name' => RolesEnum::User->value]);

        $manageFeaturesPermissions = Permission::create([
            'name' => PermissionsEnum::ManageFeatures->value
        ]);

        $manageUsersPermissions = Permission::create([
            'name' => PermissionsEnum::ManageUsers->value
        ]);

        $manageCommentPermissions = Permission::create([
            'name' => PermissionsEnum::ManageComments->value
        ]);

        $votePermissions = Permission::create([
            'name' => PermissionsEnum::UpvoteDownvote->value
        ]);

        $userRole->syncPermissions([$votePermissions]);

        $commenterRole->syncPermissions([
            $votePermissions,
            $manageCommentPermissions
        ]);

        $adminRole->syncPermissions([
            $votePermissions,
            $manageCommentPermissions,
            $manageFeaturesPermissions,
            $manageUsersPermissions
        ]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
        ])->assignRole(RolesEnum::User);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);

        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'commenter@example.com',
        ])->assignRole(RolesEnum::Commenter);
    }
}
