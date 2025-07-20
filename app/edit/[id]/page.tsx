"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [post, setpost] = useState([]); // เก็บข้อมูลของ ID ที่ต้องการ
  const [title, setTitle] = useState(""); // เก็บข้อมูล title
  const [content, setContent] = useState(""); // เก็บข้อมูล content
  const [category, setCategory] = useState("");

  const router = useRouter();

  // สำหรับดึงข้อมูล ตาม ID ของแต่ละคน
  const fetchData = async (id: string) => {
    try {
      const res = await axios.get(`/api/post/${id}`);
      setTitle(res.data.title); // เอาข้อมูลที่ได้ไปใส่ใน ตัวแปร title
      setContent(res.data.content); // เอาข้อมูลที่ได้ไปใส่ใน ตัวแปร content
      // เพิ่ม category
      setCategory(res.data.category);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  //  ฟังก์ชั่นสำหรับ การอัพเดทข้อมูล จาก form Edit ไปให้ API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // สำไม่ให้ รีเช็ตหน้า เพจ เมื่อกดปุ่มส่งข้อมูล

    // อัพเดทเข้าไปตาม ID ที่ต้องการแก้ไขข้อมูล
    try {
      const res = await axios.put(`/api/post/${id}`, {
        title,
        content,
        //  ส่งไปอัพเดท
        category,
      });

      // ส่ง user ไปที่ หน้า ตารางจัดการข้อมูล
      router.push(`/`);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  // เริ่มต้น หน้าเว็บให้ เริ่มดึงข้อมูลตาม id ที่ต้องการ เมื่อรับ id เข้า
  useEffect(() => {
    if (id) {
      fetchData(id); // รับข้อมูล ID และ ดึงข้อมูล ของคนที่ต้องการมาเก็บไว้ ดูในฟังก์ชั่น fetchData
    }
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Post {id}</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {" "}
        {/* // เข้า ฟังก์ handleSubmit */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // ส่ง e มาทำให้ เก็บ event หรือ สถานะ ว่าผู้ใช้ใส่ข้อมูลอะไรบ้าง
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)} // ส่ง e มาทำให้ เก็บ event หรือ สถานะ ว่าผู้ใช้ใส่ข้อมูลอะไรบ้าง
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        {/* category */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
