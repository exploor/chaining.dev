'use client';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { X, Github, Terminal, Cpu, Braces, Workflow, FileText, TrendingUp, Database, Network, ArrowLeft, Send, Minimize2, AlertCircle, BarChart2, Clock, Layers, Shield, Zap, Activity, Info } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

// --- Visual Components for Exposition Layout ---

const TechnicalHeader = ({ project }) => (
  <div className="border-b-4 border-zinc-900 pb-8 mb-8">
    <div className="flex justify-between items-start mb-6">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-3">
          <span className="bg-zinc-900 text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
            PROJECT_ID: {project.id}
          </span>
          <span className="text-zinc-400 text-[10px] font-mono">
            V.{project.version || '1.0.0'} | {project.status || 'STABLE'}
          </span>
        </div>
        <h1 className="text-zinc-900 text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
          {project.title}
        </h1>
        <p className="text-zinc-600 text-xl font-mono italic border-l-4 border-zinc-200 pl-4 py-2">
          "{project.tagline}"
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Build_Metadata</div>
        <div className="flex flex-col gap-1 text-right">
          <div className="text-[11px] font-mono text-zinc-900"><span className="text-zinc-400">DURATION:</span> {project.duration || '6 WEEKS'}</div>
          <div className="text-[11px] font-mono text-zinc-900"><span className="text-zinc-400">STATUS:</span> {project.status || 'PRODUCTION'}</div>
          <div className="text-[11px] font-mono text-zinc-900"><span className="text-zinc-400">COMMIT:</span> a7f3c2d</div>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-8">
      {project.tags?.map(tag => (
        <span key={tag} className="px-3 py-1 bg-zinc-100 border border-zinc-300 text-zinc-600 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-600" />
          {tag}
        </span>
      ))}
    </div>

    <div className="grid grid-cols-4 gap-4">
      {project.stats?.map((stat, i) => (
        <div key={i} className="border-2 border-zinc-900 p-4 bg-zinc-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={32} />
          </div>
          <div className="text-3xl font-black text-zinc-900 tracking-tighter mb-1">{stat.value}</div>
          <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
          <div className="absolute bottom-0 left-0 h-1 bg-blue-800 transition-all duration-500 w-full" />
        </div>
      )) || (
        <div className="col-span-4 text-[10px] text-zinc-400 font-mono text-center p-4 border border-dashed border-zinc-300">
          [NO_STATS_INDEXED]
        </div>
      )}
    </div>
  </div>
);

const TechnicalSection = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`relative border-2 border-zinc-900 bg-white p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] scanline-overlay overflow-hidden ${className}`}>
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
         style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    <div className="relative flex items-center gap-4 mb-6 border-b-2 border-zinc-900 pb-4">
      <div className="bg-zinc-900 text-white p-2">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-zinc-900 text-sm font-black uppercase tracking-[0.2em]">{title}</h4>
        <div className="text-[8px] text-zinc-400 font-mono mt-1 uppercase tracking-widest">SEC_TYPE: ENGINE_REPORT_B</div>
      </div>
    </div>
    <div className="relative text-zinc-700 text-[13px] leading-relaxed font-sans">
      {children}
    </div>
  </div>
);

const MetricCard = ({ label, value, unit }) => (
  <div className="border border-zinc-200 p-4 bg-zinc-50/50 flex flex-col gap-1">
    <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{label}</div>
    <div className="flex items-end gap-1">
      <div className="text-2xl font-black text-zinc-900 tracking-tighter">{value}</div>
      {unit && <div className="text-[10px] font-bold text-zinc-400 mb-1">{unit}</div>}
    </div>
  </div>
);

const SourceNode = ({ label, detail, code, color }) => (
  <div className="retro-window w-[450px] bg-white border-2 border-zinc-900 shadow-2xl p-6 pointer-events-auto group">
    <div className="flex justify-between items-center border-b-2 border-zinc-900 pb-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color || '#3b82f6' }} />
        <span className="text-sm font-black uppercase tracking-tighter text-zinc-900">{label}</span>
      </div>
      <div className="text-[8px] font-mono text-zinc-400">FILE_MODULE_v2.0</div>
    </div>
    <div className="mb-4">
      <p className="text-[11px] text-zinc-600 font-mono leading-relaxed italic border-l-2 border-zinc-200 pl-3">
        {detail}
      </p>
    </div>
    {code && (
      <div className="bg-zinc-900 rounded p-4 font-mono text-[10px] text-blue-300 overflow-hidden relative max-h-[200px] overflow-y-auto custom-scrollbar">
        <div className="absolute top-2 right-2 opacity-20">
          <Terminal size={12} />
        </div>
        <pre className="opacity-90">
          <code>{code}</code>
        </pre>
      </div>
    )}
  </div>
);

