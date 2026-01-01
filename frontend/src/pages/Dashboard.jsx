import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard({ onLogout }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
        const res = await api.get("applications/");
        setApps(res.data);
  } catch(err) {
    if (err?.response?.status === 401) {
      setErrorMsg("Session expired. Please login again.");
      onLogout?.();
      try { navigate('/login/'); } catch(e) {}
    } else {
      setErrorMsg("Failed to load applications.");
    }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [])

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout?.();
    navigate('/login/');
  };

  return (
    <div className="dashboard-main">
      <div className="dash-heading">
  <h2>Dashboard</h2>
  <button type="button" onClick={handleLogout}>Logout</button> <br />
        <button onClick={() => navigate("/add-applications/")}>Add Applications</button>
      </div>
      <div className="dash-body">
        {loading && <p>Loading Applications...</p>}
        {errorMsg && <p>{errorMsg}</p>}

        {!loading && !errorMsg && (
          <>
            {apps.length === 0 ? (
                <p>No applications yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Applied Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apps.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.company}</td>
                                <td>{a.role}</td>
                                <td>{a.status}</td>
                                <td>{a.applied_date || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
