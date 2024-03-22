import unittest
import requests_mock
from agents import DocumentRetrievalAgent

class TestDocumentRetrievalAgent(unittest.TestCase):
    @requests_mock.Mocker()
    def test_process_data(self, mock):
        # Setup mock response
        mock.get("https://example.com/document", text="Example Document Content")

        # Initialize your agent
        agent = DocumentRetrievalAgent("TestAgent")
        
        # Run the method you want to test
        result = agent.process_data(["https://example.com/document"])

        # Check the expected outcome
        self.assertIn("Example Document Content", result)

if __name__ == '__main__':
    unittest.main()