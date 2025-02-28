import LoginForm from "../_components/login-form"

export default function LoginPage() {
  return (
    <div className="flex  flex-col items-center justify-center md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="" className="flex items-center gap-2 self-center font-medium">
          Pagtion
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
