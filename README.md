# การใช้งาน Prisma กับ Mysql ใน Next.js

## เริ่มสร้างโปรเจค Next.js

```bash
npx create-next-app@latest
```

## ติดตั้ง Prisma ในโปรเจค

```bash
npm install prisma --save-dev
npx install prisma
```

## เริ่มสร้าง เข้าไป Config Prisma

> my-app/prisma/schema.prisma

```bash
  datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### ใช้ไฟล์ .env

---

```bash
DATABASE_URL = mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

## 🎉เริ่มสร้าง ตาราง ด้วย Prisma

## Step 1 เพิ่ม ใน

> my-app/prisma/schema.prisma

```bash
 model Name {
  id        Int     @id  @default(autoincrement())
  title     String
  content   String?
  createdAt DateTime @default(now())
 }
```

> เป็นการสร้างตาราง

---

## Step 2 👏 เริ่มต้น prisma client

```bash
npx prisma genetate
```

## Step 3 เริ่มสร้างไฟล์ .sql

เพื่อให้มันสามารถไปติดต่อกับฐานข้อมูลได้ ในการสร้าง ตาราง

```bash
ืืnpx prisma migrate dev --name <ชื่อ migrate>
```

คำสั่งนี้

- จะสร้างไฟล์ migration ใหม่ใน folder `migrations` ของ Prisma ไฟล์นี้จะเก็บคำสั่ง SQL ไว้ (มีเวลาบอกด้วย)
- คำสั่ง `--name <ชื่อ migragtion>` ใช้ตั้งชื่อ กับ migtations นั้นๆ
  -หลังจากสร้างไฟล์ migration แล้ว คำสั่งนี้จะปรับใช้ migration ไปยังฐานข้อมูลโดยอัตโนมัติ ซึ่งจะทำการ updatee โครงสร้างฐานข้อมูลให้ตรงกับที่ระบุไว้ในไฟล์ schema.prisma เช่น การเพิ่มตารางใหม่, ปรับเปลี่ยนตารางเดิม หรือลบตาราง (migration จะวิเคราห์ออกมาผ่าน SQL ใน migration ให้เรียบร้อยแบบอัตโนมัติ)
