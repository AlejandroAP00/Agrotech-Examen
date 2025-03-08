import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Input from "../components/inputs/Input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/products");
    } catch (error) {
      setError("Usuario o contraseña incorrectos"); // Debug
    } 
  }; 

  return (
    <div className="">
      <div className="h-lvh flex items-center bg-gray-700">
        
        <div className="h-full flex flex-col justify-center bg-gray-950 px-6">
          

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <h1 className="text-gray-200 font-poppins-bold text-4xl"> Sign Up </h1>  
            
            <div className="w-[300px]">
              <Input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="px-5 py-2 cursor-pointer bg-sky-800 hover:bg-sky-900 transition rounded-sm w-full text-gray-200">Ingresar</button>
            </div>
          </form>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

      </div>
      
      
    </div>
  );
};

export default Login;
