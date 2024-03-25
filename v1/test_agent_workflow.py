import unittest
from unittest.mock import patch, MagicMock
import requests_mock
from agents import DocumentRetrievalAgent, DocumentProcessingAgent

class TestAgentWorkflow(unittest.TestCase):
    @requests_mock.Mocker()
    def test_document_workflow(self, m):
        m.get("https://python.langchain.com/docs/get_started/introduction", text="Document 1 content")
        m.get("https://docs.cartesi.io/cartesi-rollups/", text="Document 2 content")

        with patch('pika.BlockingConnection') as mock_connection, \
             patch('pika.URLParameters') as mock_url_params:
            mock_channel = MagicMock()
            mock_connection.return_value = MagicMock(channel=MagicMock(return_value=mock_channel))
            mock_url_params.return_value = MagicMock()

            retrieval_agent = DocumentRetrievalAgent(rabbitmq_url="mock_url", queue_name="test_queue")
            processing_agent = DocumentProcessingAgent("ProcessingAgent")

            documents = retrieval_agent.process_data(["https://docs.cartesi.io/cartesi-rollups/", "https://python.langchain.com/docs/get_started/introduction"])
            processed_docs = processing_agent.process_data(documents)

            self.assertTrue(len(processed_docs) > 0)

if __name__ == '__main__':
    unittest.main()
