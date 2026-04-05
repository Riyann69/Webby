import { useState } from "react";

export default function FormValidation() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())
      newErrors.name = "Name is required";
    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.password.trim())
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSuccess(true);
      setForm({ name: "", email: "", password: "" });
      setErrors({});
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "10px", marginBottom: "4px",
    border: `1px solid ${errors[field] ? "#e74c3c" : "#ddd"}`,
    borderRadius: "6px", fontSize: "14px"
  });

  return (
    <div style={{ maxWidth: "420px", margin: "50px auto", padding: "28px",
      border: "1px solid #ddd", borderRadius: "10px",
      fontFamily: "Arial", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}> Registration Form </h2>

        {success && <p style={{ color: "green", marginBottom: "12px" }}> Submitted Successfully! </p>}

        <form onSubmit={handleSubmit}>
          <label> Name </label>
          <input name="name" value={form.name} onChange={handleChange}
          placeholder="Enter name" style={inputStyle("name")} />
          {errors.name && <p style={{ color: "#e74c3c", fontSize: "12px", marginBottom: "8px" }}> {errors.name} </p>}

          <label> Email </label>
          <input name="email" value={form.email} onChange={handleChange}
          placeholder="Enter email" style={inputStyle("email")} />
          {errors.email && <p style={{ color: "#e73c3c", fontSize: "12px", marginBottom: "8px" }}> {errors.email} </p>}

          <label> Password </label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
          placeholder="Min 6 characters" style={inputStyle("password")} />
          {errors.placeholder && <p style={{ color: "e74c3c", fontSize: "12px", marginBottom: "8px" }}> {errors.password} </p>}

          <button typ="submit"
          style={{ width: "100%", padding: "12px", marginTop: "12px", background: "#2980b9",
            color: "white", border: "none", borderRadius: "6px",
            fontSize: "15px", cursor: "pointer" }}> Submit </button>
        </form>
      </div> 
  );
}