import React, { useEffect, useState } from "react";

export const FeatchDataInputBtn = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState(null);
    const [filteredUser, setFilteredUser] = useState(null); 

    async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const result = await response.json();
            if (!response.ok) {
                throw new Error("Помилка завантаження даних");
            }
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    const handleClick = () => {
        const parsedInput = Number(inputText.trim());
        if (inputText.trim() === "0") {
            setFilteredUser("not_found");  
            return 
        }
        if (!isNaN(parsedInput) && parsedInput !== 0) {
            const user = data.find((user) => user.id === parsedInput);
            setFilteredUser(user || "not_found");
            return
        } 
        if (isNaN(parsedInput)) {
            setFilteredUser("not_found");  
            return 
        }
        setFilteredUser(null);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Введіть id користувача"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={handleClick}>Оновити дані</button>
            <ul>
                {filteredUser === null ? (
                    <li>Введіть id користувача</li>
                ) : filteredUser === "not_found" ? (
                    <li>Немає такого користувача</li>
                ) : (
                    <li key={filteredUser.id}>{filteredUser.username}</li>
                )}
            </ul>
        </div>
    );
};
