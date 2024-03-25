# This file is for testing the use of the embedding and creates a local vectorstore

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader, TextLoader, NotebookLoader
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from chromadb.config import Settings
from os.path import exists

def reformat_url(url):
    if url.count('/blob/') != 1:
        raise ValueError("Use the raw link to the notebook file")
    # remove /blob from the url
    url = url.replace('/blob', '')
    # append raw to the url
    url = url.replace('github.com', 'raw.githubusercontent.com')
    return url

def load_local_notebook(url: str):
    assert url[-6:] == ".ipynb", "Make sure the link is a valid notebook"
    import requests
    # URL to the raw text of the .ipynb file
    if not url.startswith("https://raw.github"):
        url = reformat_url(url)
    assert url.startswith("https://raw.githubuser")
    # Download the notebook as a file
    response = requests.get(url)
    local_file = "temp.ipynb"
    with open(local_file, 'wb') as f:
        f.write(response.content)
    loader = NotebookLoader(
        local_file,
        include_outputs=True,
        max_output_length=20,
        remove_newline=True,
    )
    return loader

def documents_from_url(url: str) -> list[Document]:
    """
    Load documents from a URL, return List[Document]
    """
    assert True, "Make sure the link is valid"
    print("Indexing url:", url)
    if url[-6:] == ".ipynb":
        loader = load_local_notebook(url)
    else:
        loader = WebBaseLoader(url)
    docs = loader.load()
    if not docs:
        raise ValueError(f"No documents found at {url}")
    return docs

def documents_from_text_file(filepath: str = "sample.txt") -> list[Document]:
    """
    Load documents from a string, return List[Document]
    """
    loader = TextLoader(filepath)
    docs = loader.load()
    return docs

def split_documents(docs: list[Document], chunk_size=4000, chunk_overlap=200) -> list[Document]:
    """
    Split documents into chunks, return List[Document]
    """
    chunked_docs = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap
    ).split_documents(docs)
    return chunked_docs

def create_vectorstore(docs: list[Document], embedder, collection_name = "test_collection") -> None:
    """
    Create a vectorstore from documents
    """
    is_local = False
    if exists(collection_name):
        print("Note: Collection seems to already exist! Not adding documents to the collection.")
        is_local = True
    vectorstore = Chroma(
        collection_name=collection_name, 
        embedding_function=embedder,
        persist_directory=collection_name,
        client_settings= Settings(anonymized_telemetry=False, is_persistent=True),
    )
    if not is_local:
        vectorstore.add_documents(docs)
    return vectorstore

def main():
    from models import get_openai_embedder
    embedder = get_openai_embedder()
    url = "https://python.langchain.com/docs/expression_language/cookbook/retrieval"
    docs = documents_from_url(url)
    chunked_docs = split_documents(docs)
    vectorstore = create_vectorstore(chunked_docs, embedder)
    output = vectorstore.similarity_search("How would I use memory in a function?", k=1)
    print(output)
    return output