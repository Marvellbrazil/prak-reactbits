<h1 align="start">Config Setups</h1>

<code>Database Setup</code>

```sql
CREATE DATABASE prak_reactbits_db;
```

<code>Import Database for PostgreSQL using psql</code>

```terminal
# Make sure that username is correct and database is exists
# And make sure to input the correct password

psql -U username -d database_name -f path/to/your/file.sql
```

<code>Frontend Setup</code>

```terminal
cd frontend
cp .env.example .env
npm install

# Run web server
npm run dev
# For production use this
npm run build
```

<code>Backend Setup</code>

```terminal
cd backend
cp .env.example .env
composer install
php artisan key:generate --ansi
php artisan migrate --seed

# Run API server
php artisan serve
```

<p align="center">> <code>Don't forget to setup and adjust your .env to ensure the applications run fully-functional.</code> <</p>

<br>

<h1 align="start">API Endpoints</h1>

#### Config

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Method</th>
            <th>Route</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Index</td>
            <td><img src="https://img.shields.io/badge/GET-77dd77?style=flat-square" alt="GET"></td>
            <td><code>/config</code></td>
        </tr>
        <tr>
            <td>Update</td>
            <td><img src="https://img.shields.io/badge/PUT-ffb347?style=flat-square" alt="PUT"></td>
            <td><code>/config/{config}</code></td>
        </tr>
    </tbody>
</table>

---

#### Team

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Method</th>
            <th>Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Index</td>
            <td><img src="https://img.shields.io/badge/GET-77dd77?style=flat-square" alt="GET"></td>
            <td><code>/teams</code></td>
        </tr>
        <tr>
            <td>Show</td>
            <td><img src="https://img.shields.io/badge/GET-77dd77?style=flat-square" alt="GET"></td>
            <td><code>/teams/{team}</code></td>
        </tr>
        <tr>
            <td>Store</td>
            <td><img src="https://img.shields.io/badge/POST-87cefa?style=flat-square" alt="POST"></td>
            <td><code>/teams</code></td>
        </tr>
        <tr>
            <td>Update</td>
            <td><img src="https://img.shields.io/badge/PUT-ffb347?style=flat-square" alt="PUT"></td>
            <td><code>/teams/{team}</code></td>
        </tr>
        <tr>
            <td>Destroy</td>
            <td><img src="https://img.shields.io/badge/DELETE-ff6961?style=flat-square" alt="DELETE"></td>
            <td><code>/teams/{team}</code></td>
        </tr>
    </tbody>
</table>

---

#### Team Member

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Method</th>
            <th>Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Index</td>
            <td><img src="https://img.shields.io/badge/GET-77dd77?style=flat-square" alt="GET"></td>
            <td><code>/members</code></td>
        </tr>
        <tr>
            <td>Show</td>
            <td><img src="https://img.shields.io/badge/GET-77dd77?style=flat-square" alt="GET"></td>
            <td><code>/members/{member}</code></td>
        </tr>
        <tr>
            <td>Store</td>
            <td><img src="https://img.shields.io/badge/POST-87cefa?style=flat-square" alt="POST"></td>
            <td><code>/members</code></td>
        </tr>
        <tr>
            <td>Update</td>
            <td><img src="https://img.shields.io/badge/PUT-ffb347?style=flat-square" alt="PUT"></td>
            <td><code>/members/{member}</code></td>
        </tr>
        <tr>
            <td>Destroy</td>
            <td><img src="https://img.shields.io/badge/DELETE-ff6961?style=flat-square" alt="DELETE"></td>
            <td><code>/members/{member}</code></td>
        </tr>
    </tbody>
</table>
