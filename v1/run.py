import os
os.environ['GRADIO_ANALYTICS_ENABLED'] = 'False'
import gradio as gr

from chains import get_chain
from models import get_claude_sonnet

def INITIALIZE_CHAIN(llm):
    retriever = None
    chain = get_chain(llm, retriever)
    return chain

INITIAL_LLM = get_claude_sonnet()
INITIAL_CHAIN = INITIALIZE_CHAIN(INITIAL_LLM)

def stream_response(message, history):
    chain = INITIAL_CHAIN # This should be passed to this function instead
    partial_message = ""
    chat_history_string = ""
    for human, ai in history:
        chat_history_string += f"Human: {human}\nAI: {ai}\n"

    if message is not None:
        chat_history_string += f"Human: {message}\n"
        partial_message = ""
        for response in chain.stream(chat_history_string):
            partial_message += response.content
            yield partial_message

demo = gr.ChatInterface(
    stream_response,
    chatbot=gr.Chatbot(height=800),
    textbox=gr.Textbox(placeholder="Message Claude...", container=False, scale=7),
    title="GroundTruth RAG Chatbot",
    description="Ask a question with an optional url context and get a response.",
    theme="soft",
    examples=["What is functional programming?", "How would I write a function to make a gradio interface with this documentation <url>?"],
    cache_examples=False,
    retry_btn=None,
    undo_btn="Delete Previous",
    clear_btn="Clear",
    # additional_inputs= # Here we should add the model selection value from the dropdown
    # Does the retriever go there too?
)

demo.launch()
