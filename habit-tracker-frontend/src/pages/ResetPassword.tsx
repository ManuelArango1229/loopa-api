import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Muestra los valores antes de enviarlos
    console.log("Enviando datos...");
    console.log("Token:", token);
    console.log("Nueva contraseña:", password);
  
    try {
      const res = await axios.post("http://localhost:3000/api/users/reset-password", {
        token,
        newPassword: password,
      });
  
      setMessage(res.data.message); // Usamos el mensaje del backend
    } catch (err: any) {
      console.error("Error en la respuesta del backend:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error al restablecer la contraseña.");
    }
  };
  

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{token}</h1>
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
