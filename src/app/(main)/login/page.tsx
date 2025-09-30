"use client"

import { useState } from "react"
import { login } from "@/lib/auth"
import { TbEye, TbEyeClosed } from "react-icons/tb"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [ShowPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(username, password)
      window.location.href = "/"
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Login gagal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
        />

        {/* <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
          /> */}
        <div className="relative w-full">
          <input
            value={password}
            type={!ShowPassword ? "password" : "text"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full border rounded p-2`}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!ShowPassword)}
          >
            <p className="p-1 rounded-full text-blue-600 hover:bg-blue-500 hover:text-white">{ShowPassword ? <TbEye /> : <TbEyeClosed />}</p>
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  )
}
