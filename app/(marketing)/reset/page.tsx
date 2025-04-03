import ResetForm from "../_components/reset-form";

export default function ResetPage(){
    return(
      <div className="grid h-full place-items-center">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <ResetForm/>
        </div>
      </div>
    );
}