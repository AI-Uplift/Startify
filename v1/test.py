# This file is for testing
import pytest

TEST_URL = "https://github.com/langchain-ai/langgraph/blob/main/examples/code_assistant/langgraph_code_assistant.ipynb"
TEST_COLLECTION_NAME = "langgraph_notebook_collection"
TEST_RETRIEVAL_QUESTION = "How would I create an evaluator for my LangGraph implementation?"

@pytest.fixture
def embedder_and_llm():
    from models import get_openai_embedder_small, get_claude_sonnet
    return get_openai_embedder_small(), get_claude_sonnet()

# Check if the models successfully load
def test_models(embedder_and_llm):
    embedder, llm = embedder_and_llm
    assert embedder is not None, "Embedder is None"
    assert llm is not None, "LLM is None"
    # Add more specific assertions here as needed
    print("Models loaded successfully!")

@pytest.mark.parametrize("url,collection_name,question", [
    ("https://example.com", "test_collection", "Example question?"),
])

def test_embeddings(url, collection_name, question):
    from embeddings import documents_from_url, split_documents, create_vectorstore
    from models import get_openai_embedder_large
    embedder = get_openai_embedder_large()
    docs = documents_from_url(url)
    assert isinstance(docs, list), "Docs should be a list"
    assert len(docs) > 0, "Docs list is empty"

    chunked_docs = split_documents(docs)
    assert len(chunked_docs) > 0, "No documents were chunked"

    vectorstore = create_vectorstore(chunked_docs, embedder, collection_name)
    output = vectorstore.similarity_search(question, k=2)
    assert output is not None, "Output is None"
    print("Embeddings test passed!")

def test_rag(url = TEST_URL, collection_name = TEST_COLLECTION_NAME, question = TEST_RETRIEVAL_QUESTION):
    import embeddings
    # from models import get_openai_embedder_small, get_claude_sonnet
    from models import get_openai_embedder_large, get_claude_opus
    from helpers import clean_docs
    from rag import get_chain
    embedder = get_openai_embedder_large()
    llm = get_claude_opus()
    docs = embeddings.documents_from_url(url)
    docs = clean_docs(docs)
    chunked_docs = embeddings.split_documents(docs)
    vectorstore = embeddings.create_vectorstore(chunked_docs, embedder, collection_name)
    retriever = vectorstore.as_retriever()
    # Can add optional arguments like search_kwargs={"score_threshold": 0.5}
    chain = get_chain(retriever, llm)
    output = chain.invoke(question)
    return output

def test_embeddings(url, collection_name, question):
    from embeddings import documents_from_url, split_documents, create_vectorstore
    from models import get_openai_embedder_large
    embedder = get_openai_embedder_large()
    docs = documents_from_url(url)
    assert isinstance(docs, list), "Docs should be a list"
    assert len(docs) > 0, "Docs list is empty"

    chunked_docs = split_documents(docs)
    assert len(chunked_docs) > 0, "No documents were chunked"

    vectorstore = create_vectorstore(chunked_docs, embedder, collection_name)
    output = vectorstore.similarity_search(question, k=2)
    assert output is not None, "Output is None"
    print("Embeddings test passed!")


# Assuming you have modified DocumentRetrievalAgent's __init__ to match this structure
def test_process_data(mock):
    # Setup mock response
    mock.get("https://example.com/document", text="Example Document Content")
    
    # Using dummy values for rabbitmq_url and queue_name
    agent = DocumentRetrievalAgent(rabbitmq_url="mock_url", queue_name="test_queue")
    result = agent.process_data(["https://example.com/document"])
    assert "Example Document Content" in result

def main():
    test_rag()

if __name__ == "__main__":
    main()