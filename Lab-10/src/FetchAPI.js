import { useState, useEffect } from "react";

export default function FetchUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        })
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p style={{ textAlign: "center", marginTop: "60px", fontSize: "18px" }}> Loading... </p>;
    if (error) return <p style={{ textAlign: "center", color: "red", marginTop: "60px" }}> Error: {error} </p>;

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px", fontFamily: "Arial" }}>
            <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}> Users from API </h2>
            {users.map(user => (
                <div key={user.id}
                style={{ padding: "16px", marginBottom: "12px", border: "1px solid #ddd",
                    borderRadius: "8px",  background: "#fafafa" }}>
                <h3 style={{ color: "#2980b9", marginBottom: "6px" }}> {user.name} </h3>
                <p> {user.email} </p>
                <p> {user.website} </p>
                <p> {user.company.name} </p>
            </div>
            ))}
        </div>
    );
}