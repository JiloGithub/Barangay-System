<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="icon" type="image/svg+xml"
        href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='44' fill='%23ffffff' stroke='%23000000' stroke-width='8' /%3E%3Ctext x='50' y='50' font-family='system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' font-weight='bold' font-size='58' text-anchor='middle' dominant-baseline='central' fill='%23000000'%3EB%3C/text%3E%3C/svg%3E">
    <title>{{ config('app.name') }}</title>

    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
    @inertiaHead

</head>

<body>
    @inertia
</body>

</html>
