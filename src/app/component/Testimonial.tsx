import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
    const testimonials = [
        {
            quote:
                "JobQuest made my job search so much easier! I landed multiple interviews within a week of applying. Highly recommend it to anyone serious about their career.",
            name: "Sarah Chen",
            designation: "Software Engineer (Placed via JobQuest)",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "As an employer, JobQuest has been a game-changer for hiring. The platform connects us with skilled candidates faster than ever before.",
            name: "Michael Rodriguez",
            designation: "HR Manager at InnovateSphere ",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "I appreciate how user-friendly JobQuest is. Uploading my resume, tracking applications, and chatting with recruiters was effortless.",
            name: "Emily Watson",
            designation: "Marketing Specialist ",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Our recruitment team loves JobQuest’s advanced filtering and AI-matching features. It saves us countless hours every month.",
            name: "James Kim",
            designation: "Talent Acquisition Lead at DataPro",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Thanks to JobQuest, I found a role that perfectly matches my skills and passion. The whole experience felt smooth and professional.",
            name: "Lisa Thompson",
            designation: "UI/UX Designer ",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <div
            className="relative bg-cover lg:h-[500px] bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://i.ibb.co.com/hxHJ6mfz/the-perfect-first.jpg')", // replace with your actual image path
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#7670d6]/85 "></div>

            {/* Content */}
            <div className="relative z-10">
                <AnimatedTestimonials testimonials={testimonials} />
            </div>
        </div>


    );


}
