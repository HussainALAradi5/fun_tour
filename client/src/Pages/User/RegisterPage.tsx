import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AuthService from "../../utilities/Services/AuthServices"
import CountryApiService from "../../utilities/Services/CountryService"
import PrimaryForm from "../../Components/PrimaryForm"
import type { FormFieldConfig } from "../../Components/PrimaryForm"

const RegisterPage = () => {
  const navigateToLogin = useNavigate()
  const [groupedCountryOptions, setGroupedCountryOptions] = useState<
    {
      label: string
      options: { label: string; value: string; flag?: string }[]
    }[]
  >([])

  useEffect(() => {
    const fetchAndGroupCountries = async () => {
      try {
        const countryResponse = await CountryApiService.getAllCountries()
        if (!Array.isArray(countryResponse)) {
          console.error("Expected array but received:", countryResponse)
          return
        }

        const formattedCountryOptions = countryResponse.map((country: any) => ({
          label: country.countryName,
          value: country.countryName,
          flag: convertIsoCodeToFlagEmoji(country.isoCode),
        }))

        const grouped = groupCountriesByFirstLetter(formattedCountryOptions)
        setGroupedCountryOptions(grouped)
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }

    fetchAndGroupCountries()
  }, [])

  const convertIsoCodeToFlagEmoji = (isoCode: string): string =>
    isoCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      )

  const groupCountriesByFirstLetter = (
    countries: { label: string; value: string; flag?: string }[]
  ) => {
    const grouped: Record<string, typeof countries> = {}

    for (const country of countries) {
      const letter = country.label[0].toUpperCase()
      if (!grouped[letter]) grouped[letter] = []
      grouped[letter].push(country)
    }

    return Object.keys(grouped)
      .sort()
      .map((letter) => ({
        label: letter,
        options: grouped[letter].sort((a, b) => a.label.localeCompare(b.label)),
      }))
  }

  const registrationFormFields: FormFieldConfig[] = [
    { name: "userName", label: "Username", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "mobileNumber", label: "Mobile Number", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
    { name: "email", label: "Email", type: "text" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: groupedCountryOptions,
    },
  ]

  const handleRegistrationFormSubmit = async (
    formData: Record<string, any>
  ) => {
    const payload = {
      ...formData,
      country: { countryName: formData.country },
      roleEnum: "USER",
    }

    try {
      await AuthService.register(payload)
      navigateToLogin("/login")
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Register
        </h2>
        <PrimaryForm
          formFields={registrationFormFields}
          onSubmit={handleRegistrationFormSubmit}
          submitLabel="Register"
        />
      </div>
    </main>
  )
}

export default RegisterPage
