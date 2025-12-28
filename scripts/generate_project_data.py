#!/usr/bin/env python3
"""
Generate high-fidelity project metadata by analyzing the entire codebase.
Uses GLM-4-Long (1M context) via Chutes AI to build a deep technical dossier.
"""

import os
import json
import requests
import subprocess
from pathlib import Path
import sys

def get_repo_context():
    """Converts the entire relevant codebase into a single text block."""
    context = []
    exclude_dirs = {'.git', 'node_modules', '__pycache__', 'dist', 'build', '.next', '.venv', 'venv'}
    exclude_files = {'.DS_Store', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'}
    allowed_extensions = {'.py', '.js', '.jsx', '.ts', '.tsx', '.go', '.rs', '.json', '.yaml', '.yml', '.md', '.txt', '.toml', '.css', '.html'}

    root_dir = Path.cwd()
    
    for path in root_dir.rglob('*'):
        if any(part in exclude_dirs for part in path.parts):
            continue
        if path.is_file():
            if path.name in exclude_files or path.suffix not in allowed_extensions:
                continue
            
            try:
                # Add file header
                context.append(f"\n--- FILE: {path.relative_to(root_dir)} ---")
                # Read content
                content = path.read_text(encoding='utf-8', errors='ignore')
                context.append(content)
            except Exception as e:
                print(f"Error reading {path}: {e}", file=sys.stderr)

    return "\n".join(context)

def get_repo_url():
    """Extract GitHub repo URL from git remote or environment."""
    repo_url = os.getenv('GITHUB_REPOSITORY_URL')
    if not repo_url:
        try:
            remote = subprocess.check_output(['git', 'remote', 'get-url', 'origin'], text=True).strip()
            if remote.startswith('git@github.com:'):
                repo_url = remote.replace('git@github.com:', 'https://github.com/').removesuffix('.git')
            else:
                repo_url = remote.removesuffix('.git')
        except:
            repo_url = f"https://github.com/unknown/{Path.cwd().name}"
    return repo_url

def generate_metadata(repo_context: str, repo_url: str):
    """Send entire repo to GLM and get structured metadata back."""
    
    api_key = os.getenv('CHUTES_API_KEY')
    if not api_key:
        # Try local chutesapi.txt
        paths_to_check = [
            Path('chutesapi.txt'),
            Path('../chutesapi.txt'),
            Path.home() / 'chutesapi.txt',
            Path('C:/Users/explo/Documents/1aMachineLearning/Python/blxg/chutesapi.txt')
        ]
        for p in paths_to_check:
            if p.exists():
                api_key = p.read_text().strip()
                break
    
    if not api_key:
        print("Error: CHUTES_API_KEY not set and chutesapi.txt not found", file=sys.stderr)
        sys.exit(1)
    
    prompt = f"""You are analyzing a GitHub repository to generate technical portfolio metadata.

FULL REPOSITORY CONTENTS:
{repo_context}

Repository URL: {repo_url}

Generate a detailed technical dossier in JSON format. Analyze the ENTIRE codebase to extract:

{{
  "title": "Concise project name (2-4 words)",
  "tagline": "One punchy sentence - what does this do?",
  "category": "ai | blockchain | automation | security | enterprise | robotics",
  "status": "Production | Experimental | Archived | Live",
  
  "problem": "2-3 paragraphs: What technical/strategic problem does this solve? Be specific about the gap in existing solutions.",
  
  "solution": "2-3 paragraphs: How does this code solve it? Describe the architecture, key algorithms, and design decisions. Reference specific files/functions you see in the code.",
  
  "challenges": [
    "Specific technical challenge 1 (reference actual code patterns)",
    "Challenge 2 with context from the implementation",
    "Challenge 3"
  ],
  
  "stats": [
    {{"label": "System Modules", "value": "count"}},
    {{"label": "Complexity", "value": "high/med/low"}},
    {{"label": "Core Logic Files", "value": "number"}}
  ],
  
  "metrics": [
    {{
      "label": "Engineering Metric",
      "value": "quantified value",
      "context": "Why this matters in the code architecture"
    }}
  ],
  
  "lessons": [
    "Architectural insight learned from the code",
    "Implementation pattern used effectively",
    "Interesting finding in the build"
  ],
  
  "personalNotes": "2-3 sentences reflecting on the build as the lead engineer. What was surprising? What was the hardest part?",
  
  "techStack": [
    {{
      "name": "Technology name",
      "why": "Specific reason this tech was chosen based on its usage in the code (cite files)"
    }}
  ],

  "aiContext": "A hyper-detailed technical specification of the entire codebase designed for AI retrieval. Must include: 1) Detailed Module-by-Module Build Order, 2) Data Flow Diagrams (in text form) showing how critical paths interact, 3) Signature map for all key classes and functions, 4) Internal Logic nuances that aren't visible in the UI summaries, and 5) Specific file references for core logic. This is the technical source of truth for an AI analyst.",

  "futureWork": ["Specific improvement 1", "Enhancement 2"]
}}

Rules:
- Use the FULL codebase provided. Reference specific files, functions, and patterns.
- Be SPECIFIC and TECHNICAL. Quote actual variable names or function signatures.
- For techStack "why": explain the role in THIS project, citing specific implementation details.
- The 'aiContext' field must be a master-level technical brief of the entire system flow.
- Return ONLY valid JSON, no markdown blocks, no explanation.
"""

    try:
        response = requests.post(
            'https://llm.chutes.ai/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16',
                'messages': [{'role': 'user', 'content': prompt}],
                'temperature': 0.6,
                'max_tokens': 4000
            },
            timeout=180
        )
        
        response.raise_for_status()
        content = response.json()['choices'][0]['message']['content'].strip()
        
        # Strip markdown if present
        if content.startswith('```'):
            lines = content.split('\n')
            content = '\n'.join(lines[1:-1])
        
        data = json.loads(content)
        
        # Add metadata
        data['id'] = repo_url.split('/')[-1].lower()
        data['repoUrl'] = repo_url
        data['createdAt'] = subprocess.run(
            ['git', 'log', '-1', '--format=%aI'],
            capture_output=True,
            text=True
        ).stdout.strip()
        
        data['sourceMap'] = []  # Manual curation
        data['manufacturingRelevance'] = None
        
        return data
        
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

def main():
    print("--> Building repository context (full code analysis)...", file=sys.stderr)
    repo_context = get_repo_context()
    repo_url = get_repo_url()
    
    context_size = len(repo_context)
    print(f"--> Context size: {context_size:,} characters", file=sys.stderr)
    
    print(f"--> Sending to GLM-4-Long for technical synthesis...", file=sys.stderr)
    metadata = generate_metadata(repo_context, repo_url)
    
    print(json.dumps(metadata, indent=2))

if __name__ == '__main__':
    main()
