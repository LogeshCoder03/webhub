import {
  BookOpen,
  Cpu,
  Globe,
  GraduationCap,
  Layers,
  Smartphone,
} from "lucide-react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ServiceType } from "@/types/services";

const ServiceCard = ({ name, description, icon: Icon }: ServiceType) => {
  return (
    <div>
      <Card className="max-w-md py-8">
        <CardHeader className="flex">
          {Icon}
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <h2>{description}</h2>
        </CardContent>
      </Card>
    </div>
  );
};

const services: ServiceType[] = [
  {
    name: "Web Development",
    description:
      "Custom websites built with Next.js, React, and modern UI — fast, responsive, and scalable.",
    icon: <Globe />,
  },
  {
    name: "Mobile App Development",
    description:
      "Cross-platform mobile apps with smooth UX and powerful backends.",
    icon: <Smartphone />,
  },
  {
    name: "Full-Stack Solutions",
    description:
      "Complete systems from frontend to database — powered by Next.js and Prisma.",
    icon: <Layers />,
  },
  {
    name: "Mentorship & Guidance",
    description:
      "Personalized mentorship to help you master real-world development and deploy confidently.",
    icon: <GraduationCap />,
  },
  {
    name: "Learning Guidance",
    description: "Smart, future-ready web apps with AI-powered features.",
    icon: <BookOpen />,
  },
  {
    name: "AI Integration",
    description: "Smart, future-ready web apps with AI-powered features.",
    icon: <Cpu />,
  },
];

const words =
  "Delivering everything you need — from web to mobile to mentorship, all in one place.";

const ServiceSection = () => {
  return (
    <div>
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold">
          Services We <span className="text-primary">Provided?</span>
        </h2>
        <TextGenerateEffect words={words} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 space-y-2 gap-8">
        {services.map((service, idx) => (
          <ServiceCard key={idx} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
