import React, { useState, useEffect } from 'react';

const FoodForm = ({ fetchFoods, foodToEdit, setFoodToEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [remaining, setRemaining] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (foodToEdit) {
            setName(foodToEdit.name);
            setDescription(foodToEdit.description);
            setRemaining(foodToEdit.remaining);
            setPrice(foodToEdit.price);
        } else {
            resetForm();
        }
    }, [foodToEdit]); 

    const resetForm = () => {
        setName('');
        setDescription('');
        setRemaining(0);
        setPrice(0);
        setFoodToEdit(null); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = foodToEdit ? 'PUT' : 'POST';
        const url = foodToEdit ? 'http://localhost:8000/update.php' : 'http://localhost:8000/create.php';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    id: foodToEdit?.id, 
                    name, 
                    description, 
                    remaining, 
                    price: parseInt(price) 
                }),
            });

            if (!response.ok) {
                throw new Error('Respons jaringan tidak ok');
            }

            await response.json();
            fetchFoods();
            resetForm(); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-center">{foodToEdit ? 'Edit Makanan' : 'Tambah Makanan'}</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <div className="form-group">
                    <label htmlFor="foodName">Nama Makanan</label>
                    <input
                        type="text"
                        className="form-control"
                        id="foodName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foodDescription">Deskripsi</label>
                    <textarea
                        className="form-control"
                        id="foodDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foodRemaining">Sisa Stok</label>
                    <input
                        type="number"
                        className="form-control"
                        id="foodRemaining"
                        value={remaining}
                        onChange={(e) => setRemaining(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foodPrice">Harga</label>
                    <input
                        type="number"
                        className="form-control"
                        id="foodPrice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {foodToEdit ? 'Perbarui Makanan' : 'Tambah Makanan'}
                </button>
                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={resetForm}>
                    Reset
                </button>
            </form>
        </div>
    );
};

export default FoodForm;