/*
    การสร้าง API ถ้าสร้างในไฟล์เดียวกัน
    จะต้อง แยก method ออกมาก เป็น
    GET POST PUT DELETE
*/

// จะใช้ prisma กับ API
import { PrismaClient } from "@prisma/client";
import { create } from "domain";

// สร้าง API สำหรับการ กรองข้อมูล filter sort ค้นหา
import { type NextRequest } from "next/server"; // สามารถทำให้ รับ Request ที่ส่งเข้ามาผ่าน URL
import { title } from "process";

// สร้าง Constaand ใหม่ให้เรียกใช้
const prisma = new PrismaClient();
//  ดึงข้อมูลทั้งหมด
export async function GET(request: NextRequest) {
  //รับ เป็น NextRequest ทำให้รับค่าจาก param ได้
  try {
    const searchParams = request.nextUrl.searchParams; // สร้างตัวแปรสำหรับเรียกใช้งาน
    // สร้างตัวแปรสำหรับเก็บข้อมูล ที่รับมาจาก params
    const search = searchParams.get("search") || ""; // ถ้าไม่ส่งอะไรมาให้เป็นค่าว่าง
    const category = searchParams.get("category"); // ถ้าไม่มี ไม่ใช้
    const sort = searchParams.get("sort") || "desc"; // ถ้าไม่ส่งอะไรเข้ามาให้ เป็นค่า desc หรือ เรียงจากใหม่ไปเก่า

    // ลองทดสอบ
    console.log({
      search,
      category,
      sort,
    });

    // สร้างเงื่อนไข category
    let whereCondition = category
      ? {
          //ถ้ามี category ส่งมาให้ ส่ง category ไปคนหา
          category,
          title: {
            contains: search, //เงื่อนไขตัวกรองที่จะตรวจสอบว่าฟิลด์ title มีค่าตัวอักษรในข้อความ หรือไม่
            // mode: "insensitive", //ทำให้การค้นหาไปสน ตัวพิมพ์เล็กหรือตัวพิมพ์ใหญ่ MySQL: field ต้องใช้ collation แบบ *_ci (เช่น utf8_general_ci)
          },
        }
      : {
          // ถ้าไม่มี category ส่งมา ให้ส่งเป็น title อย่างเดียว
          title: {
            contains: search, //เงื่อนไขตัวกรองที่จะตรวจสอบว่าฟิลด์ title มีค่าตัวอักษรในข้อความ หรือไม่
            // mode: "insensitive", //ทำให้การค้นหาไปสน ตัวพิมพ์เล็กหรือตัวพิมพ์ใหญ่ MySQL: field ต้องใช้ collation แบบ *_ci (เช่น utf8_general_ci)
          },
        };

    const data = await prisma.post.findMany({
      // เพิ่ม where สำหรับการ ค้นหา
      where: whereCondition as any, // as any เพื่อทำการแยกประเภทของ type ออกมา
      orderBy: {
        // การทำ sort
        createdAt: sort,
      } as any, // ให้ type ออกมาตามที่เป็นปลายทางเลย
    });
    return Response.json(data);
  } catch (error) {
    console.error("Error GET: ", error);

    // ✅ เพิ่ม return ที่ส่ง response กลับเมื่อเกิด error
    return Response.json(
      { error: "Internal server error", detail: error },
      { status: 500 }
    );
  }
}

// เพิ่มข้อมูลใช้ Post
/* ต้องใช้ Request 
    TypeScript (request: Request) ต้องใส่ Type
    JavaScript (request)
*/

// ส้รางข้อมูล
// ต่อ เริ่มสร้าง API สำหรับการ กรองข้อมูล filter sort ค้นหา
export async function POST(request: Request) {
  try {
    // เริ่มสร้าง API สำหรับการ กรองข้อมูล filter sort ค้นหา
    // เพิ่ม category ไป และไปแก้ put ต่อ ใน api/post/[id]/route.ts
    const { content, title, category } = await request.json();
    // สร้างข้อมูลอะไรบ้าง ให้ส่งไป
    const newData = await prisma.post.create({
      data: {
        title,
        content,
        category, // เพิ่ม
      },
    });

    return Response.json(newData);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
