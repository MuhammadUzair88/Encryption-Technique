import React, { useState } from "react";
import axios from "axios";

const App = () => {
  // States for Encryption
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // States for Decryption
  const [decryptEmail, setDecryptEmail] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");

  // Submit handler for Encryption
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, address, phone, password };

    try {
      await axios.post("http://localhost:5000/api/user", userData);
      alert("User data stored securely!");

      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while storing user data!");
    }
  };

  // Submit handler for Decryption
  const handleDecrypt = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/decrypt", {
        email: decryptEmail,
      });

      setDecryptedPassword(response.data.decryptedPassword);
    } catch (err) {
      console.error(err);
      alert("Failed to decrypt password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        User Security Panel
      </h1>
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
        {/* Encryption Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center text-blue-600">
            Encrypt & Store User
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Submit Securely
            </button>
          </form>
        </div>

        {/* Decryption Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center text-green-600">
            Decrypt User Password
          </h2>
          <form onSubmit={handleDecrypt} className="space-y-5">
            <input
              type="email"
              placeholder="Enter Email to Decrypt"
              required
              value={decryptEmail}
              onChange={(e) => setDecryptEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
            >
              Decrypt Password
            </button>
          </form>

          {decryptedPassword && (
            <div className="mt-5 p-4 bg-gray-100 rounded-lg text-center text-lg font-medium text-gray-700">
              Decrypted Password:{" "}
              <span className="text-black">{decryptedPassword}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
