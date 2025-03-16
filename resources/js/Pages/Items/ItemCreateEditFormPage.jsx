import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import endpoints from '@/plugins/endpoints';
import { usePage } from "@inertiajs/react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

export default function ItemCreateEditFormPage({ itemToEdit, closeModal }) {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [showScanner, setShowScanner] = useState(false);
    const scannerRef = useRef(null);
    const user = usePage().props.auth.user;
    const uid = user.id;

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setSerialNumber(itemToEdit.serial_number);
        }
    }, [itemToEdit]);

    useEffect(() => {
        const path = window.location.pathname;
        const categoryIdFromPath = path.split('/').pop();
        setCategoryId(categoryIdFromPath);
    }, []);

    useEffect(() => {
        if (showScanner) {
            scannerRef.current = new Html5QrcodeScanner("reader", {
                fps: 10,
                qrbox: 250,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            });

            scannerRef.current.render(
                (decodedText) => {
                    console.log("Scanned:", decodedText);
                    setSerialNumber(decodedText);
                    setShowScanner(false);
                },
                (errorMessage) => {
                    console.warn("Scan error:", errorMessage);
                }
            );
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear()
                    .catch(err => console.warn("Failed to clear scanner:", err));
            }
        };
    }, [showScanner]);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-[600px]">
                <h2 className="text-xl font-semibold mb-4 border border-gray-300 bg-gray-100">{itemToEdit ? 'Edit Item' : 'Create Item'}</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                            <span className="mx-2">OR</span>
                            <button
                                type="button"
                                onClick={() => setShowScanner(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md"
                            >
                                Scan QR Code
                            </button>
                        </div>
                    </div>
                    {showScanner && (
                        <div className="mb-4">
                            <div id="reader" className="border border-gray-300 p-2 rounded-md"></div>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : itemToEdit ? 'Update Item' : 'Create Item'}
                        </button>
                        {!itemToEdit && (
                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e, true)}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md ml-2"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Create and Create Another'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
