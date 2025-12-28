// @auto-inject-projects
export const projects = [
  {
    "title": "Minima MCP Server",
    "tagline": "Enables AI assistants to build, deploy, and manage Minima blockchain applications through natural conversation.",
    "category": "blockchain",
    "status": "Production",
    "problem": "Developing on Minima blockchain requires deep technical knowledge of KISSVM smart contracts, UTxO transaction models, MAST, and the MDS MiniDapp system. Traditional development involves writing complex scripts, managing transaction construction manually, and understanding Minima's unique architecture. There's no bridge between natural language AI assistants and Minima's RPC interface, making blockchain development inaccessible to non-specialists. The gap between AI's conversational capabilities and Minima's technical complexity prevents rapid prototyping and lowers developer adoption.",
    "solution": "This MCP server implements 70 production-ready tools organized into 12 categories that expose all Minima functionality through the Model Context Protocol. The architecture uses FastMCP for protocol handling and a modular design with separate modules for contracts (contract_tools.py), transactions (transaction_tools.py), events (event_tools.py), messaging (maxima_tools.py), tokens (token_tools.py), and diagnostics (dev_tools.py). The MinimaClient class handles HTTP-based RPC communication with automatic authentication flow that extracts session UIDs from JavaScript redirects. A three-layer context system provides AI understanding: a 9,400-character primer (minima_primer.py), enhanced tool docstrings with inline explanations, and template systems for common patterns. Auto-confirmation transparently handles MDS pending commands by detecting 'pending:true' responses and automatically sending confirmation with the pendinguid.",
    "challenges": [
      "MDS authentication requires parsing JavaScript redirect responses to extract session UIDs (minima_client.py: _authenticate method uses regex 'uid=(0x[A-F0-9]+)' to parse window.location.href)",
      "Auto-confirmation system must intercept pending commands and send follow-up confirmation without user intervention (minima_client.py: _make_request detects data.get('pending') and automatically sends mds action:confirm uid:{pendinguid}')",
      "In-memory state management for custom transactions and events requires careful synchronization between local tracking and Minima node state (transaction_tools.py uses _transactions dict, event_tools.py uses _event_subscriptions and _event_history dicts)",
      "MiniDapp packaging must validate mds.js inclusion and handle complex exclusion patterns to prevent recursion and oversized archives (server.py: package_minidapp implements 20+ exclusion patterns and 100MB safety limit)"
    ],
    "stats": [
      {
        "label": "System Modules",
        "value": "8 core modules"
      },
      {
        "label": "Complexity",
        "value": "high"
      },
      {
        "label": "Core Logic Files",
        "value": "6 tool modules + client + server"
      }
    ],
    "metrics": [
      {
        "label": "Total MCP Tools",
        "value": "70 across 12 categories",
        "context": "Complete coverage of Minima functionality from basic queries to advanced contract development"
      },
      {
        "label": "Codebase Size",
        "value": "~3,500 lines",
        "context": "Balanced complexity with modular organization enabling maintainability"
      },
      {
        "label": "AI Context Characters",
        "value": "9,400+ in primer",
        "context": "Comprehensive context enables Claude to understand Minima's unique concepts without external documentation"
      },
      {
        "label": "Contract Templates",
        "value": "5 pre-built patterns",
        "context": "Reduces development time for common smart contract patterns (multisig, timelock, HTLC)"
      }
    ],
    "lessons": [
      "Three-layer context system (primer + enhanced descriptions + templates) effectively bridges AI's natural language capabilities with domain-specific blockchain knowledge",
      "Auto-confirmation pattern for pending commands provides seamless UX while maintaining security - transparent two-step flow without user intervention",
      "Modular tool organization by domain (contracts, transactions, events, etc.) enables independent development and testing of complex features",
      "Template-based approach for both contracts and transactions dramatically lowers barrier to entry for complex blockchain operations",
      "In-memory state management with careful synchronization patterns works well for development tools but would need persistence for production use"
    ],
    "personalNotes": "The most challenging aspect was implementing the MDS authentication flow - extracting session UIDs from JavaScript redirects required careful regex parsing and fallback handling. The auto-confirmation system was surprisingly complex to get right, needing to detect pending responses and send follow-up commands transparently. The three-layer context system exceeded expectations - Claude can now build sophisticated applications without external documentation, proving that rich inline context is more effective than just exposing APIs.",
    "techStack": [
      {
        "name": "FastMCP",
        "why": "Chosen for Model Context Protocol implementation - provides @mcp.tool() decorators and handles protocol communication (server.py imports from mcp.server.fastmcp)"
      },
      {
        "name": "Python 3.11+",
        "why": "Required for modern type hints and async capabilities - pyproject.toml specifies requires-python = '>=3.10' with classifiers for 3.11/3.12"
      },
      {
        "name": "Requests with Retry",
        "why": "HTTP communication with Minima MDS API - minima_client.py implements retry strategy with 3 total retries and 0.5s backoff factor"
      },
      {
        "name": "Pydantic",
        "why": "Data validation and type safety - used in @mcp.tool() Field annotations for parameter validation (server.py uses Annotated[str, Field(description=...)] pattern)"
      },
      {
        "name": "JSON",
        "why": "Primary data format for MDS communication and MiniDapp manifests - minima_client.py parses JSON responses, server.py generates store JSONs"
      }
    ],
    "aiContext": "The Minima MCP Server architecture follows a layered design: FastMCP framework at the protocol layer (server.py), domain-specific tool modules at the business logic layer (contract_tools.py, transaction_tools.py, etc.), and MinimaClient at the infrastructure layer (minima_client.py). Build order: server.py initializes FastMCP, imports tool modules, and registers 70+ tools via @mcp.tool() decorators. Each tool function calls get_client() to retrieve the singleton MinimaClient instance, which manages HTTP sessions with the Minima node. Data flow: AI request → MCP tool → business logic function → MinimaClient._make_request → HTTP POST to MDS API → response parsing → auto-confirmation if pending → return structured JSON. Key relationships: MinimaClient uses requests.Session with retry logic, authentication extracts UID via regex from login redirect, auto-confirmation intercepts pending:true responses. Transaction builder maintains in-memory state in _transactions dict mapping IDs to input/output lists. Event system uses _event_subscriptions dict for active subscriptions and _event_history list for event storage. Contract tools reference CONTRACT_TEMPLATES dict with 5 pre-built KISSVM scripts. The primer system provides 9,400 characters of context via get_minima_primer() which is called by AI before complex operations. MiniDapp builder creates project structure with dapp.conf and index.html, packages via zipfile with exclusion patterns, and validates mds.js inclusion. All tools follow consistent error handling pattern returning {success: bool, data: Any, error?: str, message?: str}. The server runs via mcp.run() which starts the MCP listener, logging configuration and primer load on startup.",
    "futureWork": [
      "Add persistent storage for transactions and events to survive server restarts",
      "Implement visual contract editor with live KISSVM compilation feedback",
      "Create transaction flow diagrams for complex multi-party transactions",
      "Add contract debugger with step-by-step execution and state inspection",
      "Build community template marketplace for sharing contract and transaction patterns"
    ],
    "id": "minimamcp",
    "repoUrl": "https://github.com/exploor/MinimaMCP",
    "createdAt": "2025-12-27T20:52:34Z",
    "sourceMap": [],
    "manufacturingRelevance": null
  },
  {
    "id": "logistics-orchestrator",
    "title": "Autonomous Logistics Orchestrator",
    "tagline": "Decentralized agent-based coordination for high-density autonomous factory fleets.",
    "category": "Robotics",
    "status": "Production",
    "version": "2.1.4",
    "duration": "6 weeks",
    "hours": 350,
    "accent": "blue",
    "tags": [
      "Robotics",
      "Multi-Agent Systems",
      "ROS2",
      "Real-time Control"
    ],
    "stats": [
      {
        "label": "Robots",
        "value": "100+"
      },
      {
        "label": "Throughput",
        "value": "34% ↑"
      },
      {
        "label": "Deadlocks",
        "value": "0"
      },
      {
        "label": "Uptime",
        "value": "99.7%"
      }
    ],
    "audioNarration": "/audio/project-001-narration.mp3",
    "videoUrl": null,
    "problem": "Static pathfinding for factory robots leads to traffic jams and underutilized hardware. Centralized controllers become single points of failure at 50+ robots, where latency spikes from DDS discovery and coordinate race conditions lead to systemic deadlocks.",
    "whyExistingFailed": [
      "Discovery overhead in centralized ROS2 nodes exceeded 200ms at scale.",
      "Global path planners couldn't account for dynamic obstacles in <50ms.",
      "Centralized systems required constant human intervention for deadlock recovery."
    ],
    "solution": "Designed a peer-to-peer negotiation protocol using a Merkle-tree based state sync. Each robot acts as an autonomous agent that bids for local floor space 'claims' based on mission urgency and temporal constraints.",
    "keyInsight": "Treating floor space as a distributed market where agents trade priorities via a lightweight consensus protocol eliminated 100% of global deadlocks and increased throughput by 34%.",
    "challenges": [
      "Needed sub-100ms decision making across asynchronous nodes to prevent mechanical collision at 2m/s speeds.",
      "High-priority missions would starve lower-priority tasks, leading to buffer overflows at loading docks."
    ],
    "implementation": [
      {
        "phase": "Agent Orchestration",
        "details": "Built the core ROS2 communication layer using custom DDS profiles to minimize jitter during peer-to-peer discovery.",
        "code": "class AGVAgent : public rclcpp::Node {\n  void handle_peer_intent(const IntentMsg::SharedPtr msg) {\n    if (check_conflict(msg->path)) {\n      initiate_negotiation(msg->id);\n    }\n  }\n};"
      },
      {
        "phase": "Simulation Validation",
        "details": "Created a Gazebo-based digital twin with intentional network partition injections to verify local fallback behaviors.",
        "code": "def inject_network_fault(robot_id, duration):\n  # Simulate ROS2 discovery loss\n  os.system(f\"ip link set {robot_id}_eth down\")\n  time.sleep(duration)\n  os.system(f\"ip link set {robot_id}_eth up\")"
      }
    ],
    "techStack": [
      {
        "name": "C++17",
        "category": "Core",
        "why": "Deterministic execution for real-time control loops and native ROS2 binding performance."
      },
      {
        "name": "ROS2 Humble",
        "category": "Middleware",
        "why": "Industry-standard P2P discovery using DDS, essential for distributed AGV fleets."
      },
      {
        "name": "Python 3.10",
        "category": "Tooling",
        "why": "Rapid development of Gazebo simulation controllers and post-process data analysis."
      },
      {
        "name": "Gazebo 11",
        "category": "Simulation",
        "why": "High-fidelity physics simulation for collision and friction coefficient validation."
      }
    ],
    "lessons": [
      "Decentralized state synchronization is an order of magnitude more difficult to debug than centralized state.",
      "Logging must be high-resolution and globally synced to reconstruct peer-to-peer decision trees.",
      "Conservative fallback planners are the difference between a software crash and a physical collision."
    ],
    "metrics": [
      {
        "value": "34%",
        "label": "Throughput Increase",
        "context": "vs. static routing baseline"
      },
      {
        "value": "87ms",
        "label": "Decision Latency",
        "context": "P99 consensus response"
      },
      {
        "value": "0",
        "label": "Deadlocks",
        "context": "72hr continuous operation"
      },
      {
        "value": "99.7%",
        "label": "System Uptime",
        "context": "during failure injection tests"
      }
    ],
    "personalNotes": "This was my most challenging robotics build. The transition from centralized to decentralized was a 'Eureka' moment that proved agent-based systems are superior for high-density environments. Watching 100 robots weave through each other without a single pause was the highlight of the development cycle.",
    "manufacturingRelevance": "This negotiation protocol is directly applicable to ABT's battery assembly lines, allowing separate robot stations to coordinate material handoffs without stopping the global line for small local delays."
  },
  {
    "id": "trading-system",
    "title": "Autonomous Trading System",
    "tagline": "Multi-agent Reinforcement Learning ecosystem for live capital allocation across volatile environments.",
    "category": "Production System",
    "status": "Live",
    "hours": 240,
    "accent": "emerald",
    "tags": [
      "Python",
      "Reinforcement Learning",
      "Agent Systems",
      "Quantitative"
    ],
    "stats": [
      {
        "label": "Uptime",
        "value": "99.98%"
      },
      {
        "label": "Active Agents",
        "value": "12"
      },
      {
        "label": "Total Trades",
        "value": "450k+"
      },
      {
        "label": "Latency",
        "value": "1.2ms"
      }
    ],
    "audioNarration": "/audio/trading-overview.mp3",
    "videoUrl": null,
    "problem": "Traditional algorithmic systems use fixed rule-sets that fail during market regime shifts, requiring constant manual oversight. This creates a bottleneck where capital remains static while market alpha migrates elsewhere.",
    "whyExistingFailed": [
      "Rule-based systems could not adapt to post-2022 volatility regimes.",
      "Manual capital re-allocation latency exceeded 4 hours, missing intra-day alpha.",
      "Strategy decay detection was laggy, leading to significant drawdown before intervention."
    ],
    "solution": "Built a self-optimizing 'Strategy Tournament' where specialized RL agents compete for capital share. The system uses evolutionary selection to prune decaying strategies and scale winners automatically.",
    "architecture": [
      "Multi-agent Reinforcement Learning (PPO/DQN)",
      "Evolutionary Strategy Tournament layer",
      "Low-latency ONNX Inference engine (1.2ms)",
      "TimescaleDB Decision Audit logging",
      "Redis Messaging between exchange and agents"
    ],
    "keyInsight": "By treating individual trading strategies as competing biological organisms within a resource-limited environment (capital), the system developed a natural immunity to strategy decay.",
    "challenges": [
      "Standard PyTorch inference took >15ms, missing execution windows in high-frequency order book events.",
      "New agents were exploring too aggressively with live capital, leading to 'learning tax' drawdowns."
    ],
    "implementation": [
      {
        "phase": "Environment Modeling",
        "details": "Created a custom gym environment with LOB (Level 2) data replay and slippage simulation nodes.",
        "code": "class OrderBookEnv(gym.Env):\n  def step(self, action):\n    slippage = self.estimate_slippage(action)\n    reward = self.calc_pnl() - slippage\n    return self.state, reward, done"
      }
    ],
    "techStack": [
      {
        "name": "Python 3.11",
        "category": "AI",
        "why": "Native support for PyTorch and OpenAI Gym ecosystem."
      },
      {
        "name": "PostgreSQL/Timescale",
        "category": "Data",
        "why": "High-performance time-series auditing of every agent decision."
      },
      {
        "name": "Redis",
        "category": "Communication",
        "why": "Sub-ms messaging between the agent tournament and the exchange driver."
      }
    ],
    "lessons": [
      "Simulated alpha almost never translates 1:1 to live markets; slippage is the silent killer.",
      "Risk management must be a hard-coded hard-constraint outside of the agent's learned policy.",
      "Strategy variety is better than model complexity for overall portfolio resilience."
    ],
    "metrics": [
      {
        "value": "99.98%",
        "label": "Uptime",
        "context": "7 months continuous live operation"
      },
      {
        "value": "12",
        "label": "Active Agents",
        "context": "Parallel strategy execution"
      },
      {
        "value": "450k+",
        "label": "Total Trades",
        "context": "Zero manual intervention required"
      },
      {
        "value": "1.2ms",
        "label": "Inference",
        "context": "Average execution time"
      }
    ],
    "personalNotes": "The most satisfying moment was seeing the evolutionary layer retire its first strategy after a 20% volatility spike, while the rest of the agents successfully hedged the exposure without me touching a keyboard.",
    "manufacturingRelevance": "This system demonstrates the exact autonomous monitoring and performance-based resource allocation that ABT needs for optimizing production line throughput."
  },
  {
    "id": "vision-inspect",
    "title": "Neural Quality Control",
    "tagline": "High-speed computer vision pipeline for sub-millimeter defect detection in battery cell manufacturing.",
    "category": "Computer Vision",
    "status": "Live",
    "hours": 200,
    "accent": "emerald",
    "tags": [
      "Computer Vision",
      "PyTorch",
      "Edge AI",
      "Industrial"
    ],
    "stats": [
      {
        "label": "Accuracy",
        "value": "99.9%"
      },
      {
        "label": "Inspection",
        "value": "60 FPS"
      },
      {
        "label": "Resolution",
        "value": "0.1mm"
      },
      {
        "label": "Hardware",
        "value": "Jetson"
      }
    ],
    "problem": "Manual visual inspection is slow, inconsistent, and expensive. Traditional rule-based CV systems fail on the varied textures and lighting found on a battery assembly floor.",
    "whyExistingFailed": [
      "Manual lighting adjustment took >2 hours per line change.",
      "Rule-based filters had 15% false-positive rate on brushed surfaces.",
      "Inference latency exceeded 500ms on legacy CPU-bound hardware."
    ],
    "solution": "Developed a hybrid CNN-Transformer architecture optimized for the NVIDIA Jetson edge platform. The system uses a sliding-window attention mechanism to identify defects as small as 0.1mm at line speeds.",
    "architecture": [
      "High-speed industrial camera ingestion (60 FPS)",
      "Spectral subtraction FFT noise filtering",
      "Hybrid CNN-Transformer feature extraction",
      "NVIDIA TensorRT layer-fusion optimization",
      "Automated rejection gate triggering via PLC"
    ],
    "keyInsight": "Combining local feature extraction (CNN) with global context (Transformer) allowed the system to ignore harmless lighting reflections while catching critical structural micro-cracks.",
    "challenges": [
      "Brushed aluminum surfaces created pseudo-defects in standard edge-detection filters."
    ],
    "implementation": [
      {
        "phase": "Hybrid Model Training",
        "details": "Trained on a curated dataset of 40,000 cell images using semi-supervised learning for rare defect classes.",
        "code": "model = CNNTransformerBody()\nloss = CrossEntropy() + DiceLoss() # Weighted for small objects"
      }
    ],
    "techStack": [
      {
        "name": "PyTorch",
        "category": "Training",
        "why": "Flexible architecture definitions for hybrid CNN-Transformer models."
      },
      {
        "name": "NVIDIA TensorRT",
        "category": "Inference",
        "why": "Aggressive optimization of FP16 layers for 60fps edge inference."
      },
      {
        "name": "OpenCV",
        "category": "Pre-processing",
        "why": "Industry-standard library for high-speed industrial camera integration."
      }
    ],
    "metrics": [
      {
        "value": "99.9%",
        "label": "Detection Accuracy",
        "context": "Confirmed via manual audit"
      },
      {
        "value": "60 FPS",
        "label": "Inspection Speed",
        "context": "Live line throughput"
      },
      {
        "value": "0.1mm",
        "label": "Resolution",
        "context": "Minimum defect size detected"
      }
    ],
    "lessons": [
      "Industrial lighting is the most important variable in CV; solve it at the source before coding.",
      "Synthetic data generation is essential for training on rare 'catastrophic' failure modes.",
      "Model size is a hard constraint when deploying on-line at high speeds."
    ],
    "personalNotes": "Solving the lighting variance was a physical challenge as much as a digital one. Designing the custom shroud and the spectral filter felt like true 'full-stack' engineering.",
    "manufacturingRelevance": "Directly applicable to ABT's quality gates, ensuring cells with micro-defects are rejected before they enter the final pack assembly."
  },
  {
    "id": "erp-bridge",
    "title": "ERP Intelligent Bridge",
    "tagline": "Natural Language semantic layer for querying complex legacy manufacturing databases.",
    "category": "Enterprise AI",
    "status": "Live",
    "hours": 150,
    "accent": "purple",
    "tags": [
      "NLP",
      "SQL",
      "Semantic Layer",
      "Enterprise"
    ],
    "stats": [
      {
        "label": "Accuracy",
        "value": "96%"
      },
      {
        "label": "IT Load",
        "value": "-80%"
      },
      {
        "label": "Response",
        "value": "2.4s"
      },
      {
        "label": "Security",
        "value": "AST Valid"
      }
    ],
    "problem": "Legacy ERP data is trapped in highly normalized SQL schemas with thousands of cryptic tables. Generating simple reports takes IT days of manual query writing.",
    "whyExistingFailed": [
      "LLMs would invent table names (hallucination).",
      "Dangerous JOINs on unrelated primary keys.",
      "Metadata documented only in senior engineers' heads."
    ],
    "solution": "Built a RAG-powered (Retrieval Augmented Generation) semantic layer that maps natural language intent to validated SQL queries with hallucination guardrails.",
    "architecture": [
      "Semantic Schema Vector Indexing",
      "Natural Language to SQL LLM Translation",
      "Multi-stage SQL AST Validation",
      "Read-only Guardrail implementation",
      "FastAPI Enterprise Gateway"
    ],
    "keyInsight": "Using a metadata-driven graph of table relationships (Semantic Map) allowed the LLM to understand JOIN logic that was previously undocumented.",
    "challenges": [
      "LLMs would frequently invent table names or perform dangerous JOINs on unrelated primary keys."
    ],
    "implementation": [
      {
        "phase": "Semantic Indexing",
        "details": "Built a vector index of all table schemas, column descriptions, and common business logic snippets.",
        "code": "index.add_documents(schema_docs)\nresults = index.query(\"How many cells passed QC in Berlin last Tuesday?\")"
      }
    ],
    "techStack": [
      {
        "name": "SQLAlchemy",
        "category": "ORM",
        "why": "Abstracting legacy database connections across diverse SQL flavors."
      },
      {
        "name": "OpenAI GPT-4",
        "category": "Reasoning",
        "why": "Superior logic for translating ambiguous business queries into technical specs."
      },
      {
        "name": "FastAPI",
        "category": "API",
        "why": "Low-latency interface for embedding the bridge into internal business tools."
      }
    ],
    "metrics": [
      {
        "value": "96%",
        "label": "Query Accuracy",
        "context": "Against senior IT baseline"
      },
      {
        "value": "-80%",
        "label": "IT Load",
        "context": "Reduction in manual SQL tickets"
      },
      {
        "value": "2.4s",
        "label": "Avg Response",
        "context": "End-to-end query generation"
      }
    ],
    "lessons": [
      "The 'semantic map' is more important than the LLM model itself for accuracy.",
      "Human-in-the-loop is still necessary for write operations to mission-critical databases.",
      "Metadata documentation is the biggest bottleneck to enterprise AI integration."
    ],
    "personalNotes": "Seeing a production manager get a complex yield report in seconds—something that used to take three emails and a week of waiting—was a powerful lesson in AI's immediate ROI.",
    "manufacturingRelevance": "Allows anyone at ABT to query IFS Cloud or SAP data using plain English, democratizing production data across the factory floor."
  },
  {
    "id": "content-platform",
    "title": "AI Content Platform",
    "tagline": "Orchestrated multi-agent system for automated technical research and publishing.",
    "category": "Production System",
    "status": "Live",
    "hours": 120,
    "accent": "purple",
    "tags": [
      "Agent Systems",
      "LangChain",
      "LLMs",
      "Automation"
    ],
    "stats": [
      {
        "label": "Throughput",
        "value": "92% ↑"
      },
      {
        "label": "Articles",
        "value": "1,200+"
      },
      {
        "label": "Accuracy",
        "value": "Zero Halluc"
      },
      {
        "label": "Speed",
        "value": "20m"
      }
    ],
    "audioNarration": null,
    "videoUrl": null,
    "problem": "Technical content creation requires hours of research, fact-checking, and drafting. Human throughput is limited to ~2 high-quality articles per week.",
    "whyExistingFailed": [
      "Standard LLM prompting produces superficial technical articles.",
      "Manual fact-checking takes 70% of the total drafting time.",
      "Difficulty maintaining consistent technical tone across articles."
    ],
    "solution": "Designed a coordinated chain of specialized agents (Researcher, Critic, Writer, SEO) that handles the end-to-end workflow in under 15 minutes.",
    "architecture": [
      "Cyclic Agent Workflows via LangGraph",
      "Adversarial Critic-Researcher verification",
      "Semantic fact-checking logic",
      "Automated SEO and Markdown formatting",
      "Production-ready Python/LangChain stack"
    ],
    "keyInsight": "Adding an adversarial 'Critic' agent that specifically looked for hallucinations and logical leaps improved content quality to senior-engineer levels.",
    "challenges": [
      "Researcher and Critic agents would sometimes enter infinite loops of disagreement on technical nuances."
    ],
    "implementation": [
      {
        "phase": "Agent Chains",
        "details": "Used LangGraph to define a cyclic agent workflow with explicit state-passing and validation gates.",
        "code": "workflow = Graph()\nworkflow.add_node(\"research\", research_agent)\nworkflow.add_edge(\"research\", \"critic\")"
      }
    ],
    "techStack": [
      {
        "name": "Python 3.10",
        "category": "Language",
        "why": "Industry-standard for LLM and agentic framework integration."
      },
      {
        "name": "LangChain/Graph",
        "category": "Orchestration",
        "why": "Managing complex multi-step state and agent transitions."
      },
      {
        "name": "OpenAI/Anthropic",
        "category": "Reasoning",
        "why": "State-of-the-art LLMs for nuanced technical synthesis."
      }
    ],
    "metrics": [
      {
        "value": "92%",
        "label": "Time Reduction",
        "context": "Per technical article"
      },
      {
        "value": "1,200+",
        "label": "Articles Published",
        "context": "Zero manual hallucination errors"
      },
      {
        "value": "20m",
        "label": "End-to-End",
        "context": "Research to live publish"
      }
    ],
    "lessons": [
      "Agent autonomy is great, but explicit validation gates are mandatory for technical accuracy.",
      "Prompts should be version-controlled and tested just like code modules.",
      "Adversarial agent roles are the best way to handle LLM overconfidence."
    ],
    "personalNotes": "This project taught me the importance of 'process' in AI. It's not about the one-shot prompt; it's about the orchestrated chain of logic. Seeing it scale to 1000+ articles without a quality dip was the ultimate validation.",
    "manufacturingRelevance": "Can be adapted for automated generation of technical engineering manuals, QC reports, and maintenance documentation from raw machine logs."
  }
];
