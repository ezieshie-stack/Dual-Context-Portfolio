"use client";

import { INTENT_OPTIONS, DEPTH_OPTIONS, CREATIVE_INTENT_OPTIONS } from "@/lib/personas";
import { Intent, Depth } from "@/lib/logging/types";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Types
type OnboardingStep = 'greeting' | 'intent' | 'depth' | 'chatting';

interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    isStreaming?: boolean;
}



// Generate unique ID
function generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate session ID
function getSessionId(): string {
    if (typeof window === 'undefined') return 'server';

    let sessionId = sessionStorage.getItem('chatbot_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('chatbot_session_id', sessionId);
    }
    return sessionId;
}

// Animated typing indicator
function TypingIndicator({ theme }: { theme: any }) {
    return (
        <div className="flex gap-1 items-center px-4 py-2">
            <motion.div
                className={`w-2 h-2 rounded-full ${theme.typingDot}`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
                className={`w-2 h-2 rounded-full ${theme.typingDot}`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
                className={`w-2 h-2 rounded-full ${theme.typingDot}`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
        </div>
    );
}

// Animated Eyeballs Icon
function EyeballsIcon({ className = "", theme }: { className?: string; theme?: any }) {
    // Random pupil movement 
    const randomX = [0, -2, 2, 0, 1, -1, 0];
    const randomY = [0, -1, 1, 0, 0, 1, 0];

    return (
        <div className={`relative flex items-center justify-center gap-[2px] ${className}`}>
            {/* Left Eye */}
            <motion.div
                className="relative w-[45%] h-[60%] bg-white rounded-full overflow-hidden text-black"
                animate={{ scaleY: [1, 1, 0.1, 1, 1, 1] }} // Blink
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1, 1], delay: 0.2 }}
            >
                {/* Pupil */}
                <motion.div
                    className="absolute w-[40%] h-[40%] bg-black rounded-full top-1/2 left-1/2"
                    initial={{ x: "-50%", y: "-50%" }}
                    animate={{
                        x: randomX.map(x => `calc(-50% + ${x}px)`),
                        y: randomY.map(y => `calc(-50% + ${y}px)`)
                    }}
                    transition={{ duration: 5, repeat: Infinity, type: "tween", ease: "easeInOut" }}
                />
            </motion.div>

            {/* Right Eye */}
            <motion.div
                className="relative w-[45%] h-[60%] bg-white rounded-full overflow-hidden text-black"
                animate={{ scaleY: [1, 1, 0.1, 1, 1, 1] }} // Blink
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1, 1] }}
            >
                {/* Pupil */}
                <motion.div
                    className="absolute w-[40%] h-[40%] bg-black rounded-full top-1/2 left-1/2"
                    initial={{ x: "-50%", y: "-50%" }}
                    animate={{
                        x: randomX.map(x => `calc(-50% + ${x}px)`),
                        y: randomY.map(y => `calc(-50% + ${y}px)`)
                    }}
                    transition={{ duration: 5, repeat: Infinity, type: "tween", ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
}

// Intent button component
function IntentButton({
    option,
    onClick,
    theme
}: {
    option: typeof INTENT_OPTIONS[0];
    onClick: () => void;
    theme: any;
}) {
    return (
        <motion.button
            whileHover={{ x: 4 }}
            onClick={onClick}
            className="group flex items-center gap-2 py-1 text-sm font-medium transition-all opacity-80 hover:opacity-100"
        >
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.optionGradient} relative`}>
                {option.label}
                <span className={`absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r ${theme.optionGradient} transition-all group-hover:w-full`} />
            </span>
        </motion.button>
    );
}

// Depth button component
function DepthButton({
    option,
    onClick,
    theme
}: {
    option: typeof DEPTH_OPTIONS[0];
    onClick: () => void;
    theme: any;
}) {
    return (
        <motion.button
            whileHover={{ x: 4 }}
            onClick={onClick}
            className="group flex items-center gap-2 py-1 text-sm font-medium transition-all opacity-80 hover:opacity-100"
        >
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.optionGradient} relative`}>
                {option.label}
                <span className={`absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r ${theme.optionGradient} transition-all group-hover:w-full`} />
            </span>
        </motion.button>
    );
}

