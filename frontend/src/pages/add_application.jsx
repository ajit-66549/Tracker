import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AddApplications() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("APPLIED");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setSubmitting(true);

        try {
            await api.post("/applications/", {company, role, status});
            navigate("/dashboard/");
        } catch(err) {
            console.log("ADD ERROR:", err?.response?.data);
            setMessage("❌ Failed to add.");
        } finally {
            setSubmitting(false);
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
            <button type="submit" disabled={submitting}>
                {submitting ? "Saving...": "Add"}
            </button>
        </form>

        {message && <p>{message}</p>}
    </div>
};

export default AddApplications;