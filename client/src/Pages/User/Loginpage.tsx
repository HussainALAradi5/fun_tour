import { useNavigate } from "react-router-dom"
import { useState } from "react"
import AuthService from "../../utilities/Services/AuthServices"
import PrimaryForm from "../../Components/PrimaryForm"
import type { FormFieldConfig } from "../../Components/PrimaryForm"
import UserError from "./UserError"

const LoginPage = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loginFields: FormFieldConfig[] = [
    { name: "identifier", label: "Email or Username", type: "text" },
    { name: "password", label: "Password", type: "text" },
  ]

  const handleLogin = async (formData: Record<string, any>) => {
    const { identifier, password } = formData

    try {
      const user = await AuthService.login({ identifier, password })
      localStorage.setItem("user", JSON.stringify(user))
      setErrorMessage(null)
      navigate("/profile")
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again."
      setErrorMessage(message)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>

        {errorMessage && (
          <UserError
            message={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />
        )}

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
