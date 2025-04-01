import Logo from "./logo";

export default function Footer() {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1f1f1f]">
            <Logo/>
        </div>
    );
}