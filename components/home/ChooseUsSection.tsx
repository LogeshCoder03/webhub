import { CheckCircle, Shield, Clock, Users, Sparkles, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const features = [
  {
    icon: Layers,
    title: "Full-Stack Expertise",
    description:
      "We build complete end-to-end solutions including frontend, backend, mobile, APIs, databases, and deployment.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "We follow a structured workflow ensuring quick, efficient, and high-quality project completion.",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description:
      "Your project is handled with top-level security and clean architecture for long-term reliability.",
  },
  {
    icon: Users,
    title: "1-to-1 Mentorship",
    description:
      "Personal mentorship and guidance for learning, completing tasks, or improving your project.",
  },
  {
    icon: Sparkles,
    title: "Modern Tech Stack",
    description:
      "We use the latest tools like Next.js, React, Prisma, MongoDB, AI integration, and more.",
  },
  {
    icon: CheckCircle,
    title: "Guaranteed Quality",
    description:
      "Every project undergoes detailed review, testing, and optimization for best results.",
  },
];

export default function ChooseUsSection() {
  return (
    <section>
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose <span className="text-indigo-600">Us?</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We deliver trusted, high-quality solutions with expertise, speed, 
            and a strong focus on modern development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <Card
              key={idx}
            >
                <CardHeader>
                    <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
                    <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {item.description}
                    </CardDescription>
                </CardContent>
            </Card>
          ))}
        </div>
    </section>
  );
}
