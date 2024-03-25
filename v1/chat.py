import os
import gradio as gr

# Make sure to import your RAG main function properly
from rag import main as rag_main

os.environ['GRADIO_ANALYTICS_ENABLED'] = 'False'

def stream_response(message, model_name, url_context=None):
    output = rag_main(url=[url_context], question=message)
    yield [[message, output]]

model_selection = gr.Dropdown(choices=["Claude Sonnet"], label="Choose a Model")
url_input = gr.Textbox(placeholder="Optional: Provide a URL for context", label="URL Context")
message_input = gr.Textbox(placeholder="Message Claude...", label="Your Question")

demo = gr.Interface(
    fn=stream_response,
    inputs=[message_input, model_selection, url_input],
    outputs=gr.Chatbot(height=800),
    title="GroundTruth RAG Chatbot",
    description="Ask a question with an optional URL context and get a response using the selected model.",
    theme="soft",
    examples=[
        ["What is functional programming?", "Claude Sonnet", ""],
        ["How would I write a function to make a gradio interface with this documentation?", "Claude Sonnet", "https://www.gradio.app/guides"]
    ],
    cache_examples=False,
    clear_btn="Clear",
)

if __name__ == "__main__":
    demo.launch()