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
npx prisma generate
```

ต้องให้มันเพิ่มเข้าไปที่ package node_modules นะ ถ้าจะให้ขึ้น AutoCompletes

## Step 3 เริ่มสร้างไฟล์ .sql

เพื่อให้มันสามารถไปติดต่อกับฐานข้อมูลได้ ในการสร้าง ตาราง

```bash
npx prisma migrate dev --name <ชื่อ migrate>
```

คำสั่งนี้

- จะสร้างไฟล์ migration ใหม่ใน folder `migrations` ของ Prisma ไฟล์นี้จะเก็บคำสั่ง SQL ไว้ (มีเวลาบอกด้วย)
- คำสั่ง `--name <ชื่อ migragtion>` ใช้ตั้งชื่อ กับ migtations นั้นๆ
  -หลังจากสร้างไฟล์ migration แล้ว คำสั่งนี้จะปรับใช้ migration ไปยังฐานข้อมูลโดยอัตโนมัติ ซึ่งจะทำการ updatee โครงสร้างฐานข้อมูลให้ตรงกับที่ระบุไว้ในไฟล์ schema.prisma เช่น การเพิ่มตารางใหม่, ปรับเปลี่ยนตารางเดิม หรือลบตาราง (migration จะวิเคราห์ออกมาผ่าน SQL ใน migration ให้เรียบร้อยแบบอัตโนมัติ)

# เริ่มสร้าง API สำหรับ CRUD Back-End

> สร้าง Folder api>post และสร้างไฟล์ route.ts

```bash
 |-- app
      |--- api ---> เก็บ api ทั้งหมด
            |__ post ---> ชื่อ path ที่จะให้เข้าไปถึง api อย่าง localhost:5000/api/post
                  |-- [id] ---> รับ id ผ่าน params หรือ path ในแถบค้นหา
                  |     |-- route.ts ---> สร้างเส้นทาง API ที่เข้าถึงตาม ID หรือ เข้าถึงคนเดียว GET PUT DELETE
                  |-- route.ts ---> เข้าถึง API ที่แสดง (GET) หลายคน และ สร้างข้อมูล (POST) 1 คน
```

- ทดสอบ API ผ่าน Postman
- เข้าไปดู ในไฟล์ route.ts

---

# สร้างหน้า Form สำหรับกรอกข้อมูล Front-End

## ติดตั้ง axios สำหรับใช้เรียก ต่อกับ API
```bash
  npm install axios
```
```bash
 |-- app
      |--- create
      |        |--- page.tsx ---> สร้างหน้า สำหรับการ เพิ่มข้อมูล
      |--- Edit ---> สร้างหน้า สำหรับการ แก้ไขข้อมูล
      |--- page.tsx ---> เป็นหน้าสำหรับ แสดงตารางของข้อมูล
```

# เริ่มสร้าง API สำหรับการ กรองข้อมูล
