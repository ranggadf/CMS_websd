# 🌿 **Project CMS WEB SDN 01 MANGUHARJO)**

**=====================**
1. Administrator
   ```bash
   email : admin@gmail.com
   password : 1
   ``

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
   cd frontend
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
   cd backend
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
   DB_DATABASE=websd_mangu
   DB_USERNAME=root
   DB_PASSWORD=

   
   ```
7. Jalankan server backend:  
   ```bash
   php artisan serve 
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
