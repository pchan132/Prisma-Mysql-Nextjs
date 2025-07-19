// เพิ่่ม Prisma สำหรับ ใช้งานกับ Database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//  สำหรับ กรอง หรือ filter ข้อมูล
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = Number(params.id);
    const categoryWithPosts = await prisma.category.findUnique({
      where : {id : categoryId},
      include: {
        post : true
      }
    })
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