// Theme Config
const THEMES = {
    creative: {
        id: 'creative',
        label: 'Creative',
        button: "bg-white text-black shadow-lg shadow-white/10",
        buttonIcon: "text-black",
        window: "bg-[#09090b]/95 border-white/10 shadow-black/50",
        header: "bg-zinc-900/50 border-white/10",
        headerText: "text-white",
        headerSubText: "text-white/50",
        userMsg: "bg-white text-black font-medium shadow-white/5",
        botMsg: "bg-zinc-800/80 text-white/90 border-white/5",
        optionGradient: "from-blue-400 to-orange-400", // Blue -> Orange
        optionIcon: "text-white/50",
        inputBg: "bg-zinc-900/50",
        inputText: "text-white",
        inputPlaceholder: "placeholder:text-white/20",
        inputBorder: "border-white/10",
        sendBtn: "bg-white text-black",
        typingDot: "bg-white/50",
        nudge: "bg-zinc-900/95 border-white/10 text-white/80",
        closeBtn: "bg-zinc-800 text-white/50 hover:text-white hover:bg-zinc-700",
        sheenColor: "via-white/50",
        pulseColor: "bg-green-500"
    },
    ba: {
        id: 'ba',
        label: 'Business',
        button: "bg-slate-800 text-white shadow-lg shadow-slate-900/30",
        buttonIcon: "text-white",
        window: "bg-[#0f172a]/95 border-slate-700 shadow-slate-900/50", // Slate 900
        header: "bg-slate-800/80 border-slate-700",
        headerText: "text-slate-100",
        headerSubText: "text-slate-400",
        userMsg: "bg-blue-600 text-white font-medium shadow-blue-500/10",
        botMsg: "bg-slate-800/90 text-slate-200 border-slate-700",
        optionGradient: "from-blue-400 to-orange-400", // Blue -> Orange (Consistent request)
        optionIcon: "text-slate-400",
        inputBg: "bg-slate-900/50",
        inputText: "text-white",
        inputPlaceholder: "placeholder:text-slate-400",
        inputBorder: "border-slate-700",
        sendBtn: "bg-blue-600 text-white",
        typingDot: "bg-slate-400",
        nudge: "bg-slate-800/95 border-slate-700 text-slate-200",
        closeBtn: "bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600",
        sheenColor: "via-blue-400/30",
        pulseColor: "bg-blue-400"
    }
};

