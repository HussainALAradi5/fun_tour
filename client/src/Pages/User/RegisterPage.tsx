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
      options: {
        label: string
        value: string
        flag?: string
      }[]
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

        const formattedCountryOptions = countryResponse.map(
          (countryObject: any) => ({
            label: countryObject.countryName,
            value: countryObject.countryName,
            flag: convertIsoCodeToFlagEmoji(countryObject.isoCode),
          })
        )

        const alphabeticallyGroupedCountries = groupCountriesByFirstLetter(
          formattedCountryOptions
        )
        setGroupedCountryOptions(alphabeticallyGroupedCountries)
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }

    fetchAndGroupCountries()
  }, [])

  const convertIsoCodeToFlagEmoji = (isoCode: string): string =>
    isoCode
      .toUpperCase()
      .replace(/./g, (character) =>
        String.fromCodePoint(127397 + character.charCodeAt(0))
      )

  const groupCountriesByFirstLetter = (
    countryList: {
      label: string
      value: string
      flag?: string
    }[]
  ) => {
    const groupedCountries: Record<string, typeof countryList> = {}

    for (const country of countryList) {
      const firstLetter = country.label[0].toUpperCase()
      if (!groupedCountries[firstLetter]) {
        groupedCountries[firstLetter] = []
      }
      groupedCountries[firstLetter].push(country)
    }

    const sortedGroups = Object.keys(groupedCountries)
      .sort()
      .map((letter) => ({
        label: letter,
        options: groupedCountries[letter].sort((countryA, countryB) =>
          countryA.label.localeCompare(countryB.label)
        ),
      }))

    return sortedGroups
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
    const registrationPayload = {
      ...formData,
      country: { countryName: formData.country },
      roleEnum: "USER",
    }

    try {
      await AuthService.register(registrationPayload)
      navigateToLogin("/login")
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <PrimaryForm
        formFields={registrationFormFields}
        onSubmit={handleRegistrationFormSubmit}
        submitLabel="Register"
      />
    </div>
  )
}

export default RegisterPage
