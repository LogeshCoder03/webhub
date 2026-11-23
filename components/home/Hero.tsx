"use client";

import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { RainbowButton } from "../ui/rainbow-button";

const Hero = () => {
    const router=useRouter()
    return (
        <div className="relative mx-auto py-10 flex max-w-7xl flex-col items-center justify-center h-screen">
            <div className="absolute inset-y-0 -left-6 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute top-0 h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-y-0 -right-6 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                <div className="absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
            </div>
        <div className="px-4 py-10 md:py-20">
            <h1 className="relative z-10 mx-auto max-w-4xl text-center leading-tight text-2xl font-bold text-foreground md:text-4xl lg:text-7xl">
            {"Transforming Ideas Into Digital".split(" ").map((word, index) => (
                <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                }}
                className="mr-2 inline-block"
                >
                {word}
                </motion.span>
            ))}
            </h1>
            <motion.p
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.3,
                delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-muted-foreground"
            >
            We design websites,mobile apps,full stack solutions and guide your
            learning journey every step of the way in one place
            </motion.p>
            <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.3,
                delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
            >
            <RainbowButton 
            onClick={()=>router.push("/project-type")}
            className="w-60 h-11 transform rounded-lg px-6 py-5 font-medium  transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Book Your Project
                <ChevronRightIcon />
            </RainbowButton>
            <Button
            variant="secondary"
                className="w-60 h-11 transform border-2 px-6 py-5 border-background  font-medium transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => router.push("/feedback")}
            >
                Feedback
            </Button>
            </motion.div>
        </div>
        </div>
    );
};

export default Hero;
