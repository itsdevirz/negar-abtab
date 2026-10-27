# راهنمای کامل استقرار (Deployment Guide)
## شرکت نگار آبتاب آبانگاه

این پروژه به‌صورت **کاملاً مجزا (Decoupled)** طراحی شده است تا فرانت‌اند به راحتی روی **هاست استاتیک (public_html)** قرار گیرد و بخش پردازش بکند روی **سرور مجزا با آدرس آی‌پی 141.11.32.127** اجرا شود.

---

## ۱. ساختار معماری پروژه

1. **فرانت‌اند (Frontend - React Vite SPA)**
   - خروجی استاتیک در پوشه `dist` تولید می‌شود که شامل فایل‌های HTML, JS, CSS و دارایی‌ها می‌باشد.
   - کلیه درخواست‌های پردازش به آدرس بکند `http://141.11.32.127:5000` (یا `3000`) ارسال می‌شوند.
   - آپلود فایل‌های ویدئویی به صورت فایل Blobs مستقیم در هاست (مرورگر/محیط استاتیک) ذخیره می‌شود تا سرور بکند سنگین نشود.

2. **بکند (Backend - Express Node.js Server)**
   - در پوشه `/backend` قرار دارد و روی آی‌پی `141.11.32.127` پورت `5000` اجرا می‌شود.
   - مسئول احراز هویت ادمین (`You` / `You1431569@`)، ذخیره متادیتا و پاسخ به درخواست‌های REST API است.

---

## ۲. مراحل قرار دادن فرانت‌اند روی هاست استاتیک (public_html)

1. دستور زیر را برای ساخت نسخه خروجی اجرا کنید:
   ```bash
   npm run build
   ```
2. محتویات پوشه `dist` که شامل فایل `index.html` و پوشه `assets` است را کپی کرده و در پوشه `public_html` هاست استاتیک خود آپلود کنید.
3. فایل `.htaccess` زیر را در پوشه `public_html` قرار دهید تا تمام مسیرهای SPA (مانند `/admin`, `/services`, `/projects`) به `index.html` هدایت شوند:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## ۳. مراحل راه‌اندازی بکند روی سرور (141.11.32.127)

1. پوشه `/backend` را روی سرور منتقل کنید.
2. بسته‌ها را روی سرور نصب کنید:
   ```bash
   cd backend
   npm install express cors
   ```
3. بکند را با `pm2` به صورت همیشگی اجرا کنید:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "negar-backend"
   pm2 save
   ```

---

## ۴. پیکربندی Nginx روی سرور (141.11.32.127)

فایل کانفیگ Nginx زیر را در `/etc/nginx/sites-available/negar-backend` قرار داده و فعال کنید:

```nginx
server {
    listen 80;
    server_name 141.11.32.127;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # CORS Headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}
```

---

## ۵. مشخصات پیش‌فرض پنل مدیریت
- **آدرس:** `http://your-domain.ir/admin`
- **نام کاربری:** `You`
- **رمز عبور:** `You1431569@`
