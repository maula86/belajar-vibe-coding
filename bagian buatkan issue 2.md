buatkan issue.md yang berisi perencanaan untuk nanti di implementasikan oleh junior programmer atau ai model yang lebih murah.

Isi dari planning nya adalah sebagai berikut:

buat tabel sessions:
id integer auto increment
token varchar 255 not null (isinya UUID untuk token user yang login)
user_id integer not null (foreign key ke tabel users)
created_at timestamp default current_timestamp

buatkan API untuk login user

Endpoint: POST /api/users/login

Request Body:
{
    "email": "Mevla@locahost",
    "password": "rahasia"
}

Response Body (Succees):
{
    "data": "token"
}
Response Body (Error):
{
    "error": "Email atau password salah"
}

Stuktur Folder di dalam src
- routes ini berisi routing elysia js
- services ini berisi logic bisnis aplikasi

Struktur file
- routes menggunakan format misal users-route.ts
- services: menggunakan format misal users-service.

Jelaskan tahapan-tahapan yang harus dilakukan untuk mengimplementasikan fitur ini, anggap nanti yang mengimplementasikan adalah junior programmer atau model AI yang lebih murah.