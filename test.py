# This file is for testing

TEST_URL = "https://github.com/langchain-ai/langgraph/blob/main/examples/code_assistant/langgraph_code_assistant.ipynb"
TEST_COLLECTION_NAME = "langgraph_notebook_collection"
TEST_RETRIEVAL_QUESTION = "How would I create an evaluator for my LangGraph implementation?"

# Check if the models successfully load
def test_models():
    from models import get_openai_embedder_small, get_claude_sonnet
    embedder = get_openai_embedder_small()
    llm = get_claude_sonnet()
    assert embedder is not None and llm is not None
    print("Models loaded successfully!")

def test_embeddings(url = TEST_URL, collection_name = TEST_COLLECTION_NAME, question = TEST_RETRIEVAL_QUESTION):
    from embeddings import documents_from_url, split_documents, create_vectorstore
    from models import get_openai_embedder_large
    embedder = get_openai_embedder_large()
    docs = documents_from_url(url)
    chunked_docs = split_documents(docs)
    vectorstore = create_vectorstore(chunked_docs, embedder, collection_name)
    output = vectorstore.similarity_search(question, k=2)
    print(str(output)[:500] + '[...]')
    assert output is not None
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

def main():
    test_rag()

if __name__ == "__main__":
    main()