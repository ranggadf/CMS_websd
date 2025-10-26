'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

interface Operator {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function OperatorPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Operator>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // 🔹 Ambil semua operator
  const fetchOperators = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.GETOperator);
      setOperators(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Update operator
  const handleUpdate = async (id: number) => {
    try {
      console.log('ID yang dikirim:', id);
      console.log('Data yang dikirim:', editData);

      await axios.put(API_ENDPOINTS.UPDATEOperator(String(id)), editData);
      alert('✅ Data berhasil diperbarui');
      setEditingId(null);
      fetchOperators();
    } catch (err: any) {
      console.error('Error saat update:', err.response?.data || err.message);
      alert('❌ Gagal memperbarui data');
    }
  };

  // 🔹 Hapus operator
  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    try {
      await axios.delete(API_ENDPOINTS.DELETEOperator(String(id)));
      alert('🗑️ Data berhasil dihapus');
      fetchOperators();
    } catch (err: any) {
      console.error('Error saat hapus:', err.response?.data || err.message);
      alert('❌ Gagal menghapus data');
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Daftar Operator
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Kode</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Nama</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Telepon</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Alamat</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {operators.length > 0 ? (
                operators.map((op, index) => (
                  <tr key={op.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingId === op.id ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        op.name
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingId === op.id ? (
                        <input
                          type="text"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        op.email
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingId === op.id ? (
                        <input
                          type="text"
                          value={editData.phone}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        op.phone
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingId === op.id ? (
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) =>
                            setEditData({ ...editData, address: e.target.value })
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        op.address
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center space-x-2">
                      {editingId === op.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(op.id!)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(op.id!);
                              setEditData({
                                name: op.name || '',
                                email: op.email || '',
                                phone: op.phone || '',
                                address: op.address || '',
                              });
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(op.id!)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Tidak ada data operator.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
