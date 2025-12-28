"""
blogpush: One-command GitHub project to portfolio deployment.

Usage:
    python blogpush.py <github-url>

Workflow:
    1. Clone repo to temp dir
    2. Generate technical dossier using Kimi
    3. Inject into chaining-dev/data/projects.js
    4. Cleanup
"""

import os
import sys
import subprocess
import shutil
import tempfile
from pathlib import Path

def run_cmd(cmd, cwd=None):
    """Run a shell command and print its output if it fails."""
    try:
        subprocess.run(cmd, check=True, cwd=cwd)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {' '.join(cmd)}")
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Usage: python blogpush.py <github-url>")
        sys.exit(1)

    github_url = sys.argv[1]
    blog_root = Path(__file__).parent.parent.resolve()
    scripts_dir = blog_root / "scripts"
    
    # Create temp directory
    temp_dir = tempfile.mkdtemp(prefix="blogpush_")
    print(f"--> Cloning {github_url} into temp space...")
    
    try:
        # Clone
        run_cmd(["git", "clone", github_url, temp_dir])
        
        # Generate JSON
        project_json = blog_root / "temp_project.json"
        print("--> Analyzing repo and generating dossier using Kimi...")
        
        # We need to run the generation script from within the temp repo
        # Use absolute path to the generation script
        gen_script = scripts_dir / "generate_project_data.py"
        
        with open(project_json, "w", encoding="utf-8") as f:
            subprocess.run([sys.executable, str(gen_script)], 
                           cwd=temp_dir, 
                           stdout=f, 
                           check=True)
        
        # Inject JSON
        print("--> Injecting project into portfolio data...")
        add_script = scripts_dir / "add_project.js"
        run_cmd(["node", str(add_script), str(project_json)], cwd=blog_root)
        
        # Cleanup JSON
        if project_json.exists():
            os.remove(project_json)
            
        print("\nSUCCESS: Project is now live in your portfolio data.")
        print(f"Refresh your site to view the updated dossier.")

    finally:
        # Cleanup temp dir
        print("--> Cleaning up temp files...")
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == "__main__":
    main()

