'use client';

import React, { useEffect, useState } from "react";
import { DeleteUserButton } from '@/components/(account)/guest/delete/DeleteUserButton';

interface Customer {
  user_id: string;
  email: string;
  name: string;
  password: string;
}

export default function UserPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/customer/list', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch customers: ${res.status}`);
        }

        const data: { customer_list: Customer[] } = await res.json();
        setCustomers(data.customer_list);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h3 className="text-4xl font-bold text-blue-500 mb-6">사용자 목록</h3>

      <div className="w-full max-w-4xl">
        <table className="w-full border-collapse border-4 border-gray-800 border-double shadow-lg bg-white">  
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-800 px-4 py-2 text-left">이름</th>
              <th className="border border-gray-800 px-4 py-2 text-left">이메일</th>
              <th className="border border-gray-800 px-4 py-2 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.user_id} className="hover:bg-gray-100">
                <td className="border border-gray-800 px-4 py-2">{customer.name}</td>
                <td className="border border-gray-800 px-4 py-2">{customer.email}</td>
                <td className="border border-gray-800 px-4 py-2">
                  <div className="flex justify-center">
                    <DeleteUserButton userId={customer.user_id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}