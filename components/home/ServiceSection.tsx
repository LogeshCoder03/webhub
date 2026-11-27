import {
  BookOpen,
  Cpu,
  Globe,
  GraduationCap,
  Layers,
  Smartphone,
} from "lucide-react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "motion/react";

export type ServiceType = {
  name: string;
  description: string;
  icon: typeof Cpu;
  query?: string;
  featured?: boolean;
};

const services: ServiceType[] = [
  {
    name: "Full-Stack Solutions",
    description:
      "Complete systems from frontend to database — powered by Next.js and Prisma.",
    icon: Layers,
  },
  {
    name: "AI Integration",
    description: "Smart, future-ready web apps with AI-powered features.",
    icon: Cpu,
    featured: true,
  },
  {
    name: "Web Development",
    description:
      "Custom websites built with Next.js, React, and modern UI — fast, responsive, and scalable.",
    icon: Globe,
  },

  {
    name: "Mobile App Development",
    description:
      "Cross-platform mobile apps with smooth UX and powerful backends.",
    icon: Smartphone,
  },
  {
    name: "Mentorship & Guidance",
    description:
      "Personalized mentorship to help you master real-world development and deploy confidently.",
    icon: GraduationCap,
  },
  {
    name: "Learning Guidance",
    description: "Smart, future-ready web apps with AI-powered features.",
    icon: BookOpen,
  },
];

const words =
  "Delivering everything you need — from web to mobile to mentorship, all in one place.";

const ServiceSection = () => {
  return (
    <div>
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Services We <span className="text-primary">Provided?</span>
        </h2>
        <TextGenerateEffect words={words} />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 space-y-2 gap-8"
      >
        {services.map((service, idx) => (
          <Card
          key={idx}
            className={`max-w-md py-8 ${service.featured && "ring-primary scale-105 ring-2 ring-offset-2 ring-offset-card"} hover:scale-105 duration-300`}
          >
            <CardHeader>
              <service.icon className="w-10 h-10 text-primary mb-4" />
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
