import { X } from 'lucide-react';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - separate element */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
        onClick={onClose}
      />
      
      {/* Modal - separate element */}
      <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 pointer-events-none">
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-black pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-black">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 text-black">
            {children}
          </div>
          
          {actions && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 text-black">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;