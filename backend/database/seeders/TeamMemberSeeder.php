<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('team_members')->insert([
            ['id' => 7, 'team_id' => 7, 'name' => 'M. Bahruddin Nauvaldy Maulana', 'role' => 'Developer Operations', 'image' => '1770981492_698f08748c79d.jpeg', 'created_at' => '2026-02-13 11:18:12', 'updated_at' => '2026-02-13 11:18:12'],
            ['id' => 8, 'team_id' => 7, 'name' => 'Gamaliel Andika Aprilian', 'role' => 'System Administrator', 'image' => '1770981527_698f0897340b2.jpg', 'created_at' => '2026-02-13 11:18:47', 'updated_at' => '2026-02-13 11:18:47'],
            ['id' => 9, 'team_id' => 7, 'name' => 'Zulfan Maulana Ahmad', 'role' => 'Digital Marketing', 'image' => '1770981587_698f08d32c0eb.jpg', 'created_at' => '2026-02-13 11:19:47', 'updated_at' => '2026-02-13 11:19:47'],
            ['id' => 10, 'team_id' => 7, 'name' => 'Marvello Faisal', 'role' => 'Copywriter', 'image' => '1770981615_698f08ef014e6.jpg', 'created_at' => '2026-02-13 11:20:15', 'updated_at' => '2026-02-13 11:20:15'],
            ['id' => 11, 'team_id' => 7, 'name' => 'Agniya Rahmah Qurril A\'in', 'role' => 'UI/UX Designer', 'image' => '1770981674_698f092a1d757.jpg', 'created_at' => '2026-02-13 11:21:14', 'updated_at' => '2026-02-13 11:21:14'],
            ['id' => 12, 'team_id' => 2, 'name' => 'John Doe', 'role' => 'AI/ML Engineer', 'image' => '1770982441_698f0c29b39da.jpg', 'created_at' => '2026-02-13 11:34:01', 'updated_at' => '2026-02-13 11:34:01'],
            ['id' => 13, 'team_id' => 2, 'name' => 'Sarah Browning', 'role' => 'Cyber Security Expert', 'image' => '1770982495_698f0c5f33d53.jpg', 'created_at' => '2026-02-13 11:34:55', 'updated_at' => '2026-02-13 11:34:55'],
            ['id' => 14, 'team_id' => 2, 'name' => 'Tom Clappins', 'role' => 'Senior Website Developer', 'image' => '1770982531_698f0c83d6301.jpg', 'created_at' => '2026-02-13 11:35:31', 'updated_at' => '2026-02-13 11:35:31'],
            ['id' => 19, 'team_id' => 2, 'name' => 'Jeff Bezzeroy', 'role' => 'IT Infrastructure Manager', 'image' => '1771046730_6990074a44b2c.png', 'created_at' => '2026-02-14 05:25:30', 'updated_at' => '2026-02-14 05:25:30'],
            ['id' => 15, 'team_id' => 8, 'name' => 'Shyanne Kassey Doanne', 'role' => 'IT Support', 'image' => '1770982597_698f0cc5c1858.jpg', 'created_at' => '2026-02-13 11:36:37', 'updated_at' => '2026-02-13 11:36:37'],
            ['id' => 16, 'team_id' => 8, 'name' => 'Tim Saint-Peterson', 'role' => 'Data Analyst', 'image' => '1770982645_698f0cf57f649.jpg', 'created_at' => '2026-02-13 11:37:25', 'updated_at' => '2026-02-13 11:37:25'],
            ['id' => 17, 'team_id' => 8, 'name' => 'Coleman Ross Atkins', 'role' => 'Mobile Developer', 'image' => '1770982768_698f0d706501b.jpg', 'created_at' => '2026-02-13 11:39:28', 'updated_at' => '2026-02-13 11:39:28'],
            ['id' => 18, 'team_id' => 8, 'name' => 'Drough Toughman Robertson', 'role' => 'Python Data Scientist', 'image' => '1770982832_698f0db0466ed.jpeg', 'created_at' => '2026-02-13 11:40:32', 'updated_at' => '2026-02-13 11:40:32'],
            ['id' => 20, 'team_id' => 3, 'name' => 'Tavel Davis DaShawn', 'role' => 'Chief Technology Officer', 'image' => '1771046873_699007d948ba9.jpg', 'created_at' => '2026-02-14 05:27:53', 'updated_at' => '2026-02-14 05:27:53'],
            ['id' => 21, 'team_id' => 3, 'name' => 'Ayesha Sales', 'role' => 'Technical Writer', 'image' => '1771046917_6990080552c27.jpg', 'created_at' => '2026-02-14 05:28:37', 'updated_at' => '2026-02-14 05:28:37'],
            ['id' => 22, 'team_id' => 3, 'name' => 'Mia Leslie McCreary', 'role' => 'Fullstack Developer', 'image' => '1771046972_6990083c41a92.jpg', 'created_at' => '2026-02-14 05:29:32', 'updated_at' => '2026-02-14 05:29:32'],
            ['id' => 23, 'team_id' => 6, 'name' => 'Terry A. Davis', 'role' => 'IT Chief', 'image' => '1771071365_6990678597ffa.jpeg', 'created_at' => '2026-02-14 12:16:05', 'updated_at' => '2026-02-14 12:16:05'],
            ['id' => 25, 'team_id' => 6, 'name' => 'Linus Torvalds', 'role' => 'Principal Fellow', 'image' => '1771680453_6999b2c5c4184.png', 'created_at' => '2026-02-21 13:27:34', 'updated_at' => '2026-02-21 13:27:34'],
            ['id' => 32, 'team_id' => 11, 'name' => 'Ellen Joe', 'role' => 'Mobile Developer', 'image' => '1771714999_699a39b726b10.jpg', 'created_at' => '2026-02-21 23:03:19', 'updated_at' => '2026-02-21 23:03:19'],
            ['id' => 34, 'team_id' => 11, 'name' => 'Jane Doe', 'role' => 'Backend Developer', 'image' => '1771725597_699a631dbeb98.png', 'created_at' => '2026-02-22 01:59:57', 'updated_at' => '2026-02-22 01:59:57'],
            ['id' => 39, 'team_id' => 11, 'name' => 'Belle', 'role' => 'Frontend Developer', 'image' => '1771726373_699a662597490.jpg', 'created_at' => '2026-02-22 02:12:53', 'updated_at' => '2026-02-22 02:12:53'],
            ['id' => 35, 'team_id' => 23, 'name' => 'Hitori Gotoh', 'role' => 'Frontend Developer', 'image' => '1771726240_699a65a0ae983.jpg', 'created_at' => '2026-02-22 02:10:40', 'updated_at' => '2026-02-22 02:10:40'],
            ['id' => 36, 'team_id' => 23, 'name' => 'Nijika Ijichi', 'role' => 'Project Manager', 'image' => '1771726301_699a65ddde649.jpg', 'created_at' => '2026-02-22 02:11:41', 'updated_at' => '2026-02-22 02:11:41'],
            ['id' => 37, 'team_id' => 23, 'name' => 'Ikuyo Kita', 'role' => 'UI/UX Designer', 'image' => '1771726327_699a65f7c00a1.jpg', 'created_at' => '2026-02-22 02:12:07', 'updated_at' => '2026-02-22 02:12:07'],
            ['id' => 38, 'team_id' => 23, 'name' => 'Ryo Yamada', 'role' => 'Backend Developer', 'image' => '1771726346_699a660a8189f.jpg', 'created_at' => '2026-02-22 02:12:26', 'updated_at' => '2026-02-22 02:12:26'],
            ['id' => 40, 'team_id' => 6, 'name' => 'Steve Jobs', 'role' => 'Senior Entrepreneurship Expert', 'image' => '1772423817_69a50a892dcd1.png', 'created_at' => '2026-03-02 03:56:57', 'updated_at' => '2026-03-02 03:56:57'],
        ]);
    }
}
