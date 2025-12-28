// data/ideas.js
// Future projects and ideas

export const ideas = [
  {
    id: "deepseek-ocr-integration",
    title: "DeepSeek-OCR Document Processing",
    description: "Build document automation system using DeepSeek-OCR's vision-token compression for processing technical manuals, quality reports, and specifications at 90% lower cost than traditional OCR.",
    motivation: "Perfect for ABT's proof package generation - can process hundreds of pages of validation data, quality records, and traceability documentation efficiently.",
    techStack: ["Python", "DeepSeek-OCR", "Document Processing", "RAG"],
    status: "Researching",
    timeframe: "Q1 2026"
  },
  
  {
    id: "manufacturing-quality-ai",
    title: "AI Quality Control System",
    description: "Build vision-based defect detection system for manufacturing using computer vision and anomaly detection. Real-time analysis of production output with automated NCR triage and root cause analysis.",
    motivation: "Directly applicable to ABT's quality automation needs - automated FAI checks, SPC monitoring, and supplier performance analysis.",
    techStack: ["Python", "Computer Vision", "Anomaly Detection", "Real-time Processing"],
    status: "Planning",
    timeframe: "Q2 2026"
  },
  
  {
    id: "erp-ai-assistant",
    title: "ERP Integration AI Assistant",
    description: "Build AI assistant that connects to IFS Cloud (or other ERPs) to automate data retrieval, generate insights, and assist with reporting workflows. Natural language interface for querying production data, inventory, and quality metrics.",
    motivation: "Enable non-technical teams to extract insights from ERP systems without SQL knowledge or complex reporting tools.",
    techStack: ["Python", "MCP", "ERP APIs", "Natural Language Processing"],
    status: "Conceptual",
    timeframe: "Q2 2026"
  },
  
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance Models",
    description: "Time-series analysis and ML models for predicting equipment failures before they occur. Analyze sensor data, maintenance logs, and production metrics to optimize maintenance scheduling.",
    motivation: "Reduce unplanned downtime in manufacturing by predicting failures before they impact production.",
    techStack: ["Python", "Time-series Analysis", "ML Models", "IoT Integration"],
    status: "Researching",
    timeframe: "Q3 2026"
  }
];

// Get ideas by status
export function getIdeasByStatus(status) {
  return ideas.filter(idea => idea.status === status);
}

// Get all ideas as context for chat
export function getAllIdeasAsContext() {
  return ideas.map(i => ({
    title: i.title,
    description: i.description,
    motivation: i.motivation,
    status: i.status
  }));
}
