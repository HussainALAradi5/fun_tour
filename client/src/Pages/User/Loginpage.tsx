import { useNavigate } from "react-router-dom"
import AuthService from "../../utilities/Services/AuthServices"
import PrimaryForm from "../../Components/PrimaryForm"
import type { FormFieldConfig } from "../../Components/PrimaryForm"

const LoginPage = () => {
  const navigate = useNavigate()

  const loginFields: FormFieldConfig[] = [
    { name: "identifier", label: "Email or Username", type: "text" },
    { name: "password", label: "Password", type: "text" },
  ]

  const handleLogin = async (formData: Record<string, any>) => {
    const { identifier, password } = formData

    try {
      const user = await AuthService.login({ identifier, password })
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/profile")
    } catch (err) {
      console.error("Login error:", err)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>
        <PrimaryForm
          formFields={loginFields}
          onSubmit={handleLogin}
          submitLabel="Login"
        />
      </div>
    </main>
  )
}

export default LoginPage
