import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import endpoints from '@/plugins/endpoints';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import CheckBoxComponent from '@/Components/Checkbox';
import ItemCreateEditFormPage from "@/Pages/Items/ItemCreateEditFormPage";

export default function ItemsListPage() {
    const user = usePage().props.auth.user;
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [category_id, setCategoryId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const uid = user.id;

    useEffect(() => {
        const path = window.location.pathname;
        const category_id = path.split('/').pop();
        setCategoryId(category_id);

        axios.get(endpoints.resolve(endpoints.items.list_data, { uid, category_id }))
            .then(response => {
                setItems(response.data);
                setFilteredItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Failed to load items.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (search) {
            setFilteredItems(items.filter(item =>
                item.serial_number.toLowerCase().includes(search.toLowerCase())
            ));
        } else {
            setFilteredItems(items);
        }
    }, [search, items]);

    const handleCreateItem = () => {
        setItemToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditItem = (item) => {
        setItemToEdit(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItemToEdit(null);
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        const delete_endpoint = endpoints.resolve(endpoints.items.delete, { id , uid });

        axios.delete(delete_endpoint)
            .then(() => {
                setItems(items.filter(item => item.id !== id));
                setFilteredItems(filteredItems.filter(item => item.id !== id));
            })
            .catch(error => console.error("Error deleting item:", error));
    };

    const handleSoldChange = (id) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, sold: !item.sold } : item
        );
        setItems(updatedItems);

        const item = updatedItems.find(item => item.id === id);
        axios.put(endpoints.resolve(endpoints.items.change_status, { id: item.id, uid }))
            .then(response => {
                const { is_sold } = response.data;
                const updatedItemsWithResponse = items.map(item =>
                    item.id === id ? { ...item, is_sold: is_sold } : item
                );
                setItems(updatedItemsWithResponse);
            })
            .catch(error => {
                console.error("Error updating item status:", error);
                setItems(items);
            });
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Inventory CMS Dashboard
                    </h2>
                }
            >
                <Head title="Items List" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mt-4">
                            <div className="pt-4 px-4">
                                <button
                                    onClick={handleCreateItem}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mb-4"
                                >
                                    Add Item
                                </button>

                                <h1 className="text-2xl font-bold mb-4">Items</h1>
                            </div>

                            <div className="container mx-auto p-6">
                                <input
                                    type="text"
                                    placeholder="Search Items By Serial Number..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="mb-4 p-2 border rounded w-full"
                                />

                                {loading && <p className="text-gray-600">Loading...</p>}
                                {error && <p className="text-red-500">{error}</p>}

                                {!loading && !error && filteredItems.length > 0 && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead className="bg-gray-100">
                                            <tr>
                                                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Serial Number</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredItems.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{item.serial_number}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button
                                                            onClick={() => handleEditItem(item)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md text-sm mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-sm mr-2"
                                                        >
                                                            Remove
                                                        </button>
                                                        <label>
                                                            <CheckBoxComponent
                                                                checked={item.is_sold}
                                                                onChange={() => handleSoldChange(item.id)}
                                                            />
                                                            Mark As Sold
                                                        </label>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {!loading && !error && filteredItems.length === 0 && (
                                    <p className="text-gray-500">No items found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-full sm:w-1">
                        <ItemCreateEditFormPage
                            itemToEdit={itemToEdit}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
