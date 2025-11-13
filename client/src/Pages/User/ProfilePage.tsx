import { useEffect, useState } from "react"
import UserApiCallerService from "../../utilities/Services/UserApiCallerService"
import AuthService from "../../utilities/Services/AuthServices"
import UserError from "./UserError"

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const parsedUser = AuthService.getCurrentUser()

    if (!parsedUser || !parsedUser.userId) {
      setErrorMessage("No user found. Please login.")
      return
    }

    UserApiCallerService.getUserById(parsedUser.userId)
      .then((res) => {
        setUser(res)
      })
      .catch((err) => {
        setErrorMessage("Failed to load user profile.")
      })
  }, [])

  if (errorMessage) {
    return (
      <div className="p-6">
        <UserError
          message={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 p-6">
        Loading profile...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome, {user.userName}
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobileNumber}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Country:</strong> {user.country?.countryName || "N/A"}
          </p>
          <p>
            {user.roleEnum !== "USER" && (
              <>
                <strong>Role:</strong> {user.roleEnum}
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
