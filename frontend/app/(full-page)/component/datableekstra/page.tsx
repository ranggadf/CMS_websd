import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

const DataTableWithCRUD = ({
  data,
  onAdd,
  onUpdate,
  onDelete,
  idField = 'id',
  nameField = 'judul',
  nameField2 = 'deskripsi',
  nameField3 = 'Gambar',

  addButtonLabel = 'Tambah',
  editButtonLabel = 'Perbarui',
  deleteButtonLabel = 'Hapus',
  addDialogHeader = 'Tambah Data',
  editDialogHeader = 'Edit Data',
  deleteDialogHeader = 'Hapus Data',
}: any) => {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambarFile, setGambarFile] = useState<File | null>(null);
  const [previewGambar, setPreviewGambar] = useState<string | null>(null);

  const [editJudul, setEditJudul] = useState('');
  const [editDeskripsi, setEditDeskripsi] = useState('');
  const [editGambarFile, setEditGambarFile] = useState<File | null>(null);
  const [editPreviewGambar, setEditPreviewGambar] = useState<string | null>(null);

  const toast = useRef<Toast>(null);

  const handleAdd = async () => {
    if (!judul || !deskripsi) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Peringatan',
        detail: 'Judul dan deskripsi wajib diisi!',
        life: 3000,
      });
      return;
    }

    await onAdd(judul, deskripsi, gambarFile);

    setJudul('');
    setDeskripsi('');
    setGambarFile(null);
    setPreviewGambar(null);
    setVisibleAdd(false);
  };

  const handleUpdate = async () => {
    await onUpdate(selectedRow[idField], editJudul, editDeskripsi, editGambarFile);

    setEditJudul('');
    setEditDeskripsi('');
    setEditGambarFile(null);
    setEditPreviewGambar(null);
    setVisibleEdit(false);
  };

  return (
    <div className="mb-5">
      <Toast ref={toast} />

      {/* Tombol Tambah */}
      <div className="mb-2 flex justify-content-end">
        <Button
          label={addButtonLabel}
          icon="pi pi-plus"
          className="bg-blue-200 w-full sm:w-auto"
          onClick={() => setVisibleAdd(true)}
        />
      </div>

      {/* Tabel Data */}
      <DataTable value={data} responsiveLayout="scroll" paginator rows={5}>
        <Column field={nameField} header="Judul" />
        <Column field={nameField2} header="Deskripsi" />
        <Column
          header="Gambar"
          body={(rowData) => (
            <img
              src={`http://127.0.0.1:8000/storage/${rowData[nameField3]}`}
              alt="gambar"
              style={{ width: '80px', borderRadius: '8px' }}
            />
          )}
        />
        <Column
          header="Edit"
          body={(rowData) => (
            <Button
              icon="pi pi-pencil"
              className="bg-blue-200 border-none"
              onClick={() => {
                setSelectedRow(rowData);
                setEditJudul(rowData[nameField]);
                setEditDeskripsi(rowData[nameField2]);
                setEditPreviewGambar(`http://127.0.0.1:8000/storage/${rowData[nameField3]}`);
                setVisibleEdit(true);
              }}
            />
          )}
        />
        <Column
          header="Hapus"
          body={(rowData) => (
            <Button
              icon="pi pi-trash"
              className="bg-red-200 border-none"
              onClick={() => {
                setSelectedRow(rowData);
                setVisibleDelete(true);
              }}
            />
          )}
        />
      </DataTable>

      {/* Dialog Tambah */}
      <Dialog
        header={addDialogHeader}
        visible={visibleAdd}
        style={{ width: '90vw', maxWidth: '500px' }}
        onHide={() => setVisibleAdd(false)}
      >
        <div className="p-fluid">
          <div className="field">
            <label>Judul</label>
            <InputText value={judul} onChange={(e) => setJudul(e.target.value)} />
          </div>

          <div className="field">
            <label>Deskripsi</label>
            <InputText value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
          </div>

          <div className="field">
            <label>Gambar</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              chooseLabel="Pilih File"
              customUpload
              uploadHandler={(e) => {
                const file = e.files[0];
                setGambarFile(file);
                setPreviewGambar(URL.createObjectURL(file));
              }}
            />
            {previewGambar && (
              <img
                src={previewGambar}
                alt="preview"
                style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }}
              />
            )}
          </div>

          <div className="flex justify-content-end mt-3 gap-2">
            <Button label="Simpan" icon="pi pi-check" onClick={handleAdd} />
            <Button label="Batal" icon="pi pi-times" onClick={() => setVisibleAdd(false)} />
          </div>
        </div>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog
        header={editDialogHeader}
        visible={visibleEdit}
        style={{ width: '90vw', maxWidth: '500px' }}
        onHide={() => setVisibleEdit(false)}
      >
        <div className="p-fluid">
          <div className="field">
            <label>Judul</label>
            <InputText value={editJudul} onChange={(e) => setEditJudul(e.target.value)} />
          </div>

          <div className="field">
            <label>Deskripsi</label>
            <InputText value={editDeskripsi} onChange={(e) => setEditDeskripsi(e.target.value)} />
          </div>

          <div className="field">
            <label>Ganti Gambar (Opsional)</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              chooseLabel="Pilih File"
              customUpload
              uploadHandler={(e) => {
                const file = e.files[0];
                setEditGambarFile(file);
                setEditPreviewGambar(URL.createObjectURL(file));
              }}
            />
            {editPreviewGambar && (
              <img
                src={editPreviewGambar}
                alt="preview"
                style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }}
              />
            )}
          </div>

          <div className="flex justify-content-end mt-3 gap-2">
            <Button label="Perbarui" icon="pi pi-check" onClick={handleUpdate} />
            <Button label="Batal" icon="pi pi-times" onClick={() => setVisibleEdit(false)} />
          </div>
        </div>
      </Dialog>

      {/* Dialog Hapus */}
      <Dialog
        header={`${deleteDialogHeader} ${selectedRow?.[nameField]}`}
        visible={visibleDelete}
        style={{ width: '90vw', maxWidth: '400px' }}
        onHide={() => setVisibleDelete(false)}
      >
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
        <div className="flex justify-content-end mt-3 gap-2">
          <Button label="Batal" icon="pi pi-times" onClick={() => setVisibleDelete(false)} />
          <Button
            label="Hapus"
            icon="pi pi-check"
            onClick={() => {
              onDelete(selectedRow[idField]);
              setVisibleDelete(false);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default DataTableWithCRUD;
