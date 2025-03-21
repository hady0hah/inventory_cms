import { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import endpoints from '@/plugins/endpoints';
import ProductCategoryCreateEditFormPage from "@/Pages/ProductCategories/ProductCategoryCreateEditFormPage.jsx";


export default function ProductCategoriesListPage() {
    const user = usePage().props.auth.user;
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    useEffect(() => {
        axios.get(endpoints.product_categories.list)
            .then(response => {
                setCategories(response.data);
                setFilteredCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Failed to load categories.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (search) {
            setFilteredCategories(
                categories.filter(category =>
                    category.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredCategories(categories);
        }
    }, [search, categories]);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        const delete_endpoint = endpoints.resolve(endpoints.product_categories.delete, { id });

        axios.delete(delete_endpoint)
            .then(() => {
                setCategories(categories.filter(category => category.id !== id));
                setFilteredCategories(filteredCategories.filter(category => category.id !== id));
            })
            .catch(error => console.error("Error deleting category:", error));
    };

    const handleCreateCategory = () => {
        setCategoryToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category) => {
        setCategoryToEdit(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCategoryToEdit(null);
    };

    const handleShowItems = (category_id) => {
        var items_list_page = endpoints.resolve(endpoints.items.list_page, { category_id });
        window.location.href = items_list_page;

    };

    return (
        <>
            <div className="container mx-auto p-6">
            <button
                onClick={handleCreateCategory}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mb-4"
            >
                Add Category
            </button>
            <h1 className="text-2xl font-bold mb-4">Product Categories</h1>

            <input
                type="text"
                placeholder="Search Categories By Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />

            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && filteredCategories.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Category ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Count</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCategories.map((category, index) => {
                            const edit_endpoint = endpoints.resolve(endpoints.product_categories.edit, { id: category.id });

                            return (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{category.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{category.available_items_count}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleEditCategory(category)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md text-sm mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-sm mr-2"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            onClick={() => handleShowItems(category.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md text-sm"
                                        >
                                            Show Items
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && !error && filteredCategories.length === 0 && (
                <p className="text-gray-500">No categories found.</p>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-full sm:w-1/2">
                        <ProductCategoryCreateEditFormPage
                            categoryToEdit={categoryToEdit}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
