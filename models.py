# This file is to fetch a model using the various APIs
from dotenv import load_dotenv
from os import getenv
load_dotenv()
OPENAI_API_KEY = getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = getenv("ANTHROPIC_API_KEY")
def check_api_keys():
    assert OPENAI_API_KEY is not None and ANTHROPIC_API_KEY is not None, "API keys not found"
check_api_keys()

from langchain_openai import OpenAIEmbeddings
from langchain_anthropic import ChatAnthropic
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

def get_claude_sonnet():
    return ChatAnthropic(
        model_name="claude-3-sonnet-20240229",
        anthropic_api_key=ANTHROPIC_API_KEY, 
        temperature=0, 
        streaming=True,
        callback_manager=CallbackManager([StreamingStdOutCallbackHandler()])
    )

def get_claude_opus():
    return ChatAnthropic(
        model_name="claude-3-opus-20240229",
        anthropic_api_key=ANTHROPIC_API_KEY, 
        temperature=0, 
        streaming=True,
        callback_manager=CallbackManager([StreamingStdOutCallbackHandler()])
    )

def get_openai_embedder_small():
    return OpenAIEmbeddings(
        model="text-embedding-3-small",
        api_key=OPENAI_API_KEY
    )

def get_openai_embedder_large():
    return OpenAIEmbeddings(
        model="text-embedding-3-large",
        api_key=OPENAI_API_KEY
    )
