'use client';
import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

interface DataTableWithCRUDGuruProps {
    data: any[];
    loading: boolean;
    columns: { field: string; header: string }[];
    onAdd: (kategori: string, nama: string, jabatan: string, gambar: File | null) => void;
    onUpdate: (id: string, kategori: string, nama: string, jabatan: string, gambar: File | null) => void;
    onDelete: (id: string) => void;
}

const DataTableWithCRUDGuru: React.FC<DataTableWithCRUDGuruProps> = ({
    data,
    loading,
    columns,
    onAdd,
    onUpdate,
    onDelete,
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);

    const [kategori, setKategori] = useState('');
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [gambar, setGambar] = useState<File | null>(null);
    const toast = useRef<Toast>(null);

    // === Opsi dropdown kategori ===
    const kategoriOptions = [
        { label: 'Kepala Sekolah', value: 'Kepala Sekolah' },
        { label: 'Guru Mapel', value: 'Guru Mapel' },
        { label: 'Guru Kelas', value: 'Guru Kelas' },
        { label: 'Karyawan', value: 'Karyawan' },
    ];

    // === Dialog Add ===
    const openAddDialog = () => {
        setKategori('');
        setNama('');
        setJabatan('');
        setGambar(null);
        setShowDialog(true);
    };

    // === Dialog Edit ===
    const openEditDialog = (rowData: any) => {
        setSelectedData(rowData);
        setKategori(rowData.kategori || '');
        setNama(rowData.nama || '');
        setJabatan(rowData.jabatan || '');
        setGambar(null);
        setShowEditDialog(true);
    };

    // === File Upload ===
    const handleFileSelect = (e: FileUploadSelectEvent) => {
        const file = e.files[0];
        setGambar(file);
    };

    // === Add Data ===
    const handleAddData = () => {
        if (!kategori || !nama || !jabatan) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Peringatan',
                detail: 'Semua field wajib diisi',
                life: 3000,
            });
            return;
        }
        onAdd(kategori, nama, jabatan, gambar);
        setShowDialog(false);
    };

    // === Update Data ===
    const handleUpdateData = () => {
        if (!selectedData?.id) return;
        onUpdate(selectedData.id, kategori, nama, jabatan, gambar);
        setShowEditDialog(false);
    };

    // === Delete Data ===
    const handleDeleteData = (id: string) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            onDelete(id);
        }
    };

    // === Template Gambar ===
    const imageBodyTemplate = (rowData: any) => {
        const path = rowData.gambar;
        return <span className="text-gray-700">{path ? path : 'Tidak ada gambar'}</span>;
    };

    // === Tombol Aksi ===
    const actionBodyTemplate = (rowData: any) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info"
                onClick={() => openEditDialog(rowData)}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => handleDeleteData(rowData.id)}
            />
        </div>
    );

    // === Footer Dialog ===
    const dialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="Batal" icon="pi pi-times" onClick={() => setShowDialog(false)} className="p-button-text" />
            <Button label="Simpan" icon="pi pi-check" onClick={handleAddData} autoFocus />
        </div>
    );

    const editDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="Batal" icon="pi pi-times" onClick={() => setShowEditDialog(false)} className="p-button-text" />
            <Button label="Update" icon="pi pi-check" onClick={handleUpdateData} autoFocus />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />

            <div className="card">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold">Daftar Guru</h2>
                    <Button label="Tambah Data" icon="pi pi-plus" onClick={openAddDialog} />
                </div>

                <DataTable value={data} loading={loading} paginator rows={10} responsiveLayout="scroll">
                    {columns.map((col, i) => (
                        <Column
                            key={i}
                            field={col.field}
                            header={col.header}
                            body={col.field.toLowerCase() === 'gambar' ? imageBodyTemplate : undefined}
                        />
                    ))}
                    <Column header="Aksi" body={actionBodyTemplate} />
                </DataTable>
            </div>

            {/* === Tambah Data === */}
            <Dialog
                header="Tambah Guru"
                visible={showDialog}
                style={{ width: '35rem' }}
                modal
                onHide={() => setShowDialog(false)}
                footer={dialogFooter}
            >
                <div className="field mb-3">
                    <label htmlFor="kategori">Kategori</label>
                    <Dropdown
                        id="kategori"
                        value={kategori}
                        onChange={(e) => setKategori(e.value)}
                        options={kategoriOptions}
                        placeholder="Pilih Kategori"
                        className="w-full"
                    />
                </div>
                <div className="field mb-3">
                    <label htmlFor="nama">Nama</label>
                    <InputText id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full" />
                </div>
                <div className="field mb-3">
                    <label htmlFor="jabatan">Jabatan</label>
                    <InputText id="jabatan" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full" />
                </div>
                <fieldset className="p-3 border-round border-1 border-gray-300">
                    <legend className="text-sm font-semibold">Upload Gambar</legend>
                    <FileUpload
                        mode="advanced"
                        accept="image/*"
                        customUpload
                        chooseLabel="Pilih File"
                        uploadLabel="Upload"
                        cancelLabel="Batal"
                        onSelect={handleFileSelect}
                        emptyTemplate={<p className="m-0 text-sm text-gray-500">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                    />
                </fieldset>
            </Dialog>

            {/* === Edit Data === */}
            <Dialog
                header="Edit Guru"
                visible={showEditDialog}
                style={{ width: '35rem' }}
                modal
                onHide={() => setShowEditDialog(false)}
                footer={editDialogFooter}
            >
                <div className="field mb-3">
                    <label htmlFor="kategori">Kategori</label>
                    <Dropdown
                        id="kategori"
                        value={kategori}
                        onChange={(e) => setKategori(e.value)}
                        options={kategoriOptions}
                        placeholder="Pilih Kategori"
                        className="w-full"
                    />
                </div>
                <div className="field mb-3">
                    <label htmlFor="nama">Nama</label>
                    <InputText id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full" />
                </div>
                <div className="field mb-3">
                    <label htmlFor="jabatan">Jabatan</label>
                    <InputText id="jabatan" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full" />
                </div>
                <fieldset className="p-3 border-round border-1 border-gray-300">
                    <legend className="text-sm font-semibold">Ganti Gambar (opsional)</legend>
                    <FileUpload
                        mode="advanced"
                        accept="image/*"
                        customUpload
                        chooseLabel="Pilih File"
                        uploadLabel="Upload"
                        cancelLabel="Batal"
                        onSelect={handleFileSelect}
                        emptyTemplate={<p className="m-0 text-sm text-gray-500">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                    />
                </fieldset>
            </Dialog>
        </>
    );
};

export default DataTableWithCRUDGuru;