export default function Chatbot() {
    const pathname = usePathname();
    const isBa = pathname?.startsWith('/ba');
    const theme = isBa ? THEMES.ba : THEMES.creative;

    const [isOpen, setIsOpen] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('greeting');
    const [intent, setIntent] = useState<Intent | null>(null);
    const [depth, setDepth] = useState<Depth | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showNudge, setShowNudge] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const nudgeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Nudge configuration
    const NUDGE_DELAY_MS = 90000; // 90 seconds
    const NUDGE_TEXT = "I can unlock David's best work for you. Want a peek?";

    // Greeting message
    const GREETING = "Hello! I'm Dthrills — David's Personal Assistant. \n\nI can help you explore his projects, understand his process, or get straight to business. What's on your mind?";

    // Check if nudge was already shown/dismissed this session
    const wasNudgeHandled = useCallback(() => {
        if (typeof window === 'undefined') return true;
        return sessionStorage.getItem('chatbot_nudge_handled') === 'true';
    }, []);

    // Mark nudge as handled
    const markNudgeHandled = useCallback(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('chatbot_nudge_handled', 'true');
        }
    }, []);

    // Start nudge timer on mount
    useEffect(() => {
        // Don't start timer if already handled or if chat is open
        if (wasNudgeHandled() || isOpen || hasInteracted) return;

        nudgeTimerRef.current = setTimeout(() => {
            if (!isOpen && !hasInteracted && !wasNudgeHandled()) {
                setShowNudge(true);
            }
        }, NUDGE_DELAY_MS);

        return () => {
            if (nudgeTimerRef.current) {
                clearTimeout(nudgeTimerRef.current);
            }
        };
    }, [isOpen, hasInteracted, wasNudgeHandled]);

    // Handle user interaction with bot
    const handleBotInteraction = useCallback(() => {
        setHasInteracted(true);
        setShowNudge(false);
        markNudgeHandled();
        if (nudgeTimerRef.current) {
            clearTimeout(nudgeTimerRef.current);
        }
    }, [markNudgeHandled]);

    // Dismiss nudge
    const dismissNudge = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setShowNudge(false);
        markNudgeHandled();
    }, [markNudgeHandled]);

    // Handle opening chat (marks as interacted)
    const handleOpenChat = useCallback(() => {
        handleBotInteraction();
        setIsOpen(true);
    }, [handleBotInteraction]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initialize with greeting when opened
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: generateId(),
                role: 'bot',
                content: GREETING,
            }]);
            setOnboardingStep('intent');
        }
    }, [isOpen, messages.length]);



    // ... [existing code]

    // Determine which options to show
    const options = isBa ? INTENT_OPTIONS : CREATIVE_INTENT_OPTIONS;

    // Handle intent selection
    const handleIntentSelect = (selectedIntent: Intent) => {
        setIntent(selectedIntent);

        // For resume/contact, skip depth selection
        if (selectedIntent === 'resume_contact') {
            handleQuickAction('resume_contact');
            return;
        }

        // Add user's choice as a message
        const intentLabel = options.find(o => o.id === selectedIntent)?.label || selectedIntent;
        setMessages(prev => [...prev, {
            id: generateId(),
            role: 'user',
            content: intentLabel,
        }]);

        // For Creative mode, skip depth selection and start chatting immediately
        if (!isBa) {
            handleQuickAction(selectedIntent);
            return;
        }

        // Move to depth selection for BA mode
        setOnboardingStep('depth');

        // Add bot prompt for depth
        setMessages(prev => [...prev, {
            id: generateId(),
            role: 'bot',
            content: "How deep should I go?",
        }]);
    };

    // Handle depth selection
    const handleDepthSelect = async (selectedDepth: Depth) => {
        setDepth(selectedDepth);

        // Add user's choice
        const depthLabel = DEPTH_OPTIONS.find(o => o.id === selectedDepth)?.label || selectedDepth;
        setMessages(prev => [...prev, {
            id: generateId(),
            role: 'user',
            content: depthLabel,
        }]);

        setOnboardingStep('chatting');

        // Generate initial response based on intent + depth
        const initialPrompt = getInitialPrompt(intent!, selectedDepth);
        await sendMessage(initialPrompt, true);
    };

    // Get initial prompt based on intent
    const getInitialPrompt = (int: Intent, dep: Depth): string => {
        const prompts: Record<Intent, string> = {
            explore_projects: "Give me an overview of David's projects",
            role_fit: "What are David's key strengths and how would he fit a data analyst role?",
            technical_dive: "Walk me through the technical implementation of one of David's projects",
            recreate_project: "How can I recreate or learn from one of David's projects?",
            testing: "Tell me about the testing and validation approaches used in David's projects",
            consulting: "What consulting services does David offer and what value can he provide?",
            resume_contact: "How can I contact David or get his resume?",
            // Creative intents
            creative_experience: "Tell me about David's creative experience and past work",
            creative_rates: "What are David's rates and pricing for creative services?",
            creative_process: "Walk me through David's creative process",
            creative_services: "What creative services does David offer?",
            creative_availability: "Is David available for collaboration and what's his timeline?",
        };
        return prompts[int];
    };

    // Handle quick action (resume/contact)
    const handleQuickAction = async (action: string) => {
        setOnboardingStep('chatting');

        setMessages(prev => [...prev, {
            id: generateId(),
            role: 'bot',
            content: "Here's how to reach David:\n\n📄 **Resume**: [Download PDF](/David_Ezieshi_Resume.pdf)\n💼 **LinkedIn**: [linkedin.com/in/david-ezieshi](https://www.linkedin.com/in/david-ezieshi/)\n📧 **Email**: Ezieshie@gmail.com\n📅 **Schedule**: [Book a chat](https://calendly.com/ezieshie)\n\nWould you like to know more about his projects or skills?",
        }]);
    };

    // Send message to API with streaming
    const sendMessage = useCallback(async (messageText: string, isInitial = false) => {
        if (!messageText.trim()) return;

        setError(null);

        // Add user message (if not initial automated message)
        if (!isInitial) {
            setMessages(prev => [...prev, {
                id: generateId(),
                role: 'user',
                content: messageText,
            }]);
        }

        setIsTyping(true);

        try {
            const sessionId = getSessionId();

            // Build conversation history
            const conversationHistory = messages
                .filter(m => !m.isStreaming)
                .map(m => ({
                    role: m.role === 'bot' ? 'assistant' as const : 'user' as const,
                    content: m.content,
                }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    sessionId,
                    mode: isBa ? 'ba' : 'creative',
                    intent,
                    depth,
                    conversationHistory,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            // Check if it's a streaming response or escalation
            const contentType = response.headers.get('content-type');

            if (contentType?.includes('application/json')) {
                // Non-streaming response (escalation)
                const data = await response.json();
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    id: generateId(),
                    role: 'bot',
                    content: data.response,
                }]);
                return;
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            const decoder = new TextDecoder();
            const botMessageId = generateId();

            // Add empty bot message for streaming
            setMessages(prev => [...prev, {
                id: botMessageId,
                role: 'bot',
                content: '',
                isStreaming: true,
                isTyping: true,
            }]);

            setIsTyping(false);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.done) {
                                // Mark streaming as complete
                                setMessages(prev => prev.map(m =>
                                    m.id === botMessageId ? { ...m, isStreaming: false } : m
                                ));
                            } else if (data.content) {
                                // Append content to streaming message
                                setMessages(prev => prev.map(m =>
                                    m.id === botMessageId
                                        ? { ...m, content: m.content + data.content }
                                        : m
                                ));
                            }
                        } catch {
                            // Ignore parse errors for incomplete chunks
                        }
                    }
                }
            }

        } catch (err) {
            setIsTyping(false);
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Chat error:', err);
        }
    }, [messages, intent, depth, isBa]);

    // Handle send
    const handleSend = () => {
        if (!input.trim() || isTyping) return;

        // Ensure we're in chatting mode
        if (onboardingStep !== 'chatting') {
            setOnboardingStep('chatting');
        }

        sendMessage(input);
        setInput("");
    };

    return (
        <>
            {/* Nudge Tooltip */}
            <AnimatePresence>
                {showNudge && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-8 right-24 z-50 flex items-center gap-2"
                    >
                        <div className={`relative px-4 py-2 rounded-xl backdrop-blur-xl border shadow-xl max-w-[200px] ${theme.nudge}`}>
                            <p className="text-xs font-medium">{NUDGE_TEXT}</p>
                            <button
                                onClick={dismissNudge}
                                className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-xs transition-colors ${theme.closeBtn}`}
                                aria-label="Dismiss"
                            >
                                ×
                            </button>
                            {/* Arrow pointing to button */}
                            <div className={`absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-current ${isBa ? 'text-slate-800' : 'text-zinc-900'}`} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform overflow-hidden group ${theme.button}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={showNudge ? {
                    scale: [1, 1.08, 1],
                    boxShadow: [
                        '0 0 0 0 rgba(255, 255, 255, 0)',
                        '0 0 20px 0 rgba(255, 255, 255, 0.3)',
                        '0 0 0 0 rgba(255, 255, 255, 0)',
                    ],
                } : {}}
                transition={showNudge ? {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                } : {}}
            >
                {/* Subtle sheen effect */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-transparent ${theme.sheenColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10">
                        <EyeballsIcon className="w-full h-full" theme={theme} />
                    </div>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl overflow-hidden border backdrop-blur-xl shadow-2xl ${theme.window} flex flex-col`}
                        style={{ height: 'min(750px, 85vh)' }}
                    >
                        {/* Header */}
                        <div className={`px-4 py-3 border-b flex items-center gap-3 ${theme.header}`}>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                                <EyeballsIcon className="w-full h-full scale-150" theme={theme} />
                            </div>
                            <div>
                                <div className={`font-semibold text-sm tracking-wide ${theme.headerText}`}>Dthrills</div>
                                <div className={`text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-mono ${theme.headerSubText}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.pulseColor}`}></span>
                                    AI Assistant
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    {msg.role === "bot" && (
                                        <div className="w-6 h-6 mr-3 flex-shrink-0 self-end mb-1">
                                            <div className="w-full h-full rounded-full bg-white/10 p-1">
                                                <EyeballsIcon className="w-full h-full" theme={theme} />
                                            </div>
                                        </div>
                                    )}
                                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                        ? `${theme.userMsg} rounded-br-sm`
                                        : `${theme.botMsg} rounded-bl-sm border`
                                        }`}>
                                        {msg.content}
                                        {msg.isStreaming && (
                                            <span className="inline-block w-1.5 h-3 bg-current ml-1 animate-pulse" />
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Intent Selection Buttons */}
                            {onboardingStep === 'intent' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 pl-9"
                                >
                                    <div className="text-[10px] text-white/30 mb-2 uppercase tracking-widest font-mono">Select an option</div>
                                    <div className="flex flex-col gap-1 items-start">
                                        {options.map(option => (
                                            <IntentButton
                                                key={option.id}
                                                option={option}
                                                onClick={() => handleIntentSelect(option.id)}
                                                theme={theme}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Depth Selection Buttons */}
                            {onboardingStep === 'depth' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-1 items-start mt-2 pl-9"
                                >
                                    {DEPTH_OPTIONS.map(option => (
                                        <DepthButton
                                            key={option.id}
                                            option={option}
                                            onClick={() => handleDepthSelect(option.id)}
                                            theme={theme}
                                        />
                                    ))}
                                </motion.div>
                            )}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="w-6 h-6 mr-3 flex-shrink-0 self-end mb-1">
                                        <div className="w-full h-full rounded-full bg-white/10 p-1">
                                            <EyeballsIcon className="w-full h-full" theme={theme} />
                                        </div>
                                    </div>
                                    <div className={`rounded-2xl rounded-bl-sm border ${theme.botMsg}`}>
                                        <TypingIndicator theme={theme} />
                                    </div>
                                </div>
                            )}

                            {/* Error Display */}
                            {error && (
                                <div className="text-center text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20 mx-auto max-w-[80%]">
                                    {error}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input (only show when chatting) */}
                        {onboardingStep === 'chatting' && (
                            <div className={`p-3 border-t backdrop-blur-md ${theme.inputBg} ${theme.inputBorder}`}>
                                <div className="flex gap-2 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder="Type a message..."
                                        disabled={isTyping}
                                        className={`flex-1 pl-4 pr-12 py-2.5 rounded-full text-sm focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${theme.inputText} ${theme.inputPlaceholder} ${theme.inputBorder} bg-black/20 focus:bg-black/40`}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={isTyping || !input.trim()}
                                        className={`absolute right-1.5 top-1.5 w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-0 disabled:scale-90 ${theme.sendBtn}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
