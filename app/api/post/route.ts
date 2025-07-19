/*
    การสร้าง API ถ้าสร้างในไฟล์เดียวกัน
    จะต้อง แยก method ออกมาก เป็น
    GET POST PUT DELETE
*/

// จะใช้ prisma กับ API
import { PrismaClient } from "@prisma/client";

// สร้าง Constaand ใหม่ให้เรียกใช้
const prisma = new PrismaClient();
//  ดึงข้อมูลทั้งหมด
export async function GET() {
  try {
    const data = await prisma.post.findMany();
    return Response.json(data);
  } catch (error) {
    console.log("Error GET: ", error);
  }
}

// เพิ่มข้อมูลใช้ Post
/* ต้องใช้ Request 
    TypeScript (request: Request) ต้องใส่ Type
    JavaScript (request)
*/

// ส้รางข้อมูล 
export async function POST(request: Request) {
  try {
    const { content, title } = await request.json();
    // สร้างข้อมูลอะไรบ้าง ให้ส่งไป
    const newData = await prisma.post.create({
      data: {
        content,
        title,
      },
    });

    return Response.json(newData);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
