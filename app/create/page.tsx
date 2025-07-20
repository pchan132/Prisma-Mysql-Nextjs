"use client";
// use client สามารถใช้ React Hook ได้

import { useState } from "react";
import axios from "axios";
// ใช้ useRouter ให้ส่งไปที่หน้าต่างๆ
import { useRouter } from "next/navigation";
export default function Home() {
  // สร้างตัวแปร สำหรับเก็บ ข้อมูล Form โดยใช้ useState
  const [title, setTitle] = useState(""); // ('') ให้ค่าเริ่มต้นเป็น ค่าว่าง
  const [content, setContent] = useState(""); // ('') ให้ค่าเริ่มต้นเป็น ค่าว่าง
  const [category, setCategory] = useState("");
  const router = useRouter(); // เมื่อเรียกใช้ Router

  // ฟังก์ชั่นเมื่อกดส่ง ข้อมูล
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); //ยกเลิก พฤติกรรม เริ่มต้นของ เบราว์เซอร์ ทำให้เมื่อกดส่งไปแล้ว ไม่รีโหลด หน้าเพจ
    // ทดสอบว่าส่งค่าถูกไหม
    // console.log("Title : ", title);
    // console.log("Content: ", content);
    try {
      // ส่งข้อมูลไปผ่าน API โดยใช้ axios
      await axios.post(`/api/post`, {
        // ใส่ข้อมูลที่จะส่ง
        title,
        content,
        category,
      });

      //  เมื่อไม่มี ปัญหาอะไรในการส่งข้อมูลให้ ส่ง user ไปที่หน้า แรก
      router.push("/");
    } catch (error) {
      console.log("error: ", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create a New Post</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        {/* category */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        {/* Submit */}
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
