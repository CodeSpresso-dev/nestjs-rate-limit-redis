# 🚀 NestJS Rate Limiting with Redis

این پروژه یک نمونه‌ی کامل از **Rate Limiting در NestJS** است که با استفاده از 
`@nestjs/throttler`  
و  
`@nest-lab/throttler-storage-redis`  
پیاده‌سازی شده و برای ذخیره‌سازی محدودیت‌ها (throttle records) از **Redis** استفاده می‌کند.

این معماری باعث می‌شود:
- درخواست‌ها به‌صورت **Distributed Rate Limit** کنترل شوند
- پروژه در محیط‌های **Load Balanced** و **Microservices** بدون مشکل مقیاس‌پذیر باشد
- داده‌ها روی Redis نگهداری شده و مدیریت rate limit کاملاً پایدار و سریع باشد.

---

## 📦 Packages Used

پکیج‌های مرتبط با rate-limit:

```bash
npm i @nestjs/throttler
npm i @nest-lab/throttler-storage-redis
