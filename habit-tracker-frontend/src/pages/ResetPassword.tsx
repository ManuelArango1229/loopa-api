import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/reset-password", {
        token,
        newPassword: password,
      });

      setMessage("¡Contraseña restablecida con éxito!");
    } catch (err) {
      console.error(err);
      setMessage("Error al restablecer la contraseña.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Restablecer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
