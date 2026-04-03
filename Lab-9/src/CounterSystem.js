import { useState } from "react";

export default function CounterSystem() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: "center", marginTop: "80px", fontFamily: "Arial" }}>
            <h2> Counter App </h2>
            <h1 style={{ fontSize: "64px", margin: "20px 0", color: "#2c3e50" }}> {count} </h1>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <button onClick={() => setCount(count - 1)}
                style={{ padding: "12px 28px", fontSize: "20px", background: "#e74c3c",
                    color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                        - Decrement
                </button>
                <button onClick={() => setCount(count + 1)}
                    style={{ padding: "12px 28px", fontSize: "20px", background: "#27ae60",
                    color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                        + Increment
                        </button>
            </div>
        </div>
    );
}