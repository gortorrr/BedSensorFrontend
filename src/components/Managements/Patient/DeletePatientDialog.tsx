import React from "react";

interface DeletePatientDialogProps {
  isOpen: boolean;
  //onConfirm: () => void;
  onCancel: () => void;
}

const DeletePatientDialog: React.FC<DeletePatientDialogProps> = ({
  isOpen,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          ยืนยันการลบข้อมูล
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          คุณต้องการลบเซ็นเซอร์นี้หรือไม่?
        </p>
        <div className="flex justify-around">
          <button
            //onClick={onConfirm}
            className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] cursor-pointer"
          >
            ยืนยัน
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 cursor-pointer"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePatientDialog;
