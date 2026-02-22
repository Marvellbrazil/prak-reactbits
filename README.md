<!DOCTYPE html>

<style>
    .get {
        color: lightgreen;
    }

    .post {
        color: lightskyblue;
    }

    .put, .patch {
        color: lightsalmon;
    }

    .delete {
        color: lightcoral;
    }
</style>

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
cp .env.example
composer install
php artisan key:generate --ansi
php artisan migrate --seed

# Run API server
php artisan serve
```

<code>"Don't forget to setup and adjust your .env to ensure the applications run fully-functional"</code>

---

<h1 align="start">API Endpoints</h1>

### Config
<table>
    <thead>
        <th>Name</th>
        <th>Method</th>
        <th>Route</th>
    </thead>
    <tbody>
        <tr>
            <td>Index</td>
            <td><code class="get">GET</code></td>
            <td><code>/config</code></td>
        </tr>
        <tr>
            <td>Show</td>
            <td><code class="put">PUT</code></td>
            <td><code>/config/{config}</code></td>
        </tr>
    </tbody>
</table>

### Team
<table>
    <thead>
        <th>Name</th>
        <th>Method</th>
        <th>Endpoint</th>
    </thead>
    <tbody>
        <tr>
            <td>Index</td>
            <td><code class="get">GET</code></td>
            <td><code>/teams</code></td>
        </tr>
        <tr>
            <td>Show</td>
            <td><code class="get">GET</code></td>
            <td><code>/teams/{team}</code></td>
        </tr>
        <tr>
            <td>Store</td>
            <td><code class="post">POST</code></td>
            <td><code>/teams</code></td>
        </tr>
        <tr>
            <td>Update</td>
            <td><code class="put">PUT</code></td>
            <td><code>/teams/{team}</code></td>
        </tr>
        <tr>
            <td>Destroy</td>
            <td><code class="delete">DELETE</code></td>
            <td><code>/teams/{team}</code></td>
        </tr>
    </tbody>
</table>

### Team Member
<table>
    <thead>
        <th>Name</th>
        <th>Method</th>
        <th>Endpoint</th>
    </thead>
    <tbody>
        <tr>
            <td>Index</td>
            <td><code class="get">GET</code></td>
            <td><code>/members</code></td>
        </tr>
        <tr>
            <td>Show</td>
            <td><code class="get">GET</code></td>
            <td><code>/members/{member}</code></td>
        </tr>
        <tr>
            <td>Store</td>
            <td><code class="post">POST</code></td>
            <td><code>/members</code></td>
        </tr>
        <tr>
            <td>Update</td>
            <td><code class="put">PUT</code></td>
            <td><code>/members/{member}</code></td>
        </tr>
        <tr>
            <td>Destroy</td>
            <td><code class="delete">DELETE</code></td>
            <td><code>/members/{member}</code></td>
        </tr>
    </tbody>
</table>