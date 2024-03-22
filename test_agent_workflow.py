import unittest
import requests_mock
from agents import DocumentRetrievalAgent, DocumentProcessingAgent

class TestAgentWorkflow(unittest.TestCase):
    @requests_mock.Mocker()
    def test_document_workflow(self, m):
        # Mock the HTTP requests to return a predefined response
        m.get("https://example.com/doc1", text="Document 1 content")
        m.get("https://example.com/doc2", text="Document 2 content")

        retrieval_agent = DocumentRetrievalAgent("RetrievalAgent")
        processing_agent = DocumentProcessingAgent("ProcessingAgent")

        # Use the actual URLs you've mocked
        documents = retrieval_agent.process_data(["https://example.com/doc1", "https://example.com/doc2"])
        processed_docs = processing_agent.process_data(documents)

        # Your assertions go here
        self.assertTrue(len(processed_docs) > 0)

if __name__ == '__main__':
    unittest.main()
