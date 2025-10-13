"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";

// --- Deklarasi tipe props ---
interface Column {
  field: string;
  header: string;
}

interface DataTableWithCRUDProps {
  data: any[];
  loading: boolean;
  singleInput: boolean;
  columns: Column[];
  onAdd: (section: string, judul: string, deskripsi: string, contentList: any[]) => void;
  onUpdate: (id: string, judul: string, deskripsi: string, gambar?: File | null) => void;
  onDelete: (id: string) => void;
  nameField: string;
  nameField2: string;
  nameField3?: string;
  inputLabel: string;
  inputLabel2: string;
  inputLabel3?: string;
}

const DataTableWithCRUD: React.FC<DataTableWithCRUDProps> = ({
  data,
  loading,
  columns,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  // === STATE TAMBAH ===
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);

  // === STATE EDIT ===
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editJudul, setEditJudul] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editGambar, setEditGambar] = useState<File | null>(null);

  // Tambah data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contentList = [{ image: gambar ? [gambar] : [] }];
    onAdd("section", judul, deskripsi, contentList);
    setVisibleAdd(false);
    setJudul("");
    setDeskripsi("");
    setGambar(null);
  };

  // Edit data
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      onUpdate(editId, editJudul, editDeskripsi, editGambar);
      setVisibleEdit(false);
      setEditId(null);
      setEditJudul("");
      setEditDeskripsi("");
      setEditGambar(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Fasilitas</h1>

      {/* === Tombol tambah data === */}
      <Button
        label="Tambah Data"
        icon="pi pi-plus"
        className="bg-indigo-500 text-white border-none"
        onClick={() => setVisibleAdd(true)}
      />

      {/* === DIALOG TAMBAH DATA === */}
      <Dialog
        header="Tambah Data"
        visible={visibleAdd}
        style={{ width: "90vw", maxWidth: "500px" }}
        onHide={() => setVisibleAdd(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="field mb-4">
            <label htmlFor="judul" className="font-bold">Judul</label>
            <InputText id="judul" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full" />
          </div>

          <div className="field mb-4">
            <label htmlFor="deskripsi" className="font-bold">Deskripsi</label>
            <InputText id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="w-full" />
          </div>

          <fieldset className="border border-gray-300 rounded-lg p-4 mt-3">
            <legend className="text-lg font-semibold text-gray-800">Upload Gambar</legend>
            <FileUpload
              name="gambar"
              accept="image/*"
              maxFileSize={2000000}
              onSelect={(e: FileUploadSelectEvent) => setGambar(e.files?.[0] || null)}
              emptyTemplate={<p className="m-0 text-gray-500">Seret dan lepas file di sini atau klik untuk memilih.</p>}
              customUpload
              chooseLabel="Pilih File"
              className="w-full"
            />
          </fieldset>

          <div className="flex justify-end mt-5">
            <Button type="submit" label="Simpan" icon="pi pi-check" className="bg-indigo-600 text-white border-none" />
          </div>
        </form>
      </Dialog>

      {/* === DIALOG EDIT DATA === */}
      <Dialog
        header="Edit Data"
        visible={visibleEdit}
        style={{ width: "90vw", maxWidth: "500px" }}
        onHide={() => setVisibleEdit(false)}
      >
        <form onSubmit={handleEditSubmit}>
          <div className="field mb-4">
            <label htmlFor="editJudul" className="font-bold">Judul</label>
            <InputText id="editJudul" value={editJudul} onChange={(e) => setEditJudul(e.target.value)} className="w-full" />
          </div>

          <div className="field mb-4">
            <label htmlFor="editDeskripsi" className="font-bold">Deskripsi</label>
            <InputText id="editDeskripsi" value={editDeskripsi} onChange={(e) => setEditDeskripsi(e.target.value)} className="w-full" />
          </div>

          {/* === UPLOAD GAMBAR BARU === */}
          <fieldset className="border border-gray-300 rounded-lg p-4 mt-3">
            <legend className="text-lg font-semibold text-gray-800">Ganti Gambar (Opsional)</legend>
            <FileUpload
              name="editGambar"
              accept="image/*"
              maxFileSize={2000000}
              onSelect={(e: FileUploadSelectEvent) => setEditGambar(e.files?.[0] || null)}
              emptyTemplate={<p className="m-0 text-gray-500">Seret dan lepas file di sini atau klik untuk memilih.</p>}
              customUpload
              chooseLabel="Pilih Gambar Baru"
              className="w-full"
            />
          </fieldset>

          <div className="flex justify-end mt-5">
            <Button type="submit" label="Simpan Perubahan" icon="pi pi-check" className="bg-indigo-600 text-white border-none" />
          </div>
        </form>
      </Dialog>

      {/* === TABEL DATA === */}
      <div className="mt-6">
        {data.length === 0 ? (
          <p className="text-gray-500">Belum ada data fasilitas.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="border border-gray-300 p-2 bg-gray-100 text-left">{col.header}</th>
                ))}
                <th className="border border-gray-300 p-2 bg-gray-100">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id}>
                  {columns.map((col, idx) => (
                    <td key={idx} className="border border-gray-300 p-2">{item[col.field]}</td>
                  ))}
                  <td className="border border-gray-300 p-2 text-center">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-text text-indigo-600"
                      onClick={() => {
                        setEditId(item.id);
                        setEditJudul(item.judul);
                        setEditDeskripsi(item.deskripsi);
                        setEditGambar(null);
                        setVisibleEdit(true);
                      }}
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-text text-red-500"
                      onClick={() => onDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DataTableWithCRUD;
