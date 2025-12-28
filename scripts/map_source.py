import os
import json
import argparse
import subprocess
import tempfile
import shutil

def analyze_file(file_path):
    """Heuristic analysis and snippet extraction."""
    ext = os.path.splitext(file_path)[1].lower()
    analysis = "Source module for core logic."
    snippet = ""
    
    if ext == '.py':
        analysis = "Python logic script. Orchestrates backend operations."
    elif ext in ['.js', '.jsx', '.ts', '.tsx']:
        analysis = "Reactive component. Handles state and interaction."
    elif ext == '.md':
        analysis = "Documentation. Architectural context."
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            # Extract snippet (first 15 lines of actual code)
            code_lines = [l for l in lines if l.strip() and not l.strip().startswith(('#', '//'))][:15]
            snippet = "".join(code_lines)
            
            for line in lines[:30]:
                if 'class ' in line:
                    name = line.split('class ')[1].split('(')[0].split(':')[0].strip()
                    analysis = f"Defines {name} class. Core architectural component."
                    break
                if 'def ' in line:
                    name = line.split('def ')[1].split('(')[0].strip()
                    analysis = f"Implements {name} functionality."
                    break
    except:
        pass
        
    return analysis, snippet

def generate_source_map(repo_path, project_id):
    source_map = {
        "nodes": [],
        "edges": []
    }

    # Root Node
    source_map["nodes"].append({
        "id": "root",
        "label": os.path.basename(repo_path),
        "type": "core",
        "detail": "Project Intelligence Center"
    })

    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__']]
        
        for f in files:
            if f.startswith('.') or f.endswith(('.png', '.jpg', '.ico', '.woff2')): continue
            
            file_path = os.path.join(root, f)
            rel_path = os.path.relpath(file_path, repo_path).replace('\\', '/')
            
            # Filter for important files to keep the visual dense but readable
            if rel_path.count('/') < 2 or f in ['server.py', 'main.py', 'App.js']:
                analysis, snippet = analyze_file(file_path)
                source_map["nodes"].append({
                    "id": rel_path,
                    "label": f,
                    "type": "file",
                    "detail": analysis,
                    "code": snippet,
                    "color": "#6366f1" if f.endswith('.py') else "#3b82f6"
                })
                source_map["edges"].append({"source": "root", "target": rel_path})

    return source_map

def clone_and_map(github_url, project_id):
    temp_dir = tempfile.mkdtemp()
    try:
        subprocess.run(["git", "clone", "--depth", "1", github_url, temp_dir], check=True)
        return generate_source_map(temp_dir, project_id)
    finally:
        shutil.rmtree(temp_dir)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("target")
    parser.add_argument("--id", required=True)
    args = parser.parse_args()

    if args.target.startswith("http"):
        result = clone_and_map(args.target, args.id)
    else:
        result = generate_source_map(args.target, args.id)
        
    print(json.dumps(result, indent=2))
