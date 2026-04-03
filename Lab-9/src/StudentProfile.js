function StudentProfile() {
    const name = "Tanisha";
    const department = "Computer Science";
    const year = "3rd Year";
    const section = "A";
  
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "24px",
                    border: "1px solid #ddd", borderRadius: "10px",
                    fontFamily: "Arial", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "16px" }}>🎓 Student Profile</h2>
        <p><strong>Name: </strong> {name}</p>
        <p><strong>Department: </strong> {department}</p>
        <p><strong>Year: </strong> {year}</p>
        <p><strong>Section: </strong> {section}</p>
      </div>
    );
  }
  
export default StudentProfile;