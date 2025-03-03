import Navbar from "./_components/Navbar";
import Footer from "./_components/footer";

export default function MarketingLayout({
    children
}:
    {children: React.ReactNode}
){
    return (
        <div className="h-full dark:bg-[#1f1f1f]">
            <Navbar/>
            <main className="h-full pt-20 dark:bg-[#1f1f1f]">
                {children}
            </main>
            <Footer/>
        </div>
    )
}
