'use client';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Handle, 
  Position, 
  useNodesState, 
  useEdgesState,
  Edge,
  Node,
  ReactFlowProvider,
  getSmoothStepPath,
  EdgeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import { projects } from '@/data/projects';
import ProjectReport from '@/components/ProjectReport';
import { AnimatePresence, motion } from 'framer-motion';

// --- Custom Quantum Flow Edge (Updated for Light Background) ---
const QuantumFlowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 40,
  });

  return (
    <>
      {/* Base Path */}
      <path
        id={id}
        style={{ ...style, strokeOpacity: 0.1, strokeWidth: 1.5 }}
        className="react-flow__edge-path"
        d={edgePath}
        stroke="#808080"
      />
      
      {/* Primary Electron - Blue */}
      <circle r="2" fill="#000080">
        <animateMotion
          dur={`${8 + Math.random() * 4}s`}
          repeatCount="indefinite"
          path={edgePath}
        />
      </circle>
      
      {/* Secondary Electron - Grey */}
      <circle r="1.5" fill="#808080">
        <animateMotion
          dur={`${12 + Math.random() * 4}s`}
          repeatCount="indefinite"
          path={edgePath}
          begin="-3s"
        />
      </circle>
    </>
  );
};

// --- Custom Project Node Component (Mini VM / Desktop Style) ---
const ProjectNode = ({ data }: any) => {
  // Use project demo URL or fallback to internal link style
  const displayUrl = data.project.demo ? data.project.demo.replace('https://', '') : `internal://${data.project.id}.sys`;

  return (
    <div className="retro-window w-[300px] pointer-events-auto">
      {/* Title Bar */}
      <div className="retro-title-bar">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-3 h-3 bg-zinc-300 rounded-sm flex items-center justify-center">
            <div className="w-1 h-1 bg-zinc-800" />
          </div>
          <a 
            href={data.project.demo || '#'} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-[10px] font-bold truncate hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {displayUrl}
          </a>
        </div>
        <div className="flex gap-1">
          <div className="retro-button">_</div>
          <div className="retro-button">□</div>
          <div className="retro-button">×</div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 bg-white border border-inset border-zinc-400 m-1 min-h-[100px] flex flex-col gap-3">
        <h3 className="text-zinc-900 text-xs font-black uppercase tracking-wider">
          {data.title}
        </h3>
        <p className="text-zinc-600 text-[10px] leading-relaxed font-mono italic">
          {data.project.tagline || data.project.problem.substring(0, 80) + '...'}
        </p>
        <div className="flex gap-2 mt-auto">
          {data.project.tags?.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-[8px] px-1.5 py-0.5 bg-zinc-100 text-zinc-500 border border-zinc-300 font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const nodeTypes = { project: ProjectNode };
const edgeTypes = { quantum: QuantumFlowEdge };

// --- Main Page Component ---
function FlowContent() {
  const [activeProject, setActiveProject] = useState(null);

  const initialNodes: Node[] = useMemo(() => {
    const layout = [
      { x: 700, y: 300 },  // CENTER
      { x: 250, y: 100 },  // TOP LEFT
      { x: 250, y: 500 },  // BOTTOM LEFT
      { x: 1150, y: 100 }, // TOP RIGHT
      { x: 1150, y: 500 }, // BOTTOM RIGHT
    ];

    return projects.map((p, i) => ({
      id: p.id,
      type: 'project',
      position: layout[i] || { x: i * 400, y: 300 },
      data: { title: p.title, project: p },
      dragHandle: '.retro-title-bar',
    }));
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    const connections = [
      [1, 0], [2, 0], [3, 0], [4, 0],
      [1, 2], [3, 4],
      [1, 3], [2, 4]
    ];

    const flowColors = ['#000080', '#808080', '#404040', '#000080', '#808080'];

    return connections
      .filter(([i, j]) => projects[i] && projects[j])
      .map(([i, j], idx) => ({
        id: `edge-${i}-${j}`,
        source: projects[i].id,
        target: projects[j].id,
        type: 'quantum',
        style: { stroke: flowColors[idx % flowColors.length] },
      }));
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setActiveProject(node.data.project);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#efefef] font-sans overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          nodesConnectable={false}
          className="bg-transparent"
          minZoom={0.1}
          maxZoom={1.5}
        >
          {/* No background component needed as CSS handles texture, but we can add a subtle grid */}
          <Background color="#000" gap={40} size={0.5} opacity={0.05} />
        </ReactFlow>
      </div>

      {/* Retro Branding - Hidden when project is active */}
      {!activeProject && (
        <div className="absolute bottom-16 left-16 z-[200] pointer-events-none">
          <div className="flex flex-col gap-4 items-start pointer-events-auto">
            <div className="retro-window p-8 border-4 border-zinc-900 shadow-[20px_20px_0px_rgba(0,0,0,0.15)] bg-white group hover:shadow-[30px_30px_0px_rgba(0,0,0,0.2)] transition-all duration-500">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <h1 className="text-zinc-900 text-4xl font-black uppercase tracking-[-0.05em] leading-none mb-2">
                    Tom Prior
                  </h1>
                  <div className="h-1.5 w-16 bg-blue-600 mb-4" />
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex gap-8 items-center border-b border-zinc-100 pb-4">
                    <a href="https://github.com/exploor" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 font-mono text-[10px] font-black uppercase tracking-widest transition-all">
                      GitHub
                    </a>
                    <a href="https://egoic.ai" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 font-mono text-[10px] font-black uppercase tracking-widest transition-all">
                      Live
                    </a>
                    <a href="tel:07933274654" className="text-blue-600 hover:text-blue-800 font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                      07933274654
                    </a>
                  </div>

                  <div className="relative group/msg">
                    <input 
                      type="text" 
                      placeholder="DIRECT_QUERY..."
                      className="w-full bg-zinc-50 border-2 border-zinc-200 p-3 pr-12 text-[11px] font-mono outline-none focus:border-zinc-900 transition-all uppercase placeholder:opacity-30"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const msg = (e.target as HTMLInputElement).value;
                          window.location.href = `mailto:tradesprior@gmail.com?subject=Portfolio%20Query&body=${encodeURIComponent(msg)}`;
                        }
                      }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within/msg:text-zinc-900 transition-colors pointer-events-none">
                      <div className="text-[8px] font-black">ENTR</div>
                    </div>
                  </div>
                  
                  <div className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.2em] flex justify-between">
                    <span>tradesprior@gmail.com</span>
                    <span>LINK_ESTABLISHED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {activeProject && (
          <ProjectReport 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>

      <div className="absolute top-10 right-10 z-[200] pointer-events-none select-none">
        <div className="text-[8px] uppercase tracking-[0.5em] text-zinc-400 font-mono rotate-90 origin-right flex items-center gap-4">
          <span className="h-px w-12 bg-zinc-200"></span>
          SYS.OS.V6.0_STABLE
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
}
