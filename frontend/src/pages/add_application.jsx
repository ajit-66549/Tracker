import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AddApplications() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("applications/", {company, role, status});
            navigate("/dashboard/");
        } catch(err) {
            console.log("ADD ERROR:", err?.response?.data);
            setMessage("❌ Failed to add.");
        }
    };

    return <div className="add-form">
        <h2>Add Applications</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} />
            <input type="text" required value={role} onChange={(e) => setRole(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="APPLIED">Applied</option>
                <option value="OFFER">Offer</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OA">Online Assessment</option>
                <option value="REJECTED">Rejected</option>
            </select>
            <button type="submit">Add</button>
        </form>

        {message && <p>{message}</p>}
    </div>
};

export default AddApplications;