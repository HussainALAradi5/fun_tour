import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AuthService from "../../utilities/Services/AuthServices"
import CountryApiService from "../../utilities/Services/CountryService"
import PrimaryForm from "../../Components/PrimaryForm"
import type { FormFieldConfig } from "../../Components/PrimaryForm"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string; flag?: string }[]
  >([])

  useEffect(() => {
    const loadCountryOptions = async () => {
      try {
        const countries = await CountryApiService.getAllCountries()
        if (!Array.isArray(countries)) {
          console.error("Expected array but got:", countries)
          return
        }

        const formattedOptions = countries.map((country: any) => ({
          label: country.countryName,
          value: country.countryName,
          flag: convertIsoToEmoji(country.isoCode),
        }))

        setCountryOptions(formattedOptions)
      } catch (error) {
        console.error("Failed to load countries:", error)
      }
    }

    loadCountryOptions()
  }, [])

  const convertIsoToEmoji = (isoCode: string): string =>
    isoCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      )

  const formFields: FormFieldConfig[] = [
    { name: "userName", label: "Username", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "mobileNumber", label: "Mobile Number", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "email", label: "Email", type: "text" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: countryOptions,
    },
  ]

  const handleFormSubmit = async (formData: Record<string, any>) => {
    const registrationPayload = {
      ...formData,
      country: { countryName: formData.country },
      roleEnum: "USER",
    }

    try {
      await AuthService.register(registrationPayload)
      navigate("/login")
    } catch (error) {
      console.error("Register error:", error)
    }
  }

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <PrimaryForm
        formFields={formFields}
        onSubmit={handleFormSubmit}
        submitLabel="Register"
      />
    </div>
  )
}

export default RegisterPage
