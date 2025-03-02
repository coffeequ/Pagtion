import LoginForm from "../_components/login-form"

export default function LoginPage() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
