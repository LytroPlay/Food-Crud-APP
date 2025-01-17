import React from 'react';

const FoodList = ({ foods, setFoodToEdit, fetchFoods }) => {
    const handleUpdateRemaining = async (id, change) => {
        const food = foods.find(f => f.id === id);
        const newRemaining = Math.max(0, food.remaining + change); 

        try {
            const response = await fetch('http://localhost:8000/update.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    id, 
                    name: food.name, 
                    description: food.description, 
                    remaining: newRemaining, 
                    price: food.price 
                }),
            });

            if (!response.ok) {
                throw new Error('Gagal memperbarui sisa makanan');
            }

            await response.json();
            fetchFoods(); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (food) => {
        setFoodToEdit(food);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus item makanan ini?")) {
            try {
                const response = await fetch('http://localhost:8000/delete.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }), 
                });

                if (!response.ok) {
                    throw new Error('Gagal menghapus makanan');
                }

                await response.json();
                fetchFoods(); 
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-center">Daftar Makanan</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Makanan</th>
                        <th>Deskripsi</th>
                        <th>Sisa Stok</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => (
                        <tr key={food.id}>
                            <td>{food.name}</td>
                            <td>{food.description}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleUpdateRemaining(food.id, -1)}>-</button>
                                <span className="mx-2">{food.remaining}</span>
                                <button className="btn btn-success btn-sm" onClick={() => handleUpdateRemaining(food.id, 1)}>+</button>
                            </td>
                            <td>Rp {food.price}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(food)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(food.id)}>
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FoodList;