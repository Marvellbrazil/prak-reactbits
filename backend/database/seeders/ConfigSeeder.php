<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('configs')->insert([
            'id' => 1,
            'competition_name' => 'LINQ Hackathon Singapore',
            'year' => 2027,
            'label_link' => 'Visit our instagram',
            'link' => 'https://instagram.com/skariga_official'
        ]);
    }
}
