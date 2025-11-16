'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

interface Operator {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  status?: number;
}

export default function KelolaOperatorPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [operatorToDelete, setOperatorToDelete] = useState<Operator | null>(null);
  const toast = useRef<Toast>(null);

  // Ambil data operator
  const fetchOperators = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.GETOperator);
      setOperators(res.data);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Gagal',
        detail: 'Gagal memuat data operator',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  // Simpan operator (Tambah / Edit)
  const saveOperator = async () => {
    try {
      if (!selectedOperator) return;

      if (editMode && selectedOperator.id) {
        // UPDATE operator (email sekarang bisa diubah)
        await axios.put(API_ENDPOINTS.UPDATEOperator(String(selectedOperator.id)), {
          name: selectedOperator.name,
          email: selectedOperator.email, // ✅ email ikut dikirim
          phone: selectedOperator.phone,
          address: selectedOperator.address,
          password: selectedOperator.password ? selectedOperator.password : undefined, // hanya kirim jika diisi
        });

        toast.current?.show({
          severity: 'success',
          summary: 'Berhasil',
          detail: 'Data operator berhasil diperbarui',
          life: 3000,
        });
      } else {
        // TAMBAH operator
        await axios.post(API_ENDPOINTS.TAMBAHOperator, selectedOperator);
        toast.current?.show({
          severity: 'success',
          summary: 'Berhasil',
          detail: 'Operator baru berhasil ditambahkan',
          life: 3000,
        });
      }

      setDialogVisible(false);
      fetchOperators();
    } catch (error: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Gagal',
        detail: error.response?.data?.message || 'Terjadi kesalahan',
      });
    }
  };

  // Konfirmasi hapus
  const confirmDelete = (operator: Operator) => {
    setOperatorToDelete(operator);
    setDeleteDialog(true);
  };

  // Hapus operator
  const deleteOperator = async () => {
    if (!operatorToDelete?.id) return;
    try {
      await axios.delete(API_ENDPOINTS.DELETEOperator(String(operatorToDelete.id)));
      toast.current?.show({
        severity: 'success',
        summary: 'Dihapus',
        detail: 'Operator berhasil dihapus',
        life: 3000,
      });
      setDeleteDialog(false);
      fetchOperators();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Gagal',
        detail: 'Gagal menghapus operator',
      });
    }
  };

  // Kolom Aksi
  const actionTemplate = (rowData: Operator) => (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        rounded
        severity="info"
        onClick={() => {
          // saat edit, password dikosongkan walau data lama ada hash
          setSelectedOperator({ ...rowData, password: '' });
          setEditMode(true);
          setDialogVisible(true);
        }}
      />
      <Button
        icon="pi pi-trash"
        rounded
        severity="danger"
        onClick={() => confirmDelete(rowData)}
      />
    </div>
  );

  return (
    <div className="p-6">
      <Toast ref={toast} />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">Kelola Data Admin</h1>
        <Button
          label="Tambah Admin"
          icon="pi pi-plus"
          severity="info"
          className="px-4 py-2 font-medium shadow-md"
          onClick={() => {
            setSelectedOperator({
              name: '',
              email: '',
              password: '',
              phone: '',
              address: '',
              status: 2,
            });
            setEditMode(false);
            setDialogVisible(true);
          }}
        />
      </div>

      {/* TABEL */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ProgressSpinner />
        </div>
      ) : (
        <DataTable
  value={operators}
  paginator
  rows={10}
  className="shadow-md rounded-lg"
  stripedRows
  responsiveLayout="scroll"
>
  {/* <Column field="id" header="ID" style={{ width: '5%' }} /> */}
  <Column field="name" header="Nama" style={{ width: '20%' }} />
  <Column field="email" header="Email" style={{ width: '25%' }} />
  <Column field="password" header="Password (Hash)" style={{ width: '25%' }} />
  <Column field="phone" header="Telepon" style={{ width: '15%' }} />
  <Column field="address" header="Alamat" style={{ width: '20%' }} />
  <Column header="Aksi" body={actionTemplate} style={{ width: '15%' }} />
</DataTable>

      )}

      {/* DIALOG TAMBAH/EDIT */}
      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">
            {editMode ? 'Edit Data' : 'Tambah Data'}
          </div>
        }
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        style={{ width: '35rem' }}
        className="rounded-xl shadow-lg"
        modal
      >
        <div className="space-y-4 mt-2">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <InputText
              value={selectedOperator?.name || ''}
              onChange={(e) =>
                setSelectedOperator({ ...selectedOperator!, name: e.target.value })
              }
              placeholder="Masukkan nama operator"
              className="w-full p-inputtext-sm"
            />
          </div>

          {/* Email (sekarang selalu bisa diubah) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <InputText
              value={selectedOperator?.email || ''}
              onChange={(e) =>
                setSelectedOperator({
                  ...selectedOperator!,
                  email: e.target.value,
                })
              }
              placeholder="Masukkan email operator"
              className="w-full p-inputtext-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password {editMode ? '(kosongkan jika tidak diubah)' : ''}
            </label>
            <Password
              value={selectedOperator?.password || ''}
              onChange={(e) =>
                setSelectedOperator({
                  ...selectedOperator!,
                  password: e.target.value,
                })
              }
              toggleMask
              feedback={false}
              inputClassName="w-full p-inputtext-sm"
              placeholder={
                editMode
                  ? 'Kosongkan jika tidak ingin mengganti password'
                  : 'Masukkan password'
              }
            />
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <InputText
              value={selectedOperator?.phone || ''}
              onChange={(e) =>
                setSelectedOperator({ ...selectedOperator!, phone: e.target.value })
              }
              placeholder="Masukkan nomor telepon"
              className="w-full p-inputtext-sm"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <InputText
              value={selectedOperator?.address || ''}
              onChange={(e) =>
                setSelectedOperator({ ...selectedOperator!, address: e.target.value })
              }
              placeholder="Masukkan alamat"
              className="w-full p-inputtext-sm"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-center gap-3 pt-3">
            <Button
              label="Batal"
              icon="pi pi-times"
              className="p-button-text text-blue-600"
              onClick={() => setDialogVisible(false)}
            />
            <Button
              label="Simpan"
              icon="pi pi-check"
              className="bg-blue-600 border-none hover:bg-blue-700 text-white shadow-md"
              onClick={saveOperator}
            />
          </div>
        </div>
      </Dialog>

      {/* DIALOG KONFIRMASI HAPUS */}
      <Dialog
        visible={deleteDialog}
        onHide={() => setDeleteDialog(false)}
        style={{ width: '25rem' }}
        className="rounded-xl shadow-lg"
        modal
        header={
          <div className="text-lg font-semibold text-red-600 flex items-center gap-2">
            <i className="pi pi-exclamation-triangle text-red-600 text-xl" />
            Konfirmasi Hapus
          </div>
        }
        footer={
          <div className="flex justify-end gap-3">
            <Button
              label="Batal"
              icon="pi pi-times"
              className="p-button-text text-gray-600"
              onClick={() => setDeleteDialog(false)}
            />
            <Button
              label="Hapus"
              icon="pi pi-trash"
              severity="danger"
              className="shadow-md"
              onClick={deleteOperator}
            />
          </div>
        }
      >
        <p className="text-gray-700">
          Apakah Anda yakin ingin menghapus operator{' '}
          <span className="font-semibold text-gray-900">
            {operatorToDelete?.name}
          </span>
          ?
        </p>
      </Dialog>
    </div>
  );
}
