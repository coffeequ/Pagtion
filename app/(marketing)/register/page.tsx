import RegisterForm from "../_components/register-form"

export default function RegisterPage() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RegisterForm />
      </div>
    </div>
  )
}
