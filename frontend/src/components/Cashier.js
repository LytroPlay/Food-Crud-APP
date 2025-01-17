import React, { useState, useEffect } from 'react';

const Cashier = () => {
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);

    const fetchFoods = async () => {
        const response = await fetch('http://localhost:8000/read.php');
        const data = await response.json();
        setFoods(data);
    };

    const handleAddTransaction = () => {
        if (selectedFood && quantity > 0) {
            const transaction = {
                id: selectedFood.id,
                name: selectedFood.name,
                quantity,
                total: selectedFood.price * quantity, 
            };
            setTransactions([...transactions, transaction]);
            setTotalPayment(prevTotal => prevTotal + transaction.total); 
            setQuantity(1); 
            setSelectedFood(null); 
        }
    };

    const handlePayment = () => {
        
        alert(`Total pembayaran: Rp ${totalPayment}`);
        setTransactions([]); 
        setTotalPayment(0); 
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Kasir</h2>
            <div className="form-group">
                <label htmlFor="foodSelect">Pilih Makanan</label>
                <select
                    id="foodSelect"
                    className="form-control"
                    onChange={(e) => {
                        const food = foods.find(f => f.id === parseInt(e.target.value));
                        setSelectedFood(food);
                    }}
                >
                    <option value="">-- Pilih Makanan --</option>
                    {foods.map(food => (
                        <option key={food.id} value={food.id}>
                            {food.name} - Rp {food.price} {/* Asumsikan ada harga */}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Jumlah</label>
                <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                />
            </div>
            <button className="btn btn-primary" onClick={handleAddTransaction}>
                Tambah Transaksi
            </button>

            <h3 className="mt-4">Daftar Transaksi</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Makanan</th>
                        <th>Jumlah</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.name}</td>
                            <td>{transaction.quantity}</td>
                            <td>Rp {transaction.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>Total Pembayaran: Rp {totalPayment}</h4>
            <button className="btn btn-success" onClick={handlePayment}>
                Bayar
            </button>
        </div>
    );
};

export default Cashier;