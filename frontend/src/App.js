import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FoodForm from './components/FoodForm';
import FoodList from './components/FoodList';
import Cashier from './components/Cashier';

const App = () => {
    const [foods, setFoods] = useState([]);
    const [foodToEdit, setFoodToEdit] = useState(null);

    const fetchFoods = async () => {
        const response = await fetch('http://localhost:8000/read.php');
        const data = await response.json();
        setFoods(data);
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <Router>
            <div className="container">
                <h1 className="text-center">Aplikasi CRUD Makanan</h1>
                <nav className="mb-4">
                    <Link to="/" className="btn btn-primary mr-2">Home</Link>
                    <Link to="/cashier" className="btn btn-secondary">Kasir</Link>
                </nav>
                <Routes>
                    <Route path="/" element={
                        <>
                            <FoodForm fetchFoods={fetchFoods} foodToEdit={foodToEdit} setFoodToEdit={setFoodToEdit} />
                            <FoodList foods={foods} setFoodToEdit={setFoodToEdit} fetchFoods={fetchFoods} />
                        </>
                    } />
                    <Route path="/cashier" element={<Cashier />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;