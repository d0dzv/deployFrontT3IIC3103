import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Chatbot() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://127.0.0.1:8000/query', { question });
            setResponse(result.data.answer);
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setResponse('Error al obtener respuesta. Intenta de nuevo.');
        }
    };

    const movies = [
        "Dogma", "Drive", "Election", "Enough", "Foxcatcher",
        "Gamer", "Gandhi", "Go", "Godzilla", "Heist"
    ];

    return (
        <div className="container">
            <h1>Chatbot de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                />
                <button type="submit">Enviar</button>
            </form>
            <div className="response">
                {response || "Esperando tu pregunta..."}
            </div>
            <div className="movie-list">
                <h2>Películas Disponibles</h2>
                <ul>
                    {movies.map((movie, index) => (
                        <li key={index}>{movie}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Chatbot;
