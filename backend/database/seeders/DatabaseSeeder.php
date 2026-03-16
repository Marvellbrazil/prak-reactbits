<?php

namespace Database\Seeders;

// use App\Models\Auth\User;
use Database\Seeders\ConfigSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::statement('TRUNCATE TABLE team_members CASCADE');
        DB::statement('TRUNCATE TABLE teams CASCADE');
        DB::statement('TRUNCATE TABLE users CASCADE');

        $this->call([
            ConfigSeeder::class,
            TeamSeeder::class,
            TeamMemberSeeder::class,
        ]);

        $tables = ['teams', 'team_members', 'users'];

        foreach ($tables as $table) {
            DB::statement("
                SELECT setval(
                    pg_get_serial_sequence('$table', 'id'),
                    COALESCE((SELECT MAX(id) FROM $table), 1)
                )
            ");
        }
    }
}
