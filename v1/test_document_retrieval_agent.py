from unittest.mock import patch
import unittest
import requests_mock
from agents import DocumentRetrievalAgent

class TestDocumentRetrievalAgent(unittest.TestCase):

    @requests_mock.Mocker()
    @patch('agents.pika.BlockingConnection')
    @patch('agents.pika.URLParameters')
    def test_fetch_document_retrieval(self, mock_url_parameters, mock_blocking_connection, m):
        m.get("https://python.langchain.com/docs", text="Super helpful for RAG")
        
        agent = DocumentRetrievalAgent("mock_url", "test_queue")
        doc1_content = agent.fetch_document("https://python.langchain.com/docs")

        self.assertEqual(doc1_content, "Super helpful for RAG")

if __name__ == '__main__':
    unittest.main()
