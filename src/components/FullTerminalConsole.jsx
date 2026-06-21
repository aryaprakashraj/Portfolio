import { useState, useEffect, useRef } from 'react'
import api from '../api/axios'

function FullTerminalConsole({ setIsTerminalMode }) {
    const [terminalInput, setTerminalInput] = useState('')
    const [articles, setArticles] = useState([])
    const [isStreaming, setIsStreaming] = useState(false)
    const [terminalHistory, setTerminalHistory] = useState([])

    const terminalBodyRef = useRef(null)
    const terminalEndRef = useRef(null)
    const inputRef = useRef(null)

    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const promptLabel = isMobile ? 'guest:~$' : 'guest@aryaprakashraj:~$'

    // Stream line-by-line writer helper
    const appendWithStream = (inputLine, outputLines, skipInputLine = false) => {
        setIsStreaming(true)

        // 1. Immediately print prompt and input line
        if (!skipInputLine) {
            setTerminalHistory(prev => [...prev, { type: 'input', text: inputLine }])
        }

        // 2. Progressively queue other lines
        let index = 0
        const timer = setInterval(() => {
            if (index < outputLines.length) {
                const line = outputLines[index]
                if (line) {
                    setTerminalHistory(prev => [...prev, line])
                }
                index++
            } else {
                clearInterval(timer)
                setIsStreaming(false)
            }
        }, 20) // 20ms line stream creates an incredibly satisfying live buffer scroll!
    }

    // SSH shell boot effect
    useEffect(() => {
        const welcomeLines = [
            { text: 'Initializing secure terminal session...', delay: 300, isCode: true },
            { text: 'Connecting to database at api.aryaprakashraj.dev...', delay: 900, isCode: true },
            { text: '  -> Connection established via SSL/TLS v1.3.', delay: 300, isCode: true },
            { text: 'Fetching profile data and project catalog...', delay: 1000, isCode: true },
            { text: '  -> Profile for "Arya Prakash Raj" cached successfully.', delay: 200, isCode: true },
            { text: '  -> Skill matrix verified (18 active competencies).', delay: 200, isCode: true },
            { text: '  -> 3 projects verified in local catalog.', delay: 300, isCode: true },
            { text: 'Spawning interactive guest shell...', delay: 600, isCode: true },
            { text: '', delay: 100 },
            { text: 'Welcome to Arya\'s Global Interactive CLI v1.1.0' },
            { text: 'Type "help" to see available commands.' },
            { text: 'Type "gui" or "exit" to return to the graphical portfolio.' },
            { text: '', delay: 100 }
        ]

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsStreaming(true)
        let index = 0
        let timeoutId;

        const runStream = () => {
            if (index < welcomeLines.length) {
                const line = welcomeLines[index]
                if (line) {
                    setTerminalHistory(prev => [
                        ...prev,
                        { type: 'output', text: line.text, isCode: line.isCode }
                    ])
                }
                index++
                const nextDelay = line?.delay !== undefined ? line.delay : 40
                timeoutId = setTimeout(runStream, nextDelay)
            } else {
                setIsStreaming(false)
            }
        }

        runStream()

        return () => {
            clearTimeout(timeoutId)
            setIsStreaming(false)
        }
    }, [])

    // Fetch articles for the blog command
    useEffect(() => {
        api.get('/api/articles')
            .then(res => {
                if (res && Array.isArray(res.data)) {
                    setArticles(res.data.slice(0, 5))
                } else {
                    throw new Error("Invalid blog format")
                }
            })
            .catch(() => {
                // fallback mock articles if offline
                setArticles([
                    { id: 1, title: 'Understanding Spring Security Auth Flow', createdAt: '2026-05-15' },
                    { id: 2, title: 'Deep Dive into JPA OneToMany Mapping', createdAt: '2026-05-02' },
                    { id: 3, title: 'Why I Prefer Linux for Development', createdAt: '2026-04-20' },
                ])
            })
    }, [])

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
        }
    }, [terminalHistory])

    const handleTerminalCommand = (cmdText) => {
        if (isStreaming) return // lock overlapping commands during streams

        setTerminalInput('') // clear input immediately!

        const cleanCmd = cmdText.trim().toLowerCase();
        if (!cleanCmd) return;

        let response;

        // Special dynamic route commands
        if (cleanCmd.startsWith('read ') || cleanCmd.startsWith('blog --read ')) {
            const num = parseInt(cleanCmd.split(' ').pop());
            if (num > 0 && num <= articles.length) {
                const art = articles[num - 1];

                // Print loading line instantly
                setTerminalHistory(prev => [
                    ...prev,
                    { type: 'input', text: cmdText },
                    { type: 'output', text: `Connecting to database and fetching "${art.title}"...` }
                ]);
                setIsStreaming(true);

                api.get(`/api/articles/${art.id}`)
                    .then(res => {
                        const fullArt = res.data;
                        const dateStr = new Date(fullArt.createdAt).toLocaleDateString('en-US', {
                            month: 'long', day: 'numeric', year: 'numeric'
                        });

                        const separator = '='.repeat(80);
                        const articleLines = [
                            { type: 'output', text: '' },
                            { type: 'output', text: separator, isCode: true },
                            { type: 'output', text: `ARTICLE: ${fullArt.title.toUpperCase()}`, isCode: false },
                            { type: 'output', text: `Published: ${dateStr}  |  Views: ${fullArt.viewCount || 0}`, isCode: false },
                            { type: 'output', text: separator, isCode: true },
                            { type: 'output', text: '' },
                            ...fullArt.content.split('\n').map(line => ({ type: 'output', text: line })),
                            { type: 'output', text: '' },
                            { type: 'output', text: separator, isCode: true },
                            { type: 'output', text: '* Run "blog" to see other recent articles.' },
                            { type: 'output', text: '' }
                        ];

                        setIsStreaming(false);
                        appendWithStream(cmdText, articleLines, true);
                    })
                    .catch(() => {
                        // Fallback rich local mock contents
                        const mockContents = {
                            1: "In this article, we deep-dive into the Spring Security Authentication Flow.\nWe examine how UsernamePasswordAuthenticationFilter works, the role of the AuthenticationManager, and how security context is set up in a thread-local SecurityContextHolder.\n\nKey Concepts:\n1. SecurityContextHolder - holds authentication details.\n2. AuthenticationManager - resolves authentication.\n3. UserDetailsService - loads user-specific data.",
                            2: "Hibernate JPA One-to-Many mapping can be tricky. If not careful, you might encounter the notorious N+1 query problem.\nIn this guide, we discuss how to use 'join fetch' or EntityGraphs to optimize relational queries and map collections correctly using mappedBy.\n\nTips:\n- Always use lazy loading for collections.\n- Keep both sides of the relationship in sync using helper methods.",
                            3: "Why Linux? For developers, Linux provides a superior terminal ecosystem, fine-grained control over system processes, package management tools (like dnf, apt), and native performance for hosting backend servers.\n\nMy setup:\n- Fedora Workstation with Gnome 50.\n- Ptyxis and Alacritty as primary shell interfaces.\n- Docker containers for database local environments."
                        };

                        const content = mockContents[art.id] || "This is a placeholder content for the article. The local developer backend is offline, but we retrieved this mock post successfully!";
                        const dateStr = new Date(art.createdAt).toLocaleDateString('en-US', {
                            month: 'long', day: 'numeric', year: 'numeric'
                        });

                        const separator = '='.repeat(80);
                        const articleLines = [
                            { type: 'output', text: '' },
                            { type: 'output', text: separator, isCode: true },
                            { type: 'output', text: `ARTICLE: ${art.title.toUpperCase()}`, isCode: false },
                            { type: 'output', text: `Published: ${dateStr}  |  Views: ${art.viewCount || 120}`, isCode: false },
                            { type: 'output', text: separator, isCode: true },
                            { type: 'output', text: '' },
                            ...content.split('\n').map(line => ({ type: 'output', text: line })),
                            { type: 'output', text: '' },
                            { type: 'output', text: separator, isCode: true },
                            { type: 'output', text: '* Run "blog" to see other recent articles.' },
                            { type: 'output', text: '' }
                        ];

                        setIsStreaming(false);
                        appendWithStream(cmdText, articleLines, true);
                    });

                setTerminalInput('');
                return;
            } else {
                response = [{ type: 'output', text: `Error: Article [${num}] not found.` }];
                appendWithStream(cmdText, response);
                setTerminalInput('');
                return;
            }
        }

        if (cleanCmd === 'projects --open 1' || cleanCmd === 'open 1') {
            window.open('https://github.com/aryaprakashraj/Blog', '_blank');
            response = [{ type: 'output', text: 'Opening GitHub repo for Personal Blog...' }];
            appendWithStream(cmdText, response);
            setTerminalInput('');
            return;
        }

        if (cleanCmd === 'projects --open 2' || cleanCmd === 'open 2') {
            window.open('https://github.com/aryaprakashraj/NextLeap', '_blank');
            response = [{ type: 'output', text: 'Opening GitHub repo for Next Leap...' }];
            appendWithStream(cmdText, response);
            setTerminalInput('');
            return;
        }

        if (cleanCmd === 'open github') {
            window.open('https://github.com/aryaprakashraj', '_blank');
            response = [{ type: 'output', text: 'Opening GitHub profile...' }];
            appendWithStream(cmdText, response);
            setTerminalInput('');
            return;
        }

        if (cleanCmd === 'open linkedin') {
            window.open('https://linkedin.com/in/aryaprakashraj', '_blank');
            response = [{ type: 'output', text: 'Opening LinkedIn profile...' }];
            appendWithStream(cmdText, response);
            setTerminalInput('');
            return;
        }

        if (cleanCmd === 'open x' || cleanCmd === 'open x.com') {
            window.open('https://x.com/Aryaprakashraj', '_blank');
            response = [{ type: 'output', text: 'Opening X.com profile...' }];
            appendWithStream(cmdText, response);
            setTerminalInput('');
            return;
        }

        switch (cleanCmd) {
            case 'help':
                response = [
                    { type: 'output', text: 'Available Commands:' },
                    { type: 'output', text: '  fastfetch  - Display system info & hardware configs' },
                    { type: 'output', text: '  about      - Read my bio & developer philosophy' },
                    { type: 'output', text: '  skills     - List core technical skills categorized' },
                    { type: 'output', text: '  projects   - Show core projects with description & source links' },
                    { type: 'output', text: '  blog       - List recent articles from my blog' },
                    { type: 'output', text: '  contact    - Get active contact details & links' },
                    { type: 'output', text: '  clear      - Clear the console history' },
                    { type: 'output', text: '  gui / exit - Return to standard visual website' }
                ];
                break;
            case 'clear':
                setTerminalHistory([]);
                setTerminalInput('');
                return;
            case 'exit':
            case 'gui':
                setIsTerminalMode(false);
                return;
            case 'fastfetch':
            case 'neofetch':
                response = [
                    { type: 'output', text: "spidey@aryaprakashraj", isCode: true },
                    { type: 'output', text: "---------------------", isCode: true },
                    { type: 'output', text: "OS:             Fedora Linux 44 (Workstation Edition) x86_64" },
                    { type: 'output', text: "Host:           ASUS EXPERTBOOK P3405CVA (1.0)" },
                    { type: 'output', text: "Kernel:         Linux 7.0.12-201.fc44.x86_64" },
                    { type: 'output', text: "Shell:          bash 5.3.9" },
                    { type: 'output', text: "DE:             GNOME 50.1" },
                    { type: 'output', text: "WM:             Mutter (Wayland)" },
                    { type: 'output', text: "Terminal:       Ptyxis 50.1" },
                    { type: 'output', text: "CPU:            13th Gen Intel(R) Core(TM) i5-13420H (12) @ 4.60 GHz" },
                    { type: 'output', text: "GPU:            Intel UHD Graphics [Integrated]" },
                    { type: 'output', text: "Memory:         16.00 GiB" },
                    { type: 'output', text: "Mobile:         OnePlus 12 (Daily Driver)" },
                    { type: 'output', text: "Audio:          Moto Buds (AirPods)" },
                    { type: 'output', text: "Locale:         en_US.UTF-8" }
                ];
                break;
            case 'about':
                response = [
                    { type: 'output', text: '[ WHO I AM ? ]' },
                    { type: 'output', text: 'I\'m a third-year Computer Science student focused on backend systems engineering.' },
                    { type: 'output', text: 'I learn by building real things — from REST APIs to custom database integrations.' },
                    { type: 'output', text: 'My passion lies in understanding how systems work under the hood.' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ CORE FOCUS ]' },
                    { type: 'output', text: '  • Robust backends using Java and Spring Boot' },
                    { type: 'output', text: '  • Data Structures, Algorithms, and OS internals' },
                    { type: 'output', text: '  • Building Actual Stuffs' },
                    { type: 'output', text: '  • Learning and exploring things that excites me.' }
                ];
                break;
            case 'skills':
                response = [
                    { type: 'output', text: '[ LANGUAGES ]' },
                    { type: 'output', text: '  • Java (Primary)   • Python           • SQL' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ BACKEND DEVELOPMENT ]' },
                    { type: 'output', text: '  • Spring Boot      • Spring Security  • REST APIs' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ DATABASES & ORM ]' },
                    { type: 'output', text: '  • MySQL            • PostgreSQL       • Spring Data JPA' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ DEVELOPER TOOLS ]' },
                    { type: 'output', text: '  • Git              • Linux            • IntelliJ         • Postman' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ CS FUNDAMENTALS ]' },
                    { type: 'output', text: '  • DSA (Data Structures & Algorithms)' },
                    { type: 'output', text: '  • OOP (Object-Oriented Programming)' },
                    { type: 'output', text: '  • OS Concepts (Operating Systems)' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ CURRENTLY LEARNING ]' },
                    { type: 'output', text: '  • React            • System Design' }
                ];
                break;
            case 'projects':
                response = [
                    { type: 'output', text: '[ 1. PERSONAL BLOG ]' },
                    { type: 'output', text: '  - Description: Personal publishing platform with Spring Boot REST API, JWT auth, PostgreSQL, and an integrated newsletter engine for subscriber management and automated email delivery.' },
                    { type: 'output', text: '  - Tech Stack:  Spring Boot, Docker, PostgreSQL, JWT, SMTP' },
                    { type: 'output', text: '  - Source:      https://github.com/aryaprakashraj/Blog' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ 2. NEXT LEAP ]' },
                    { type: 'output', text: '  - Description: Career path recommendation system with Spring Boot backend.' },
                    { type: 'output', text: '  - Tech Stack:  Spring Boot, Java' },
                    { type: 'output', text: '  - Source:      https://github.com/aryaprakashraj/NextLeap' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '[ 3. TOPPER FRIEND ]' },
                    { type: 'output', text: '  - Description: Adaptive tuning AI chatbot for student learning.' },
                    { type: 'output', text: '  - Tech Stack:  Python' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '* Type "open 1" or "open 2" to open the source repositories in your browser!' }
                ];
                break;
            case 'blog':
                response = [
                    { type: 'output', text: '[ RECENT ARTICLES ]' },
                    ...articles.map((art, idx) => ({
                        type: 'output',
                        text: `  [${idx + 1}] ${art.title} (${new Date(art.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`
                    })),
                    { type: 'output', text: '' },
                    { type: 'output', text: '* Type "read <number>" to read the article directly in this terminal!' }
                ];
                break;
            case 'contact':
                response = [
                    { type: 'output', text: '[ CONTACT PATHWAYS ]' },
                    { type: 'output', text: '  • Email:    aryaprakashraj@gmail.com' },
                    { type: 'output', text: '  • GitHub:   https://github.com/aryaprakashraj' },
                    { type: 'output', text: '  • LinkedIn: https://linkedin.com/in/aryaprakashraj' },
                    { type: 'output', text: '  • X:        https://x.com/Aryaprakashraj' },
                    { type: 'output', text: '' },
                    { type: 'output', text: '* Type "open github", "open linkedin", or "open x" to visit the profiles directly!' }
                ];
                break;
            case 'joke': {
                const jokes = [
                    "Why do Java developers wear glasses? Because they don't C#! 🤓",
                    "There are 10 types of people in the world: those who understand binary, and those who don't.",
                    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
                    "Java is to JavaScript what Car is to Carpet."
                ];
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                response = [{ type: 'output', text: randomJoke }];
                break;
            }
            case 'sudo rm -rf /':
                response = [
                    { type: 'output', text: '[WARNING] System wipe requested.' },
                    { type: 'output', text: 'Nice try spidey, but your rm -rf skills cannot affect this system! 😉' }
                ];
                break;
            default:
                response = [
                    { type: 'output', text: `bash: command not found: ${cleanCmd}.` },
                    { type: 'output', text: 'Type "help" to see a list of valid commands.' }
                ];
                break;
        }

        appendWithStream(cmdText, response);
        setTerminalInput('');
    };

    // Auto-focus input when streaming completes or window gains focus
    useEffect(() => {
        if (!isStreaming && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isStreaming])

    useEffect(() => {
        const handleWindowFocus = () => {
            if (!isStreaming && inputRef.current) {
                inputRef.current.focus()
            }
        }
        window.addEventListener('focus', handleWindowFocus)
        return () => window.removeEventListener('focus', handleWindowFocus)
    }, [isStreaming])

    const handleViewportClick = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleTerminalCommand(terminalInput)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div
            onClick={handleViewportClick}
            className="fixed inset-0 w-screen h-[100dvh] bg-zinc-950 text-zinc-300 font-mono flex flex-col z-[9999] overflow-hidden select-text cursor-text"
        >
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-900 select-none">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-zinc-500 font-mono">{isMobile ? 'guest:~' : 'guest@aryaprakashraj:~'}</span>
                <div className="w-12" /> {/* spacer */}
            </div>

            {/* Terminal Viewport */}
            <div
                ref={terminalBodyRef}
                className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-800"
            >
                {terminalHistory.map((item, idx) => (
                    <div key={idx} className="mb-2">
                        {item.type === 'input' ? (
                            <div className="flex items-center gap-2">
                                <span className="text-royal font-bold select-none">{promptLabel}</span>
                                <span className="text-zinc-100 font-semibold">{item.text}</span>
                            </div>
                        ) : (
                            <div
                                className={`font-mono ${item.isCode
                                    ? 'whitespace-pre overflow-x-auto scrollbar-none text-[9px] xs:text-[10px] sm:text-xs md:text-sm leading-normal py-0.5 text-zinc-400 font-semibold'
                                    : 'whitespace-pre-wrap text-zinc-300'
                                    }`}
                            >
                                {item.text}
                            </div>
                        )}
                    </div>
                ))}

                {/* Input Bar positioned inline under content */}
                {!isStreaming && (
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 mt-2"
                    >
                        <span className="text-royal font-bold select-none font-mono">{promptLabel}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            disabled={isStreaming}
                            className="flex-1 bg-transparent text-zinc-100 font-mono focus:outline-none caret-royal placeholder-zinc-800 text-xs sm:text-sm disabled:opacity-50"
                            placeholder="type a command..."
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            autoFocus
                        />
                    </form>
                )}
                <div ref={terminalEndRef} />
            </div>

            {/* Mobile Quick Actions Bar */}
            {isMobile && (
                <div className="flex gap-2 px-4 py-2 bg-zinc-900/40 border-t border-zinc-900/50 overflow-x-auto scrollbar-none select-none">
                    {['help', 'about', 'skills', 'projects', 'blog', 'clear', 'exit'].map((cmd) => (
                        <button
                            key={cmd}
                            type="button"
                            onClick={() => handleTerminalCommand(cmd)}
                            className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-850 border border-zinc-800 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors active:bg-royal active:border-royal active:text-white"
                        >
                            {cmd}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FullTerminalConsole
