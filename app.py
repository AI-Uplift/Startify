import gradio as gr
from threading import Thread
from queue import SimpleQueue
import time

# Import your Obed03Engineer from the appropriate module.
from obed_0_03 import Obed03Engineer

# Initialize the Obed 0.3 engine and prepare its components.
obed_engineer = Obed03Engineer()
# You need to replace 'urls_to_index' with actual URLs that Obed 0.3 should learn from.
obed_engineer.initialize_vectorstore(['https://python.langchain.com/docs/expression_language/cookbook/retrieval', 'https://python.langchain.com/docs/modules/data_connection/', 'https://python.langchain.com/docs/integrations/text_embedding/together', 'https://python.langchain.com/docs/integrations/chat/anthropic', 'https://python.langchain.com/docs/integrations/chat/anthropic_functions'])

# Global queue for handling the streaming of responses.
q = SimpleQueue()

def generate_response_with_rag(message, model_selection):
    # Call the method on the Obed03Engineer instance
    response = obed_engineer.answer_question(message)  # This method should use the RAG logic.
    yield [[message, response]]

def handle_question_submission(question, model_selection):
    def thread_function():
        for token in generate_response_with_rag(question, model_selection):
            q.put(token)  # Use the global queue here.

    thread = Thread(target=thread_function)
    thread.start()
    while thread.is_alive() or not q.empty():
        yield q.get()  # Yield the next token for the chatbox # Yield the next token for the chatbox

with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column(scale=1):
            # The chatbot and model selection are in the same column
            chatbox = gr.Chatbot(label="Langchain Response", height=800)
            model_selection = gr.Dropdown(
                label="Select Model",
                choices=['Claude Sonnet', 'Claude Opus', 'Embedder Small', 'Embedder Large'],
                value='Claude Opus'
            )
            user_input = gr.Textbox(label="Enter your question", placeholder="Type here...")
            submit_button = gr.Button("Submit")
            
            # Linking the submit button to the handle_question_submission function
            submit_button.click(
                fn=handle_question_submission,
                inputs=[user_input, model_selection],
                outputs=chatbox
            )

    with gr.Column(scale=1):
            # Checkbox to toggle workspace visibility
            workspace_visibility = gr.Checkbox(label="Show Agent Workspace", value=True)
            with gr.Tabs():
                with gr.TabItem("Shell"):
                    shell_output = gr.Textbox(interactive=False, lines=10, label="Shell")
                with gr.TabItem("Browser"):
                    browser_output = gr.Textbox(interactive=False, lines=10, label="Browser")
                with gr.TabItem("Editor"):
                    editor_output = gr.Textbox(interactive=False, lines=10, label="Editor")
                with gr.TabItem("Planner"):
                    planner_output = gr.Textbox(interactive=False, lines=10, label="Planner")

            
        # Add a progress bar and controls
            with gr.Row():
                progress_bar = gr.Slider(minimum=0, maximum=100, label="Task Progress", value=0)
                # start_button = gr.Button("Start")
                # pause_button = gr.Button("Pause")
                # end_button = gr.Button("End")
                working_indicator = gr.Textbox(interactive=False, label="Agent Status", placeholder="Idle")



    # Run the demo
    demo.queue()  # Enable queuing for streaming
if __name__ == "__main__":
    demo.launch(debug=True, share=True)
