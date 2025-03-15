import { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from '@/plugins/endpoints';

export default function ProductCategoryCreateEditFormPage({ categoryToEdit, closeModal }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePath(URL.createObjectURL(file));
    };

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setDescription(categoryToEdit.description || '');
            setImagePath(categoryToEdit.image_path || '');
        }
    }, [categoryToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        if (image) {
            formData.append('image', image);
        } else if (categoryToEdit && categoryToEdit.image_path) {
            formData.append('image_path', categoryToEdit.image_path);
        }

        const request = categoryToEdit
            ? axios.put(endpoints.resolve(endpoints.product_categories.edit, { id: categoryToEdit.id }), formData)
            : axios.post(endpoints.product_categories.create, formData);

        request
            .then((response) => {
                setLoading(false);
                closeModal();
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            {imagePath && <img src={imagePath} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
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
                    {loading ? 'Saving...' : categoryToEdit ? 'Update Category' : 'Create Category'}
                </button>
            </div>
        </form>
    );
}
