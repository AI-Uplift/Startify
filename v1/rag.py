# This file is for running a retrieval augmented generation on an existing vector db
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.documents import Document
from operator import itemgetter
from helpers import clean_docs

# These are the urls that get ingested as documents. Should be a list of strings.
DEFAULT_URLS = [
    "https://www.gradio.app/guides/blocks-and-event-listeners",
]
# This is what you want to name the collection of documents (it will create a folder in the repo with this name)
DEFAULT_COLLECTION_NAME = "gradio_blocks_listeners_collection"
# This is the question you want to ask (retriever will choose chunks of the documents as context to answer the question)
DEFAULT_QUESTION = "How would I implement gradio components that would allow a button that says 'Add sources' and allow the user to paste urls into a text box so they get saved as sources?"

def format_docs(docs: list[Document]) -> str:
    """
    Formats the list of documents into a single string.
    Used to format the docs into a string for context that is passed to the LLM.
    """
    return "\n\n".join(doc.page_content for doc in docs)

def get_rag_template():
    """
    Fetches the RAG template for the prompt.
    This template expects to be passed values for both context and question.
    """
    template = """Answer the question based only on the following context:
    {context}

    Question: {question}
    """
    rag_prompt_template = ChatPromptTemplate.from_template(template)
    rag_prompt_template.messages.insert(0, 
        SystemMessage(
            content="You are an AI programming assistant. Use the document excerpts to respond to the best of your ability."
        )
    )
    return rag_prompt_template

def get_chain(retriever, llm, memory: ConversationBufferMemory | None = None):
    """
    Input: retriever (contains vectorstore with documents) and llm
    Returns a chain for the RAG pipeline.
    Can be invoked with a question, like `chain.invoke("How do I do x task using this framework?")` to get a response.
    """
    # Get prompt template
    rag_prompt_template = get_rag_template()
    # Set memory
    if memory is None:
        memory = ConversationBufferMemory(
        return_messages=True, input_key="question", output_key="answer"
    )
    # Load memory
    # This adds a "memory" key to the input object
    loaded_memory = RunnablePassthrough.assign(
        chat_history=RunnableLambda(memory.load_memory_variables) | itemgetter("history"),
    )
    chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | loaded_memory
        | rag_prompt_template
        | llm
        | StrOutputParser()
    )
    return chain

def main(url: str | list[str] = DEFAULT_URLS, collection_name: str = DEFAULT_COLLECTION_NAME, question: str = DEFAULT_QUESTION):
    import embeddings
    # from models import get_openai_embedder_small, get_claude_sonnet
    from models import get_openai_embedder_large, get_claude_opus
    embedder = get_openai_embedder_large()
    llm = get_claude_opus()
    if isinstance(url, str):
        url = [url]
    vectorstore = None
    for i in range(len(url)):
        docs = embeddings.documents_from_url(url[i])
        docs = clean_docs(docs)
        chunked_docs = embeddings.split_documents(docs)
        if i == 0:
            vectorstore = embeddings.create_vectorstore(chunked_docs, embedder, collection_name)
        else:
            assert vectorstore is not None, "Vectorstore not initialized"
            vectorstore.add_documents(chunked_docs)
    retriever = vectorstore.as_retriever()
    # Can add optional arguments like search_kwargs={"score_threshold": 0.5}
    chain = get_chain(retriever, llm)
    output = chain.invoke(question)
    return output

if __name__ == "__main__":
    main()