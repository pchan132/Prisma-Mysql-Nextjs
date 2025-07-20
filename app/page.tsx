"use client";
// use client สามารถใช้ React Hook ได้

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  // ตัวแปรสำหรับเก็บข้อมูล ที่ส่งมาจาก API
  const [posts, setPosts] = useState([]);

  // สร้าง state ของการค้นหา
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");

  // ดึงข้อมูล ผ่าน API
  async function fetchPosts() {
    try {
      // ใน javaScript มี ฟังก์ชั่นที่สนับสนุน การรับค่าจาก params ให้กลายเป็นสตริง
      const query = new URLSearchParams({ category, search, sort }).toString(); // category=&search=pchan&sort=desc  แบบเต็ม
      console.log(query);
      // เมื่อมีช่องคนหาแล้วให้ เพิ่มค่า ส่งเป็น query params ไป ?search=${search}&category=${category}&sort=${sort}
      const res = await axios.get(`/api/post?${query}`);
      setPosts(res.data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  //  useEffect ทำให้ เมื่อเข้าหน้าเว็บครั้ง แรก ให้ทำการโหลดข้อมูลก่อน
  useEffect(() => {
    fetchPosts(); // fetch ข้อมูลผู้ใช้
  }, []);

  // ฟังก์ชั้นสำหรับ ลบข้อมูล
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/post/${id}`);
      // fetch ข้อมูลใหม่
      fetchPosts();
    } catch (error) {
      console.log("Error Delet : ", error);
    }
  };

  // สร้างฟังก์ชั่นสำหรับ การ ค้นหา
  const handleFilterChange = () => {
    fetchPosts();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Blog Posts</h1>
      {/* search */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title..."
            value={search} // เพิ่ม ค่า
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={handleFilterChange}
          >
            Apply
          </button>
        </div>
      </div>

      {/* form */}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    href={`/edit/${post.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        href="/create"
      >
        Create a New Post
      </Link>
    </div>
  );
}
