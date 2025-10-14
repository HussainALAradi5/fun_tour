import { useState } from "react"
import PrimaryButton from "./PrimaryButton"
import "../styles/customForms.css"

type FieldType = "text" | "number" | "date" | "select"

export type FormFieldConfig = {
  name: string
  label: string
  type: FieldType
  options?: string[]
}

type PrimaryFormProps = {
  formFields: FormFieldConfig[]
  initialValues?: Record<string, any>
  onSubmit: (formData: Record<string, any>) => void
  submitLabel?: string
}

const PrimaryForm = ({
  formFields,
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
}: PrimaryFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues)

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="primary-form">
      {formFields.map((field) => (
        <div key={field.name} className="form-group">
          <label>{field.label}</label>
          {field.type === "select" ? (
            <select
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
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
