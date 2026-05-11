buatkan issue.md yang berisi perencanaan untuk nanti di implementasikan oleh junior programmer atau ai model yang lebih murah.

Isi dari planning nya adalah sebagai berikut:

buat tabel users:
id integer auto increment
name varchar 255 not null
email varchar 255 not null
password varchar 255 not null (password merupakan
hash dari bcrypt)
created_at timestamp default current_timestamp

buatkan API untuk registrasi user baru

Endpoint: POST /api/users

Request Body:
{
    "name": "Mevla",
    "email": "Mevla@locahost",
    "password": "rahasia"
}

Response Body (Succees):
{
    "data": "OK"
}
Response Body (Error):
{
    "error": "Email sudah terdaftar"
}

Stuktur Folder di dalam src
- routes ini berisi routing elysia js
- services ini berisi logic bisnis aplikasi

Struktur file
- routes menggunakan format misal users-route.ts
- services: menggunakan format misal users-service.

Jelaskan tahapan-tahapan yang harus dilakukan untuk mengimplementasikan fitur ini, anggap nanti yang mengimplementasikan adalah junior programmer atau model AI yang lebih murah.