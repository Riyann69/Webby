import { useState } from "react";

export default function ItemList() {
    const [items, setItems] = useState(["MongoDB", "React", "Node.js"])
    const [input, setInput] = useState("");

    const addItem = () => {
        if(!input.trim()) return;
        setItems([...items, input.trim()]);
        setInput("");
     };

     const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
     };

     return (
        <div style={{ maxWidth: "420px", margin: "50px auto", padding: "28px",
                      border: "1px solid #ddd", borderRadius: "10px",
                      fontFamily: "Arial", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>📋 Item List</h2>
    
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)}
                   placeholder="Add new item..."
                   style={{ flex: 1, padding: "10px", border: "1px solid #ddd",
                            borderRadius: "6px", fontSize: "14px" }} />
            <button onClick={addItem}
              style={{ padding: "10px 16px", background: "#27ae60", color: "white",
                       border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
              Add
            </button>
          </div>
    
          {items.length === 0
            ? <p style={{ color: "#aaa" }}>No items yet. Add one above!</p>
            : items.map((item, index) => (
                <div key={index}
                  style={{ display: "flex", justifyContent: "space-between",
                           alignItems: "center", padding: "10px 14px", marginBottom: "8px",
                           background: "#f9f9f9", border: "1px solid #eee", borderRadius: "6px" }}>
                  <span>{item}</span>
                  <button onClick={() => removeItem(index)}
                    style={{ background: "#e74c3c", color: "white", border: "none",
                             borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}>
                    Remove
                  </button>
                </div>
              ))
          }
        </div>
      );
    }