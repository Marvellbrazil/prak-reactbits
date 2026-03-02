<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teams')->insert([
            ['id' => 6, 'name' => 'TIK SKARIGA Jaya', 'created_at' => '2026-02-13 07:02:49', 'updated_at' => '2026-02-13 08:14:35'],
            ['id' => 2, 'name' => 'Inspire Code', 'created_at' => '2026-02-13 04:15:00', 'updated_at' => '2026-02-13 08:16:48'],
            ['id' => 8, 'name' => 'Asynchronous Fighters', 'created_at' => '2026-02-13 07:03:21', 'updated_at' => '2026-02-15 07:33:59'],
            ['id' => 3, 'name' => 'The Overflowers', 'created_at' => '2026-02-13 04:17:42', 'updated_at' => '2026-02-15 07:34:23'],
            ['id' => 7, 'name' => 'SKARIGA CTRL + V', 'created_at' => '2026-02-13 07:03:05', 'updated_at' => '2026-02-15 07:34:54'],
            ['id' => 11, 'name' => 'Zenless Zone Zero', 'created_at' => '2026-02-21 13:36:25', 'updated_at' => '2026-02-22 00:56:47'],
            ['id' => 23, 'name' => 'The Kessoku Coder', 'created_at' => '2026-02-22 02:09:47', 'updated_at' => '2026-02-22 02:14:09'],
        ]);
    }
}
