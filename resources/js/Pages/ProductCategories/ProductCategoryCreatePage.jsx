import { useState } from 'react';
import axios from 'axios';
import endpoints from '@/plugins/endpoints';

const ProductCategoryCreatePage = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) formData.append('image', image);

        setLoading(true);

        try {
            const createCategoryEndpoint = endpoints.resolve(endpoints.product_categories.create, {});
            await axios.post(createCategoryEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Category created successfully!');
            closeModal();
        } catch (err) {
            setError('Error creating category');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create Category</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="px-4 py-2">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Category'}
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>
                </div>


            </form>
        </div>
    );
};

export default ProductCategoryCreatePage;
