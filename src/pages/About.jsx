function About() {
  return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto">

      {/* Intro */}
      <section className="mb-16">
        <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase font-mono">about me</p>
        <h1 className="text-4xl font-bold mb-6">Who I am ?</h1>
        <p className="text-gray-400 leading-relaxed mb-4">
          I'm Arya, a third-year Computer Science student at Dhaanish Ahmed 
          Institute of Technology, Coimbatore. I focus on backend development — 
          building APIs, working with databases, and understanding how systems work.
        </p>
        <p className="text-gray-400 leading-relaxed">
          I learn by building real things. This site is one of them — a portfolio 
          and blog built with Spring Boot and React, from scratch.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <p className="text-gray-500 text-sm mb-6 tracking-widest uppercase font-mono">skills</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { category: "Languages", items: "Java, Python, SQL" },
            { category: "Backend", items: "Spring Boot, Spring Security, REST APIs" },
            { category: "Database", items: "PostgreSQL, Spring Data JPA" },
            { category: "Tools", items: "Git, Linux, IntelliJ, Postman" },
            { category: "CS Fundamentals", items: "DSA, OOP, OS concepts" },
            { category: "Currently Learning", items: "React, System Design" },
          ].map((skill) => (
            <div key={skill.category} className="border border-white/10 rounded-lg p-4">
              <p className="text-xs text-gray-500 font-mono mb-1">{skill.category}</p>
              <p className="text-sm text-gray-300">{skill.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <p className="text-gray-500 text-sm mb-6 tracking-widest uppercase font-mono">projects</p>
        <div className="flex flex-col gap-4">
          {[
            {
              name: "Personal Blog & Portfolio",
              desc: "Full-stack personal site with Spring Boot REST API, JWT auth, PostgreSQL, and React frontend.",
              tags: ["Spring Boot", "React", "PostgreSQL", "JWT"],
              link: "https://github.com/aryaprakashraj/Blog"
            },
            {
              name: "Next Leap",
              desc: "Career path recommender built with Spring Boot.",
              tags: ["Spring Boot", "Java"],
              link: "#"
            },
            {
              name: "Topper Friend",
              desc: "Personalized learning with Adaptive and active tuning AI chatbot.",
              tags: ["Python"],
              link: "#"
            },
          ].map((project) => (
            <a key={project.name} href={project.link} target="_blank"
               className="border border-white/10 rounded-lg p-5 hover:border-white/30 transition-colors group">
              <h3 className="font-medium mb-1 group-hover:text-white transition-colors">{project.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{project.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded font-mono text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mb-16">
        <p className="text-gray-500 text-sm mb-6 tracking-widest uppercase font-mono">contact</p>
        <p className="text-gray-400 mb-4">
          Open to internships, collaborations, or just a good conversation about tech.
        </p>
        <a href="mailto:aryaprakashraj@gmail.com"
           className="text-white hover:text-gray-300 transition-colors font-mono text-sm">
          aryaprakashraj@gmail.com →
        </a>
      </section>

    </main>
  )
}

export default About