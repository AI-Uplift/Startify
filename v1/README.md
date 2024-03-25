---
title: grounded-code
app_file: app.py
sdk: gradio
sdk_version: 4.21.0
---
# grounded-code
Using up-to-date web documentation as context for highest quality code generation

Getting started:
1. Clone the repository
2. Navigate to the repository folder
3. Create a virtual environment (I'm using Python3.11.7)
4. Enter the virtual environment and install the dependencies
5. Run test.py to see if the environment is set up correctly
```bash
git clone https://github.com/TanGentleman/grounded-code
cd grounded-code
python -m venv .venv
source .venv/bin/activate 
or source .venv/Scripts/activate for windows
pip install -r requirements.txt --upgrade
```

Afterwards, add the following environment variables to a .env file in the root directory. You can use .example-env as a template.