/*
    การสร้าง API ถ้าสร้างในไฟล์เดียวกัน
    จะต้อง แยก method ออกมาก เป็น
    GET POST PUT DELETE
*/

// จะใช้ prisma กับ API
import { PrismaClient } from "@prisma/client/extension";
export async function GET() {
  try {
    return Response.json({
      message: "Test",
    });
  } catch (error) {
    console.log("Error GET: ", error);
  }
}

// เพิ่มข้อมูลใช้ Post
/* ต้องใช้ Request 
    TypeScript (request: Request) ต้องใส่ Type
    JavaScript (request)
*/

export async function POST(request: Request) {
  const { content, title } = await request.json();
  const newData = Response.json({
    data: {
      content,
      title,
    },
  });

  return newData;
}
