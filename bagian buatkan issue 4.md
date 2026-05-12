buatkan issue.md yang berisi perencanaan untuk nanti di implementasikan oleh junior programmer atau ai model yang lebih murah.

Isi dari planning nya adalah sebagai berikut:
buatkan API untuk logout user

Endpoint: DELETE /api/users/logout

Headers:
Authorization: Bearer token (token adalah token yang ada di table users)

Response Body (Succees):
{
    "data": "OK"
}

Jika sukses logout, maka data session dengan token tersebut harus dihapus dari table sessions

Response Body (Error):
{
    "error": "Unauthorized"
}

Stuktur Folder di dalam src

- routes ini berisi routing elysia js
- services ini berisi logic bisnis aplikasi

Struktur file

- routes menggunakan format misal users-route.ts
- services: menggunakan format misal users-service.ts

Jelaskan tahapan-tahapan yang harus dilakukan untuk mengimplementasikan fitur ini, anggap nanti yang mengimplementasikan adalah junior programmer atau model AI yang lebih murah.