import { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from '@/plugins/endpoints';
import {usePage} from "@inertiajs/react";

export default function ItemCreateEditFormPage({ itemToEdit, closeModal }) {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const user = usePage().props.auth.user;
    const uid = user.id;

    // Set initial state if editing an item
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = {
            name,
            serial_number: serialNumber,
            category_id: categoryId,
            uid: uid,
        };
        console.log(uid)
        console.log(categoryId)
        const request = itemToEdit
            ? axios.put(endpoints.resolve(endpoints.items.edit, { id: itemToEdit.id }), data)
            : axios.post(endpoints.resolve(endpoints.items.create, { category_id: categoryId , uid: uid }), data);

        request
            .then((response) => {
                setLoading(false);
                closeModal();
            })
            .catch((error) => {
                setLoading(false);
                setError("Failed to save item.");
                console.error("Error:", error);
            });
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full sm:w-96">
                <h2 className="text-xl font-semibold mb-4">{itemToEdit ? 'Edit Item' : 'Create Item'}</h2>
                <form onSubmit={handleSubmit}>
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
                        <input
                            type="text"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
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
                    </div>
                </form>
            </div>
        </div>
    );
}
