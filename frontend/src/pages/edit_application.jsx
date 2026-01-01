import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function EditApplication({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("APPLIED");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Get the application with given id
  useEffect(() => {
    const fetchOne = async () => {
      setMessage("");
      try {
        const res = await api.get(`/applications/${id}/`);
        setCompany(res.data.company || "");
        setRole(res.data.role || "");
        setStatus(res.data.status || "APPLIED");
      } catch (err) {
        if (err?.response?.status === 401) {
          setMessage("Session expired. Please login again.");
          onLogout?.();
        } else {
          setMessage("Failed to load application.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOne();
  }, [id, onLogout]);

  // Save changes on that application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await api.patch(`/applications/${id}/`, { company, role, status });
      navigate("/dashboard/");
    } catch (err) {
      if (err?.response?.status === 401) {
        setMessage("Session expired. Please login again.");
        onLogout?.();
      } else {
        console.log("EDIT ERROR:", err?.response?.data);
        setMessage("❌ Failed to update.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="add-form">
      <h2>Edit Application</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />

        <input
          type="text"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="APPLIED">Applied</option>
          <option value="OFFER">Offer</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OA">Online Assessment</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
