import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { certificateApi } from "../api";
import SarvarthLogo from "../components/common/SarvarthLogo";
import "../styles/pages/verification.css";

const VerificationPage: React.FC = () => {
  const { code: urlCode } = useParams<{ code: string }>();

  const [code, setCode] = useState(urlCode || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleVerify = async (inputCode: string) => {
    if (!inputCode.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await certificateApi.verify(inputCode);
      setResult(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Certificate not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlCode) {
      handleVerify(urlCode);
    }
  }, [urlCode]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(code);
  };

  return (
    <div className="verification-page">
      <main className="verification-container">
        {/* Left Panel */}
        <div className="verification-left">
          <form className="verification-form" onSubmit={onSubmit}>
            <SarvarthLogo size="lg" />

            <h2>Verify Certificate</h2>

            <input
              type="text"
              placeholder="Enter certificate code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>

            {error && <p className="error">{error}</p>}
          </form>
        </div>

        {/* Right Panel */}
        <div className="verification-right">
          {result ? (
            <div className="certificate-card">
              <SarvarthLogo size="lg" />

              <h3>Certificate of Completion</h3>
              <h2>{result.holder_name || result.author_name}</h2>

              <p>Successfully completed</p>

              <h3>{result.certificate_title || result.title}</h3>

              <p>
                {result.authorized_date || result.issue_date
                  ? new Date(
                      result.authorized_date || result.issue_date
                    ).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          ) : (
            <p className="empty-text">
              Enter a certificate code to verify
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerificationPage;