function StudentCard(props) {
    return (
      <div style={{ border: "1px solid #ddd", borderRadius: "10px",
                    padding: "20px", width: "220px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)", fontFamily: "Arial" }}>
        <h3 style={{ color: "#2980b9", marginBottom: "10px" }}>👤 {props.name}</h3>
        <p><strong>Department:</strong> {props.department}</p>
        <p><strong>Marks:</strong> {props.marks}</p>
      </div>
    );
  }
  
  export default function Exercise2() {
    return (
      <div style={{ display: "flex", gap: "20px", padding: "40px", flexWrap: "wrap" }}>
        <StudentCard name="Riyan"  department="CSE"  marks={87} />
        <StudentCard name="Tanisha" department="ECE"  marks={92} />
        <StudentCard name="Akshat"  department="Mech" marks={78} />
      </div>
    );
  }