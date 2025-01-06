import React, { useState } from "react";
import { createAccessToken } from "./CustomerApi.ts";
import { AccessTokenFormData } from "./types";
const AccessTokenForm: React.FC = () => {
  const [formData, setFormData] = useState<AccessTokenFormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAccessToken(null);
    setErrorMessage(null);

    try {
      const response = await createAccessToken(formData);
      setAccessToken(
        response.customerAccessTokenCreate.customerAccessToken.accessToken
      );
    } catch (error) {
      setErrorMessage("Failed to create access token. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Access Token</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Generating..." : "Generate Token"}
        </button>
      </form>
      {accessToken && (
        <div>
          <h3>Access Token</h3>
          <p style={{ wordBreak: "break-all" }}>{accessToken}</p>
        </div>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default AccessTokenForm;
