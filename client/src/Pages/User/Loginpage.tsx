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
    <div className="auth-page">
      <h2>Login</h2>
      <PrimaryForm
        formFields={loginFields}
        onSubmit={handleLogin}
        submitLabel="Login"
      />
    </div>
  )
}

export default LoginPage
