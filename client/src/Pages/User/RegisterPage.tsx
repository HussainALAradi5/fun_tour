import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AuthService from "../../utilities/Services/AuthServices"
import CountryApiService from "../../utilities/Services/CountryService"
import PrimaryForm from "../../Components/PrimaryForm"
import type { FormFieldConfig } from "../../Components/PrimaryForm"
import UserError from "./UserError"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [groupedCountryOptions, setGroupedCountryOptions] = useState<
    {
      label: string
      options: { label: string; value: string; flag?: string }[]
    }[]
  >([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>("")

  useEffect(() => {
    const fetchAndGroupCountries = async () => {
      try {
        const countryResponse = await CountryApiService.getAllCountries()
        if (!Array.isArray(countryResponse)) return

        const formatted = countryResponse.map((country: any) => ({
          label: country.countryName,
          value: country.countryName,
          flag: convertIsoCodeToFlagEmoji(country.isoCode),
        }))

        setGroupedCountryOptions(groupCountriesByFirstLetter(formatted))
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
  ]

  const handleRegistrationFormSubmit = async (
    formData: Record<string, any>
  ) => {
    const payload = {
      ...formData,
      country: { countryName: selectedCountry },
      roleEnum: "USER",
    }

    try {
      await AuthService.register(payload)
      setErrorMessage(null)
      navigate("/profile")
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed."
      setErrorMessage(message)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Register
        </h2>

        {errorMessage && (
          <UserError
            message={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />
        )}

        <PrimaryForm
          formFields={registrationFormFields}
          onSubmit={handleRegistrationFormSubmit}
          submitLabel="Register"
        />

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country
          </label>
          <div className="max-h-64 overflow-y-auto border rounded-md bg-white dark:bg-gray-700 p-2">
            {groupedCountryOptions.map((group) => (
              <div key={group.label} className="mb-4">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  {group.label}
                </div>
                <ul className="space-y-1">
                  {group.options.map((country) => (
                    <li
                      key={country.value}
                      className={`cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        selectedCountry === country.value
                          ? "bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                      onClick={() => setSelectedCountry(country.value)}
                    >
                      <span className="mr-2">{country.flag}</span>
                      {country.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
