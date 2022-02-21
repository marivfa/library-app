# Frontend

cd/library-app

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# BackEnd

install xammp v3.3.0
PHP Version 7.2.3
Laravel Version 8.83.1

After install, put the library-api inside your htdocs folder

Before to run

# Create Database

File .env set up the following variables
DB_PORT=3307
DB_DATABASE=db_library
DB_USERNAME=root
DB_PASSWORD=

Create database db_library

# Migrate

php artisan migrate

# Data dummy

php artisan tinker
App\Models\Categoy::factory()->count(20)->create();
App\Models\Book::factory()->count(50)->create();

# Run

php artisan serve
