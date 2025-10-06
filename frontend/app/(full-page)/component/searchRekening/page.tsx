import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

interface SearchRekeningProps {
  onAccountSelect: (account: any) => void;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchRekening: React.FC<SearchRekeningProps> = ({ 
  onAccountSelect, 
  placeholder = 'Cari atau Masukkan Nomor Rekening Anda',
  value,
  onChange
}) => {
  const [visible, setVisible] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<any[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GETALLPRODUK);
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };
    fetchAccountData();
  }, []);

  useEffect(() => {
    setFilteredAccounts(
      accounts.filter((item) =>
        item.Cif.toString().toLowerCase().includes(value.toLowerCase()) ||
        item.NomorRekening.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value, accounts]);

  const onRowClick = (e: any) => {
    onAccountSelect(e.data);
    setVisible(false);
  };

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <>
      <div className='flex gap-2 mb-4 justify-content-end'>
        <InputText
          type="text"
          placeholder={placeholder}
          className="p-inputtext p-component w-4"
          value={value}
          onChange={onChange}
        />
        <Button
          icon="pi pi-search"
          onClick={() => setVisible(true)}
          style={{ backgroundColor: 'transparent', border: '1px solid', color: '#333' }}
        />
      </div>
      <Dialog visible={visible} onHide={() => setVisible(false)} header="Search Account" style={{ width: '70vw' }}>
        <div className="p-inputgroup mb-3">
          <span className="p-inputgroup-addon"><i className="pi pi-search"></i></span>
          <InputText
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full"
          />
        </div>
        <DataTable
          value={filteredAccounts.slice(first, first + rows)}
          onRowClick={onRowClick}
          className='cursor-pointer'
          rowClassName={(data) => `hover:bg-gray-100`}
        >
          <Column field="Cif" header="Cif" />
          <Column field="NomorRekening" header="Nomor Rekening" />
          <Column field="Nama" header="Nama" />
        </DataTable>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={filteredAccounts.length}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onPageChange}
        />
      </Dialog>
    </>
  );
};

export default SearchRekening;