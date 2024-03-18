# obed_0_3.py

# Import necessary modules and functions from other files
from embeddings import documents_from_url, create_vectorstore, split_documents
from models import get_openai_embedder_large, get_claude_opus
from helpers import clean_docs
from rag import get_chain  # Assuming rag.py contains the function get_chain

class Obed03Engineer:
    def __init__(self):
        self.embedder = get_openai_embedder_large()
        self.llm = get_claude_opus()
        self.vectorstore = None
        self.retriever = None
        self.chain = None

    def initialize_vectorstore(self, urls):
        for url in urls:
            docs = documents_from_url(url)
            docs = clean_docs(docs)
            chunked_docs = split_documents(docs)
            if self.vectorstore is None:
                self.vectorstore = create_vectorstore(chunked_docs, self.embedder, "obed_0_3_collection")
            else:
                self.vectorstore.add_documents(chunked_docs)
        self.retriever = self.vectorstore.as_retriever()

    def answer_question(self, question):
        if not self.chain:
            self.chain = get_chain(self.retriever, self.llm)
        return self.chain.invoke(question)

# Example usage
if __name__ == "__main__":
    obed = Obed03Engineer()
    urls_to_index = [
        "https://www.gradio.app/guides/blocks-and-event-listeners"
        # Add more URLs that Obed should learn from
    ]
    obed.initialize_vectorstore(urls_to_index)
    print(obed.answer_question("How do I create a button in Gradio?"))
