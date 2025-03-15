import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import endpoints from '@/plugins/endpoints';

export default function ProductCategoriesListPage() {
    const user = usePage().props.auth.user;
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

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

    return (
        <div className="container mx-auto p-6">
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
                            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCategories.map((category, index) => {
                            const edit_endpoint = endpoints.resolve(endpoints.product_categories.edit, { id: category.id });

                            return (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link
                                            href={edit_endpoint}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md text-sm mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-sm"
                                        >
                                            Remove
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
        </div>
    );
}
