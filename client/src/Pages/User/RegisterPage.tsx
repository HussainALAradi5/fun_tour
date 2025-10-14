import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AuthService from "../../utilities/Services/AuthServices"
import ApiCallerService from "../../utilities/Services/ApiCallerService"
import PrimaryForm from "../../Components/PrimaryForm"
import type { FormFieldConfig } from "../../Components/PrimaryForm"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState<string[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await ApiCallerService.get("/integration/countries")
        setCountries(data.map((c: any) => c.countryName))
      } catch (err) {
        console.error("Failed to load countries:", err)
      }
    }
    fetchCountries()
  }, [])

  const registerFields: FormFieldConfig[] = [
    { name: "userName", label: "Username", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "mobileNumber", label: "Mobile Number", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "country", label: "Country", type: "select", options: countries },
  ]

  const handleRegister = async (formData: Record<string, any>) => {
    const payload = {
      ...formData,
      country: { countryName: formData.country },
      roleEnum: "USER",
    }

    try {
      await AuthService.register(payload)
      navigate("/login")
    } catch (err) {
      console.error("Register error:", err)
    }
  }

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <PrimaryForm
        formFields={registerFields}
        onSubmit={handleRegister}
        submitLabel="Register"
      />
    </div>
  )
}

export default RegisterPage
