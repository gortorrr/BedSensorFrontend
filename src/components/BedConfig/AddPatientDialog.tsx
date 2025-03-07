// components/AddPatientDialog.tsx
import React from 'react';

interface AddPatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // ถ้า dialog ไม่เปิดก็จะไม่แสดงอะไร

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">รายการผู้ป่วยที่ไม่มีเตียง</h2>
        <p className="mb-4">รอก่อนนะจ้ะ</p>
        <button
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
          onClick={onClose}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default AddPatientDialog;
