import { Layout } from "@/components/Layout";
import { Linkedin, Twitter, Mail } from "lucide-react";

const founders = [
  {
    name: "krish",
    role: "Founder ",
    bio: "A young tech entrepreneur and founder of TechInCode, passionate about building platforms that help students gain real-world tech skills and industry exposure.",
    image: "/images/krish.jpg",
    linkedin: "https://www.linkedin.com/in/krish-k-b99534318/",
    twitter: "#",
    email: "krishk99973@gmail.com",
  },
  {
    name: "Parth agrawal",
    role: "Co-Founder ",
    bio: "Co-Founder at TechInCode, focused on student growth, skill development, and creating meaningful internship opportunities that prepare students for the tech industry.",
    image: "/images/Parth agrawal.jpg",
    linkedin: "#",
    twitter: "#",
    email: "Parthagrawal63970@gmail.com",
  },
];

const teamMembers = [
  {
    name: "Arun Kumar",
    role: "Head of Technology",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Sneha Reddy",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Vikram Singh",
    role: "Lead Mentor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Ananya Gupta",
    role: "Student Success Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
  },
];

const Founders = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="gradient-text">Leadership</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The passionate team behind TechInCode EduTech, dedicated to transforming careers and empowering the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="p-8 bg-card border border-border rounded-xl card-hover text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full gradient-bg opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-border group-hover:border-primary/50 transition-colors"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{founder.name}</h3>
                <p className="text-primary font-medium mb-4">{founder.role}</p>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{founder.bio}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href={founder.linkedin}
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={founder.twitter}
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              The talented individuals who make it all happen
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-6 bg-card border border-border rounded-xl card-hover text-center group"
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">{member.name}</h4>
                <p className="text-primary text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Founders;
