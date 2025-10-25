import { useState } from "react"
import Select from "react-select"
import PrimaryButton from "./PrimaryButton"
import "../styles/customForms.css"

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
  control: (baseStyles: any) => ({
    ...baseStyles,
    borderColor: "#ccc",
    borderRadius: "0.4rem",
    boxShadow: "none",
    padding: "2px 6px",
    fontSize: "1rem",
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
    color: "#333",
    padding: "8px 12px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    borderRadius: "0.4rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  }),
  singleValue: (baseStyles: any) => ({
    ...baseStyles,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  menuPortal: (baseStyles: any) => ({
    ...baseStyles,
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
    setFormData((previousFormData) => ({
      ...previousFormData,
      [fieldName]: newValue,
    }))
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
        .flatMap((groupObject) => groupObject.options)
        .find((optionObject) => optionObject.value === formData[fieldName]) ||
      null

    const handleSelectChange = (selectedOptionObject: any) => {
      updateFormFieldValue(fieldName, selectedOptionObject?.value || "")
    }

    return (
      <Select
        options={groupedOptions}
        onChange={handleSelectChange}
        value={selectedOption}
        placeholder={`Select ${fieldName}`}
        isSearchable={true}
        styles={customSelectStyles}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        formatOptionLabel={(optionObject: any) => (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {optionObject.flag && <span>{optionObject.flag}</span>}
            <span>{optionObject.label}</span>
          </div>
        )}
      />
    )
  }

  return (
    <form onSubmit={handleFormSubmission} className="primary-form">
      {formFields.map((formField) => (
        <div key={formField.name} className="form-group">
          <label>{formField.label}</label>

          {formField.type === "select" && Array.isArray(formField.options) ? (
            renderGroupedSelectField(formField.name, formField.options)
          ) : formField.name.toLowerCase().includes("password") ? (
            <div className="password-wrapper">
              <input
                type={showPasswordFields[formField.name] ? "text" : "password"}
                value={formData[formField.name] || ""}
                onChange={(event) =>
                  updateFormFieldValue(formField.name, event.target.value)
                }
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility(formField.name)}
              >
                {showPasswordFields[formField.name] ? "Hide" : "Show"}
              </button>
            </div>
          ) : (
            <input
              type={formField.type}
              value={formData[formField.name] || ""}
              onChange={(event) =>
                updateFormFieldValue(formField.name, event.target.value)
              }
            />
          )}
        </div>
      ))}

      <PrimaryButton
        buttonTitle={submitLabel}
        buttonHandler={() => onSubmit(formData)}
      />
    </form>
  )
}

export default PrimaryForm
