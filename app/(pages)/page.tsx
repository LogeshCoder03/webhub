import ChooseUsSection from "@/components/home/ChooseUsSection";
import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/ServiceSection";
import TechWeProvided from "@/components/home/TechWeProvided";
import Testimonials, {
  TestimonialSkeleton,
} from "@/components/home/Testimonials";
import { getApprovedTestimonials } from "@/services/testimonial.service";
import { connection } from "next/server";
import { Suspense } from "react";

const Home = async () => {
    await connection()
//   const data = await getApprovedTestimonials();
//   console.log(data);
  
  return (
    <div className="px-6 space-y-12 py-10">
      <Hero />
      <ServiceSection />
      <ChooseUsSection />
      <TechWeProvided />
      {/* <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">
          {data.data.length !== 0 && (
            <h2 className="text-center text-4xl font-bold mb-12">
              What Our <span className="text-indigo-600">Clients Say</span>
            </h2>
          )}
          <div className="grid md:grid-cols-3 gap-8">
            <Suspense fallback={<TestimonialSkeleton />}>
              <Testimonials reviews={data.data} />
            </Suspense>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
