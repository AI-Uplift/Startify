import gradio as gr
from threading import Thread
from queue import SimpleQueue

# Placeholder function for generating responses
# Replace this with your actual function that uses LangChain ConversationalRetrievalChain
def generate_response_with_rag(message, model_selection):
    # Here, we would have logic that integrates with the selected model
    # For demonstration purposes, we simulate a delayed streaming response
    responses = {
        "Claude Sonnet": "Responding with Claude Sonnet...",
        "Claude Opus": "Responding with Claude Opus...",
        "Embedder Small": "Responding with Embedder Small...",
        "Embedder Large": "Responding with Embedder Large...",
    }
    bot_message = responses.get(model_selection, "No response for the selected model.")
    for character in bot_message:
        time.sleep(0.1)
        yield character

# Initializes a simple queue for streaming output
q = SimpleQueue()

# Function to be called when the user submits a question
def handle_question_submission(question, model_selection):
    # This thread will handle the response generation to prevent blocking the main thread
    thread = Thread(target=generate_response_with_rag, args=(question, model_selection))
    thread.start()
    while thread.is_alive():
        next_token = q.get(block=True)
        yield next_token

with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column(scale=1):
            # The chatbot and model selection are in the same column
            chatbox = gr.Chatbot(label="Langchain Response", height=300)
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
demo.launch(debug=True, share=True)
