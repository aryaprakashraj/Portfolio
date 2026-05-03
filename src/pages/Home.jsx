function Home() {
    return (
        <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto">

            {/* Hero */}
            <section className="mb-24">
                <p className="text-gray-500 text-sm text-lg font-bold tracking-tight font-mono mb-4 tracking-widest uppercase ">
                    Hey, I'm
                </p>
                <h1 className="text-5x1 font-bold mb-4 leading-tight">
                    Aryaprakashraj
                </h1>
                <h2 className="text-x1 text-gray-400 mb-6">
                    Backend Developer · CS Student · Builder
                </h2>
                <p className="text-gray-400 leading-relaxed max-w-xl">
                    I build backend systems with Java and Spring Boot.
                    Currently in my third year at Dhaanish Itech, Coimbatore.
                    Figuring things out in public and writing about it.
                </p>
                <div className="flex gap-4 mt-8">
                    <a href="/blog" className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        Read my blog
                    </a>
                    <a href="/about" className="px-5 py-2.5 border border-white/20 text-sm rounded-lg hover:boreder-white/50 transition-colors">
                        About Me
                    </a>
                </div>
            </section>

            {/* Featured Srticles placeholder */}
            <section>
                <h3 className="text-sm text-gray-500 text-lg font-bold tracking-tight font-mono uppercase mb-6">
                    Recent Writing
                </h3>
                <p className="text-gray-600">Articles coming soon...</p>
            </section>
        </main>
    )
}

export default Home