const QuantumConnection = ({ startX, startY, endX, endY }) => (
  <g>
    <path 
      d={`M ${startX} ${startY} Q ${(startX + endX)/2} ${(startY + endY)/2 - 100} ${endX} ${endY}`}
      stroke="rgba(59, 130, 246, 0.15)"
      strokeWidth="2"
      fill="none"
    />
    <circle r="3" fill="#3b82f6">
      <animateMotion
        dur={`${3 + Math.random() * 2}s`}
        repeatCount="indefinite"
        path={`M ${startX} ${startY} Q ${(startX + endX)/2} ${(startY + endY)/2 - 100} ${endX} ${endY}`}
      />
    </circle>
    <circle r="1.5" fill="#fff">
      <animateMotion
        dur={`${5 + Math.random() * 3}s`}
        repeatCount="indefinite"
        begin="-1.5s"
        path={`M ${startX} ${startY} Q ${(startX + endX)/2} ${(startY + endY)/2 - 100} ${endX} ${endY}`}
      />
    </circle>
  </g>
);

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4">
        {images?.map((img, i) => (
          <div 
            key={i} 
            className="aspect-video bg-zinc-200 border-2 border-zinc-900 overflow-hidden cursor-zoom-in group relative"
            onClick={() => setSelectedImage(img)}
          >
            <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors z-10" />
            <div className="w-full h-full flex items-center justify-center bg-zinc-100">
               <span className="text-[12px] text-zinc-400 font-mono">[IMG_{i+1}: {img.caption.toUpperCase()}]</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 text-white text-[10px] p-3 font-mono opacity-0 group-hover:opacity-100 transition-opacity z-20">
              {img.caption}
            </div>
          </div>
        )) || (
          <div className="aspect-video border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center text-zinc-400 gap-2">
            <FileText size={24} strokeWidth={1} />
            <span className="text-[10px] font-mono">[MEDIA_PLACEHOLDER]</span>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-full">
              <div className="w-full aspect-video bg-zinc-800 flex items-center justify-center text-white font-mono">
                [EXPANDED_IMAGE: {selectedImage.caption}]
              </div>
              <div className="absolute -top-12 right-0 text-white flex items-center gap-2">
                <span className="text-xs font-mono">{selectedImage.caption}</span>
                <X size={20} className="cursor-pointer" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProjectReport({ project, onClose }) {
  if (!project) return null;

  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I have full access to the project files so ask me anything you want to know!' }
  ]);
  const [chatInput, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    
    setInput('');
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const API_KEY = "cpk_3215aa68e64f4bdb948177ac5527b10c.381752230628574db598f8cd09be095a.Z1iDHhlJNJdZuMKl1CfkBbgX0Y1MAo4S";
      const API_URL = "https://llm.chutes.ai/v1/chat/completions";
      const MODEL = "zai-org/GLM-4.7-TEE";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16",
          messages: [
            { 
              role: 'system', 
              content: `You are the PROJECT_INTELLIGENCE_CORE for "${project.title.toUpperCase()}". 
              
              MISSION: Provide concise, highly technical, and architect-level insights about this project.
              
              DEEP_TECHNICAL_CONTEXT:
              ${project.aiContext || 'No deep context available.'}
              
              DOSSIER_SUMMARY:
              - PROBLEM: ${project.problem}
              - SOLUTION: ${project.solution}
              - STACK: ${project.techStack?.map(t => t.name).join(', ')}
              
              RESPONSE_GUIDELINES:
              1. Refer to the DEEP_TECHNICAL_CONTEXT for internal logic, build order, and code-level specifics.
              2. Be extremely concise. Max 2 paragraphs.
              3. Use normal sentence casing. DO NOT use all caps.
              4. Maintain a "System Intelligence" persona.` 
            },
            ...newMessages.filter(m => m.role !== 'system')
          ],
          stream: true,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`API_ERROR: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;
          if (trimmedLine.startsWith('data: ')) {
            try {
              const parsed = JSON.parse(trimmedLine.slice(6));
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                assistantResponse += content;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content: assistantResponse };
                  return updated;
                });
              }
            } catch (err) {}
          }
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `ERROR: ${error.message.toUpperCase()}` }]);
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 font-mono gap-10"
      onClick={onClose}
    >
      {/* LEFT: Project Dossier - Expanded Window */}
      <div 
        className="relative flex-1 max-w-[1600px] h-[92vh] flex flex-col bg-[#f5f5f5] border-2 border-zinc-900 shadow-[40px_40px_0px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="retro-title-bar px-8 py-4 flex justify-between items-center border-b-2 border-zinc-900 bg-zinc-900 text-white">
          <div className="flex items-center gap-4 text-[13px] font-black uppercase tracking-[0.3em]">
            <Layers size={20} />
            <span>PROJECT_INTELLIGENCE_REPORT::{project.id}.sys</span>
          </div>
          <div className="retro-button w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors" onClick={onClose}>
            <X size={20} />
          </div>
        </div>

        {/* Dossier Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white">
          <div className="max-w-full mx-auto space-y-16">
            
            {/* Header */}
            <div className="border-b-8 border-zinc-900 pb-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-zinc-900 text-white px-4 py-1.5 text-[12px] font-black uppercase tracking-widest">UID: {project.id}</span>
                    <span className="text-zinc-400 text-[12px] font-mono">STABLE_BUILD // V.{project.version || '1.0'}</span>
                  </div>
                  <h1 className="text-zinc-900 text-6xl font-black uppercase tracking-tighter leading-tight mb-6">
                    {project.title}
                  </h1>
                  <p className="text-zinc-500 text-2xl font-mono italic border-l-8 border-zinc-100 pl-8 py-2">"{project.tagline}"</p>
                </div>
                <div className="flex flex-col gap-4 shrink-0">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-10 py-6 bg-zinc-900 text-white font-black text-lg uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center gap-4 shadow-[10px_10px_0px_rgba(0,0,0,0.1)]">
                    <Zap size={24} fill="currentColor" />
                    Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-10 py-6 border-4 border-zinc-900 bg-white text-zinc-900 font-black text-lg uppercase tracking-[0.2em] hover:bg-zinc-100 transition-all flex items-center gap-4">
                    <Github size={24} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Grid - Consolidated */}
            <div className="grid grid-cols-5 gap-6">
              {[...(project.stats || []), ...(project.metrics || []).slice(0, 2)].map((stat, i) => (
                <div key={i} className="border-4 border-zinc-900 p-6 bg-zinc-50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={40} /></div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-4xl font-black text-zinc-900 tracking-tighter">{stat.value}</div>
                </div>
              ))}
            </div>

              {/* Main Insight Sections - Wider Problem/Solution */}
              <div className="grid grid-cols-[1fr_1fr] gap-12">
                <TechnicalSection title="Strategic_Problem" icon={AlertCircle}>
                  <p className="text-lg leading-relaxed mb-8">{project.problem}</p>
                  <div className="space-y-3">
                    {project.challenges?.map((c, i) => (
                      <div key={i} className="text-[11px] text-blue-600 font-black flex gap-4 bg-blue-50 p-4 border-l-4 border-blue-600 uppercase tracking-tight">
                        <span>[CHALLENGE]</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </TechnicalSection>

                <TechnicalSection title="Technical_Solution" icon={Workflow}>
                  <p className="text-lg leading-relaxed mb-8">{project.solution}</p>
                  <div className="bg-zinc-900 text-blue-400 p-8 rounded-lg border-2 border-zinc-800 font-mono text-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Terminal size={60} /></div>
                    <span className="text-zinc-500 font-black tracking-[0.2em] text-[9px] block mb-4">// ARCHITECT_LOG</span>
                    <p className="italic leading-relaxed text-blue-100 opacity-90 text-base">"{project.personalNotes}"</p>
                  </div>
                </TechnicalSection>
              </div>

            {/* Final Details Section */}
            <div className="grid grid-cols-3 gap-12">
              <div className="col-span-2">
                <TechnicalSection title="Execution_Insights" icon={Info}>
                  <ul className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {project.lessons?.map((l, i) => (
                      <li key={i} className="text-base flex gap-4 text-zinc-600">
                        <span className="text-blue-600 font-black shrink-0">{">>"}</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </TechnicalSection>
              </div>

              <div className="space-y-8">
                <TechnicalSection title="System_Stack" icon={Cpu}>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, i) => (
                      <div key={i} className="group relative">
                        <span className="px-4 py-2 bg-zinc-100 border-2 border-zinc-300 text-zinc-800 text-[11px] font-black uppercase tracking-tighter hover:border-zinc-900 transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </TechnicalSection>
                <TechnicalSection title="Gallery" icon={Database}>
                  <Gallery images={project.images} />
                </TechnicalSection>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-zinc-900 border-t-4 border-zinc-900 p-4 px-10 flex justify-between items-center text-[12px] font-black text-zinc-500 uppercase tracking-[0.3em]">
          <div className="flex gap-12">
            <span className="flex items-center gap-3"><div className="w-2.5 h-2.5 bg-green-500 rounded-full" /> SYSTEM_ACTIVE</span>
            <span>INTEL_ENGINE_v6.4</span>
            <span>SECURE_DATA_LAYER</span>
          </div>
          <div>© {new Date().getFullYear()} PRIOR_INTEL_SYSTEMS</div>
        </div>
      </div>

      {/* RIGHT: Project Assistant - Detached Window */}
      <div 
        className="w-[600px] h-[92vh] flex flex-col bg-[#050505] border-2 border-zinc-800 shadow-[40px_40px_0px_rgba(0,0,0,0.6)] overflow-hidden group"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 px-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping opacity-40" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">PROJECT ASSISTANT</span>
          </div>
          <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest px-2 py-0.5 border border-zinc-800">SYS::v4.7</div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#050505] custom-scrollbar-themed relative">
          <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[95%] p-4 px-6 relative ${
                m.role === 'user' 
                  ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl rounded-tr-none' 
                  : 'bg-blue-950/10 border border-blue-900/20 text-blue-50/90 rounded-xl rounded-tl-none shadow-2xl'
              }`}>
                <div className="text-base leading-relaxed font-mono font-medium tracking-tight">
                  {m.content}
                </div>
                {m.role !== 'user' && (
                  <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-blue-500/50" />
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-4 text-blue-600 text-[11px] font-black tracking-[0.2em] animate-pulse pl-2">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>LINKING_CONTEXT...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input & Suggestions */}
        <div className="p-6 bg-zinc-900/30 border-t border-zinc-800 shrink-0">
          <div className="flex flex-wrap gap-2 mb-6">
            {(project.id === 'minimamcp' ? [
              "Use cases?",
              "Auto-confirm",
              "KISSVM",
              "P2P"
            ] : [
              "Use cases?",
              "Architecture",
              "Challenges",
              "Data flow"
            ]).map((prompt, i) => (
              <button 
                key={i}
                onClick={() => setInput(prompt)}
                className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-zinc-800 text-zinc-600 hover:border-blue-900 hover:text-blue-500 transition-all bg-zinc-950/50"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleChatSend} className="relative group/input">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setInput(e.target.value)}
              placeholder="QUERY..."
              className="relative w-full bg-zinc-950 border border-zinc-800 p-4 pr-16 text-[14px] font-mono text-zinc-300 outline-none focus:border-blue-900 transition-all placeholder:text-zinc-800 shadow-inner"
            />
            <button 
              type="submit" 
              disabled={isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-zinc-700 hover:text-blue-500 disabled:opacity-20 transition-all"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center opacity-30">
            <div className="flex gap-2">
              <div className="h-0.5 w-4 bg-zinc-700" />
              <div className="h-0.5 w-8 bg-zinc-700" />
            </div>
            <span className="text-[8px] text-zinc-700 font-black uppercase tracking-[0.3em]">
              NEMOTRON_30B_OPTIMIZED
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar-themed::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar-themed::-webkit-scrollbar-track {
          background: #050505;
        }
        .custom-scrollbar-themed::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 10px;
        }
        .custom-scrollbar-themed::-webkit-scrollbar-thumb:hover {
          background: #2a2a2a;
          border: 1px solid #3b82f633;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none scanline-overlay opacity-5" />
    </motion.div>
  );
}
