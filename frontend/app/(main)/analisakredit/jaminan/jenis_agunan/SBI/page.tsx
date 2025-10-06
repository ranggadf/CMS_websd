import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

interface SBIPageProps {
  onChange: (data: any) => void;
  defaultValue?: {
    keterangan: string;
  };
}

const SBIPage: React.FC<SBIPageProps> = ({ onChange, defaultValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ keterangan: e.target.value });
  };

  return (
    <fieldset className="mb-4 p-4 border-round">
      <legend className="text-xl font-bold">SBI</legend>
      <div className="grid">
        <div className="col-12">
          <label htmlFor="keterangan" className="block mb-2">Keterangan</label>
          <InputTextarea
            id="keterangan"
            rows={4}
            className="w-full"
            placeholder="Keterangan"
            onChange={handleChange}
            value={defaultValue?.keterangan}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default SBIPage;
