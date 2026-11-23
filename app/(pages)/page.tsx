import ChooseUsSection from "@/components/home/ChooseUsSection"
import Hero from "@/components/home/Hero"
import ServiceSection from "@/components/home/ServiceSection"
import TechWeProvided from "@/components/home/TechWeProvided"

const Home = async() => {
    return (
        <div className="px-6 space-y-12 py-10">
            <Hero/>
            <ServiceSection/>
            <ChooseUsSection/>
            <TechWeProvided/>
        </div>
    )
}

export default Home