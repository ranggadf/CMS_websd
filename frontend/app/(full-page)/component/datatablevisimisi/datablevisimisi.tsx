'use client';
import React, { useState, useRef, MutableRefObject, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

interface DataTableVisiMisiProps {
    data: any[];
    loading: boolean;
    columns: { field: string; header: string }[];
    // onUpdate sekarang menangani Add dan Update: (id: string | null, visiText: string, misiList: string[])
    onUpdate: (id: string | null, visiText: string, misiList: string[]) => void;
    onDelete: (id: string) => void;
    showOnlyAdd: boolean; // Tidak digunakan, tapi dipertahankan
    toastRef: MutableRefObject<Toast | null>;
}

const DataTableVisiMisi: React.FC<DataTableVisiMisiProps> = ({ data, loading, columns, onUpdate, onDelete, toastRef }) => {
    // Kita hanya perlu satu dialog edit/tambah
    const [showFormDialog, setShowFormDialog] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedData, setSelectedData] = useState<any>(null); // Data yang akan diedit

    // State untuk form
    const [visiText, setVisiText] = useState<string>(''); // Visi sebagai string tunggal
    const [misiList, setMisiList] = useState<string[]>(['']); // Misi sebagai list

    const toast = toastRef;

    // === INTI LOGIKA FORM ===
    const openFormDialog = (rowData: any | null) => {
        setSelectedData(rowData);

        // 1. Inisialisasi Visi (Membersihkan karakter kutip ganda/tunggal yang tidak perlu)
        const cleanVisi = rowData?.visi ? rowData.visi.replace(/["']/g, '').trim() : '';
        setVisiText(cleanVisi);

        // 2. Inisialisasi Misi (memecah string koma-separated menjadi array)
        const initialMisi = rowData?.misi
            ? rowData.misi
                  .replace(/["']/g, '') // Bersihkan tanda kutip sebelum split
                  .split(',')
                  .map((m: string) => m.trim())
                  .filter((m: string) => m.length > 0) // Hapus string kosong setelah trim
            : [];

        // Pastikan minimal ada satu field input (berisi data atau kosong)
        setMisiList(initialMisi.length > 0 ? initialMisi : ['']);

        setShowFormDialog(true);
    };

    const addMisiField = () => setMisiList([...misiList, '']);

    // Fungsi untuk menghapus field Misi
    const removeMisiField = (index: number) => {
        // Hapus item pada index tersebut
        const newMisiList = misiList.filter((_, i) => i !== index);

        // Jika list menjadi kosong, inisialisasi dengan satu field kosong
        setMisiList(newMisiList.length === 0 ? [''] : newMisiList);
    };

    const updateMisiField = (index: number, value: string) => {
        const updated = [...misiList];
        updated[index] = value;
        setMisiList(updated);
    };

    const handleSaveData = () => {
        // PENTING: Lakukan trim pada visiText saat disimpan
        const trimmedVisi = visiText.trim();
        // Hanya ambil misi yang benar-benar memiliki konten setelah di-trim
        const filteredMisi = misiList.map((m) => m.trim()).filter((m) => m.length > 0);

        if (trimmedVisi === '' || filteredMisi.length === 0) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Peringatan',
                detail: 'Visi dan minimal satu Misi harus diisi!',
                life: 3000
            });
            return;
        }

        // Panggil handler onUpdate di CMSVisiMisi.tsx
        const idToUpdate = selectedData?.id || null;
        onUpdate(idToUpdate, trimmedVisi, filteredMisi); // Kirim visi yang sudah bersih
        setShowFormDialog(false);
    };

    // === HAPUS ===
    const confirmDelete = (id: string) => {
        setDeleteId(id);
        setDeleteDialogVisible(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteId) onDelete(deleteId);
        setDeleteDialogVisible(false);
    };

    // Template Aksi untuk Data yang Ada
    const actionBodyTemplate = (rowData: any) => (
        <div className="flex gap-2 justify-center">
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => openFormDialog(rowData)} tooltip="Edit Visi & Misi" />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDelete(rowData.id)} tooltip="Hapus Data" />
        </div>
    );

    // Template Body Khusus untuk Kolom Misi (untuk mengatasi karakter aneh)
    const misiBodyTemplate = (rowData: any) => {
        if (!rowData.misi) return <span className="italic text-gray-400">Belum ada Misi</span>;

        // Memecah string Misi dan menampilkan sebagai list
        const misiPoints = rowData.misi
            .replace(/["']/g, '') // Membersihkan tanda kutip ganda/tunggal
            .split(',')
            .map((m: string) => m.trim())
            .filter((m: string) => m.length > 0);

        return (
            <ul className="list-disc list-inside space-y-1 text-sm">
                {/* PERBAIKAN: Menambahkan tipe eksplisit 'string' untuk 'point' */}
                {misiPoints.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        );
    };

    // === FOOTERS DIALOG ===
    const formDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="Batal" icon="pi pi-times" onClick={() => setShowFormDialog(false)} className="p-button-text" />
            <Button label="Simpan" icon="pi pi-check" onClick={handleSaveData} />
        </div>
    );

    const deleteDialogFooter = (
        <div className="flex justify-center gap-3 mt-3">
            <Button label="Batal" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" />
            <Button label="Hapus" icon="pi pi-trash" severity="danger" onClick={handleDeleteConfirm} />
        </div>
    );

    // Fungsi untuk me-render list input Misi
    const renderMisiInputList = () => (
        <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Daftar Misi (Satu Misi per Baris)</label>
            {misiList.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2 items-start">
                    <InputTextarea value={item} onChange={(e) => updateMisiField(i, e.target.value)} className="w-full" rows={2} placeholder={`Misi Point ${i + 1}`} />
                    {/* HANYA tampilkan tombol hapus jika ada lebih dari satu field ATAU field tersebut tidak kosong */}
                    {(misiList.length > 1 || (misiList.length === 1 && item.trim() !== '')) && (
                        <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text mt-1" onClick={() => removeMisiField(i)} tooltip={`Hapus Misi ${i + 1}`} tooltipOptions={{ position: 'right' }} />
                    )}
                </div>
            ))}
            {/* PASTIKAN tombol Tambah Misi hanya muncul di sini, tidak diulang */}
            <Button label={`Tambah Misi`} icon="pi pi-plus" className="p-button-text text-blue-500 mt-2" onClick={addMisiField} />
        </div>
    );

    // Render Logic: Jika data kosong, tampilkan tombol untuk menambah data pertama
    if (!loading && data.length === 0) {
        return (
            <div className="text-center p-10 border border-dashed border-gray-300 rounded-lg">
                <p className="text-lg text-gray-600 mb-4">Belum ada data Visi & Misi yang tersimpan.</p>
                <Button label="Tambah Data Pertama" icon="pi pi-plus" onClick={() => openFormDialog(null)} className="p-button-success" />
                {/* Dialog form untuk Tambah Data Pertama */}
                <Dialog header="Tambah Visi & Misi" visible={showFormDialog} style={{ width: '40rem' }} modal onHide={() => setShowFormDialog(false)} footer={formDialogFooter}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Visi</label>
                        <InputTextarea value={visiText} onChange={(e) => setVisiText(e.target.value)} className="w-full" rows={3} placeholder="Tuliskan Visi Anda di sini..." />
                    </div>
                    {renderMisiInputList()}
                </Dialog>
            </div>
        );
    }

    return (
        <>
            <div className="card p-0">
                {/* Menghilangkan div yang berisi tulisan keterangan */}
                <div className="flex justify-end align-items-center mb-3">{/* Kotak ini dibiarkan kosong atau digunakan untuk elemen lain */}</div>

                <DataTable
                    value={data}
                    loading={loading}
                    // HILANGKAN paginator
                    rows={data.length || 1} // Tetapkan rows sesuai jumlah data (untuk data tunggal)
                    responsiveLayout="scroll"
                    className="shadow-none"
                >
                    {/* Kolom ID disembunyikan */}
                    {columns
                        .filter((col) => col.field !== 'id')
                        .map((col, i) => {
                            if (col.field === 'misi') {
                                // Terapkan body template khusus untuk kolom Misi
                                return <Column key={i} field={col.field} header={col.header} sortable={false} body={misiBodyTemplate} />;
                            }
                            return <Column key={i} field={col.field} header={col.header} sortable={false} />;
                        })}
                    <Column header="Aksi" body={actionBodyTemplate} align="center" style={{ width: '10%' }} />
                </DataTable>
            </div>

            {/* === Dialog Edit/Update Data === */}
            <Dialog header={selectedData ? 'Edit Visi & Misi' : 'Tambah Visi & Misi'} visible={showFormDialog} style={{ width: '40rem' }} modal onHide={() => setShowFormDialog(false)} footer={formDialogFooter}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Visi</label>
                    <InputTextarea value={visiText} onChange={(e) => setVisiText(e.target.value)} className="w-full" rows={3} placeholder="Tuliskan Visi Anda di sini..." />
                </div>
                {renderMisiInputList()}
            </Dialog>

            {/* === Dialog Konfirmasi Hapus === */}
            <Dialog
                header="Konfirmasi Hapus"
                visible={deleteDialogVisible}
                style={{ width: '25rem' }}
                modal
                closable={false}
                className="flex flex-col items-center justify-center text-center"
                onHide={() => setDeleteDialogVisible(false)}
                footer={deleteDialogFooter}
            >
                <i className="pi pi-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p className="text-lg font-medium text-gray-700">Apakah Anda yakin ingin menghapus data ini? Aksi ini akan menghapus Visi dan semua Misi yang terkait.</p>
            </Dialog>
        </>
    );
};

export default DataTableVisiMisi;
