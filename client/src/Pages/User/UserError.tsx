type UserErrorProps = {
  message: string
  onDismiss: () => void
}

const UserError = ({ message, onDismiss }: UserErrorProps) => {
  return (
    <div className="mb-4 rounded-md bg-red-100 dark:bg-red-900 p-4 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 relative">
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400 text-sm"
      >
        ✕
      </button>
    </div>
  )
}

export default UserError
