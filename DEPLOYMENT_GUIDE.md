# راهنمای استقرار و رفع اشکال کامل (Deployment & Troubleshooting)
## شرکت نگار آبتاب آبانگاه

---

## ۱. حل مشکل عدم دسترسی به بکند روی پورت ۵۰۰۰ سرور (141.11.32.127:5000)

### علت مشکل:
در Node.js اگر پورت بدون مشخص کردن آی‌پی `0.0.0.0` لیسن شود، فقط روی `127.0.0.1` (Localhost) گوش می‌دهد و درخواست‌های مستقیم از بیرون به آی‌پی عمومی سرور مسدود می‌گردند.

### تغییرات اعمال‌شده:
سرور Express به‌روزرسانی شد تا روی تمام اینترفیس‌ها (`0.0.0.0`) بشنود:
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Express Backend listening on 0.0.0.0:${PORT}`);
});
```

### دستور اجرای بکند روی سرور:
1. وارد پوشه `backend` شوید:
   ```bash
   cd backend
   ```
2. بکند را اجرا کنید:
   ```bash
   node server.js
   ```
   یا برای اجرای همیشگی با PM2:
   ```bash
   pm2 start server.js --name "negar-backend"
   ```
3. باز کردن پورت در فایروال سرور لینوکس:
   ```bash
   sudo ufw allow 5000/tcp
   sudo ufw reload
   ```
4. اکنون اگر آدرس زیر را در مرورگر باز کنید، صفحه تأیید سلامت سرور نمایش داده می‌شود:
   `http://141.11.32.127:5000/`

---

## ۲. حل ارور 404 (Not Found) در روت /admin هاست استاتیک (public_html)

### علت مشکل:
در برنامه‌های Single Page Application (SPA) مانند React Router، وب‌سرورهای هاست استاتیک (Apache / cPanel) هنگام باز شدن مستقیم مسیرهای فرعی مثل `/admin` به دنبال پوشه فیزیکی می‌گردند و ارور 404 می‌دهند.

### حل مشکل:
فایل `.htaccess` استاندارد به پوشه `/public` افزوده شد. هنگام اجرای `npm run build` این فایل به‌صورت خودکار درون پوشه `dist` قرار می‌گیرد.

**محتوای `.htaccess` درون `dist` / `public_html`:**
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

**اقدام شما:**
کافیست تمام محتویات پوشه `dist` (از جمله فایل مخفی `.htaccess`) را درون `public_html` آپلود کنید.

---

## ۳. حل مشکل عدم لود فونت‌های فارسی روی هاست

### علت مشکل:
فونت استاندارد فارسی Vazirmatn در فایل‌های اصلی CSS فراخوانی نشده بود.

### تغییرات اعمال‌شده:
فونت استاندارد **وزیرمتن (Vazirmatn)** از طریق CDNهای معتبر و امن HTTPS (`Google Fonts` + `jsDelivr`) به `index.html` و `src/index.css` اضافه شد.

با ساخت مجدد نسخه بیلد (`npm run build`) فونت‌ها به‌صورت خودکار در تمام دستگاه‌ها و هاست‌ها بدون مشکل بارگذاری می‌شوند.

---

## ۴. دستورات ساخت نسخه نهایی

```bash
# ۱. ساخت نسخه فرانت‌اند
npm run build

# ۲. محتویات پوشه dist را روی public_html هاست آپلود کنید.
# ۳. پوشه backend را روی سرور 141.11.32.127 منتقل و اجرا کنید.
```

### مشخصات پیش‌فرض پنل مدیریت:
- **آدرس:** `http://your-domain.ir/admin`
- **نام کاربری:** `You`
- **رمز عبور:** `You1431569@`
