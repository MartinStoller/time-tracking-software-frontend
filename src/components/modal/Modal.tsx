import React from 'react';
import './modal.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) =>
    isOpen ? (
        <div className="modal">
            <div className="modal-overlay" />
            <div className="modal-box">
                <div className="modal-content">{children}</div>
            </div>
        </div>
    ) : null;
