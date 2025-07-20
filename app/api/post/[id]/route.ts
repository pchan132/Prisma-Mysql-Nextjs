import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ดึงข้อมูลตาม ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);
  const post = await prisma.post.findUnique({
    where: {
      // ดึงข้อมูลจาก ID
      id: postId,
    },
  });

  // ส่งข้อมูล ตาม Id กลับไป
  return Response.json(post);
}

// อัพเดทข้อมูลตาม ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id); // รับ ID ผ่าน params
    // เพิ่ม category ไป สำหรับการส่งข้อมูล
    const { title, content, category } = await request.json();
    // where คือหา จาก อะไร
    const updatePost = await prisma.post.update({
      where: { id: postId }, // แก้ไขข้อมูล จาก ID
      data: {
        title,
        content,
        category, // เพิ่ม
      },
    });

    // ส่ง การ Update ข้อมูล กลับไป
    return Response.json(updatePost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

// ลบข้อมูลตาม ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id); // รับ id จาก params
    // where คือลบจาก ID อะไร หรือ หาด้วยอะไรที่ไหนมี id
    const DeletePost = await prisma.post.delete({ where: { id: postId } });

    return Response.json(DeletePost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
