import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onCancel, onConfirm }) => {
  // Apply a class to the root element conditionally based on the modal's visibility
  const modalContainerClass = isOpen ? '' : 'hidden';

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${modalContainerClass}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-sm"></div>{' '}
        {/* Background blur effect */}
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative z-10">
          <div className="p-4">
            <div className="text-lg font-semibold mb-4" id="modal-title">
              {title}
            </div>
            <div className="mb-6">{message}</div>
            <div className="flex justify-end">
              <button
                onClick={onCancel}
                className="py-2 px-4 mr-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
