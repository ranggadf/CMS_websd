<<<<<<< HEAD
# 🌿 **Project Loan Origination System (LOS)**

**LOS** adalah aplikasi website untuk sistem manajemen pinjaman yang dirancang dengan frontend Next Js dan backend Laravel. Alur dari aplikasi ini dimulai dengan login user berdasarkan role yang ada atau membuat user baru. 
beberapa role yang ada pada project ini :
=======
# 🌿 **Project CMS WEB SDN 01 MANGUHARJO)**

**=====================**
>>>>>>> b9f3ecc9f9cb1e1f43b5eb8a9f55f49dfc621757
1. Administrator
   ```bash
   email : admin@gmail.com
   password : 1
<<<<<<< HEAD
   ```
3. Approval
   ```bash
   email : approvel1@gmail.com
   password : 1
   ```
5. Marketing
   ```bash
   email : marketing1@gmail.com
   password : 1
   ```
jika membuat user baru maka akan role otomatis ke marketing
admin bisa mengakses semua sidebar
approval hanya bisa akses list pengajuan untuk persetujuan pengajuan
marketing hanya bisa akses input data ke pemohon dan produk/pengajuan

---
=======
   ``
>>>>>>> b9f3ecc9f9cb1e1f43b5eb8a9f55f49dfc621757

## **📌 Teknologi yang Digunakan**

| **Bahasa**        | **Framework/Tools**       | **Versi**        |
|--------------------|---------------------------|------------------|
| -                  | React                    | **18.2.0**       |
| **TypeScript**     | Next.js                  | **13.4.8**       |
| **PHP**            | Laravel                  | **10.48.22**     |
| -                  | MySQL                    | **8.0.30**       |
| -                  | NPM                      | **10.8.1**       |
| -                  | Composer                 | **2.4.1**        |

---

## **📖 Panduan Instalasi**

### **1. Frontend (Next.js)**  
Ikuti langkah-langkah berikut untuk menjalankan aplikasi frontend:  
1. Langkah Pertama clone project dari github dan buka pada text editor
2. Navigasikan ke folder **`losfrontend`**:
   ```bash
<<<<<<< HEAD
   cd losfrontend
=======
   cd frontend
>>>>>>> b9f3ecc9f9cb1e1f43b5eb8a9f55f49dfc621757
   ```  
3. Instal semua dependensi yang diperlukan:  
   ```bash
   npm install
   ```  
4. Jalankan aplikasi frontend:  
   ```bash
   npm run dev
   ```
5. Buka pada browser

### **2. Backend (Laravel)**  
Langkah-langkah untuk mengatur backend menggunakan Laravel:  
1. Navigasikan ke folder backend:  
   ```bash
<<<<<<< HEAD
   cd losbackend
=======
   cd backend
>>>>>>> b9f3ecc9f9cb1e1f43b5eb8a9f55f49dfc621757
   ```  
2. Instal semua dependensi dengan Composer:  
   ```bash
   composer install
   ```
3. Jalankan perintah berikut untuk memuat ulang autoloader:
   ```bash
   composer dump-autoload
   ```
4. Ubah nama file **`.env.example`** menjadi **`.env`**
5. Buat kunci aplikasi:
   ```bash
   php artisan key:generate
   ```  
6. Atur konfigurasi database di file **`.env`**:  
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
<<<<<<< HEAD
   DB_DATABASE=los
   DB_USERNAME=root
   DB_PASSWORD=

   DB_CONNECTION_REAL_LOS=mysql
   DB_HOST_REAL_LOS=127.0.0.1
   DB_PORT_REAL_LOS=3306
   DB_DATABASE_REAL_LOS=real_los
   DB_USERNAME_REAL_LOS=root
   DB_PASSWORD_REAL_LOS=
   ```
7. Jalankan server backend:  
   ```bash
   php artisan serve --host=[ip_address] --port=8000
=======
   DB_DATABASE=websd_mangu
   DB_USERNAME=root
   DB_PASSWORD=

   
   ```
7. Jalankan server backend:  
   ```bash
   php artisan serve 
>>>>>>> b9f3ecc9f9cb1e1f43b5eb8a9f55f49dfc621757
   ```  

---

### **3. Integrasi Backend dengan Frontend**  
Pastikan untuk mengonfigurasi URL backend di file konfigurasi frontend:
1. Buka file api pada folder "/losfrontend/app/api/losbackend/api.tsx"
2. Sesuaikan api backend dengan frontend pada bagian ini
   ```typescript
   const API_URL = "http://[ip_address]:8000/api";
   ```
jika langkah-langkah diikuti dengan benar maka program berhasil dijalankan secara local

## **🚀 Deployment**
### Frontend
```bash
npm run build
```
