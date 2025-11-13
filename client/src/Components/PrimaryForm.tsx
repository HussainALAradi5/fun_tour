import { useState } from "react"
import Select from "react-select"

type FieldType = "text" | "number" | "date" | "select"

export type FormFieldConfig = {
  name: string
  label: string
  type: FieldType
  options?: {
    label: string
    options: {
      label: string
      value: string
      flag?: string
    }[]
  }[]
}

type PrimaryFormProps = {
  formFields: FormFieldConfig[]
  initialValues?: Record<string, any>
  onSubmit: (formData: Record<string, any>) => void
  submitLabel?: string
}

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "white",
    borderColor: "#d1d5db",
    borderRadius: "0.375rem",
    padding: "2px 6px",
    fontSize: "1rem",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f3f4f6" : "white",
    color: "#111827",
    padding: "8px 12px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  singleValue: (base: any) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
}

const PrimaryForm = ({
  formFields,
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
}: PrimaryFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues)
  const [showPasswordFields, setShowPasswordFields] = useState<
    Record<string, boolean>
  >({})

  const updateFormFieldValue = (fieldName: string, newValue: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: newValue }))
  }

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }))
  }

  const handleFormSubmission = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formData)
  }

  const renderGroupedSelectField = (
    fieldName: string,
    groupedOptions: {
      label: string
      options: {
        label: string
        value: string
        flag?: string
      }[]
    }[]
  ) => {
    const selectedOption =
      groupedOptions
        .flatMap((group) => group.options)
        .find((opt) => opt.value === formData[fieldName]) || null

    const handleSelectChange = (selected: any) => {
      updateFormFieldValue(fieldName, selected?.value || "")
    }

    return (
      <Select
        options={groupedOptions}
        onChange={handleSelectChange}
        value={selectedOption}
        placeholder={`Select ${fieldName}`}
        isSearchable
        styles={customSelectStyles}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-2">
            {option.flag && <span>{option.flag}</span>}
            <span>{option.label}</span>
          </div>
        )}
      />
    )
  }

  return (
    <form
      onSubmit={handleFormSubmission}
      className="max-w-xl mx-auto space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      {formFields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {field.label}
          </label>

          {field.type === "select" && Array.isArray(field.options) ? (
            renderGroupedSelectField(field.name, field.options)
          ) : field.name.toLowerCase().includes("password") ? (
            <div className="relative">
              <input
                id={field.name}
                type={showPasswordFields[field.name] ? "text" : "password"}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  updateFormFieldValue(field.name, e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.name)}
                className="absolute right-3 top-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showPasswordFields[field.name] ? "Hide" : "Show"}
              </button>
            </div>
          ) : (
            <input
              id={field.name}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={(e) => updateFormFieldValue(field.name, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300 transition-all duration-200"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default PrimaryForm
