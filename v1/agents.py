import os
from dotenv import load_dotenv
import pika
import json
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# from .utils import requests_retry_session 
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer
import logging
logger = logging.getLogger(__name__)  # Configure logger at the module level

# Load environment variables from the .env file
load_dotenv()
# Retrieve the RabbitMQ URL from environment variables
rabbitmq_url = os.getenv('RABBITMQ_URL')

class BaseAgent:
    def __init__(self, name):
        self.name = name

    def communicate(self, message):
        print(f"{self.name} is sending a message: {message}")

    def process_data(self, data):
        raise NotImplementedError("Each agent must implement its own data processing method.")

def requests_retry_session(retries=3, backoff_factor=0.3, status_forcelist=(500, 502, 504), session=None):
    session = session or requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session
class DocumentRetrievalAgent(BaseAgent):
    def __init__(self, rabbitmq_url, queue_name):
        super().__init__("DocumentRetrievalAgent")
        self.queue_name = queue_name
        # Setup connection using CloudAMQP URL
        self.connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue_name)

    def start_consuming(self):
        self.channel.basic_consume(queue=self.queue_name, on_message_callback=self.on_request, auto_ack=True)
        print(" [x] Awaiting RPC requests")
        self.channel.start_consuming()

    def on_request(self, ch, method, props, body):
        request_data = json.loads(body)
        print(f"Received request: {request_data}")
        # Process request (simplified example)
        response = self.process_data(request_data['urls'])

        # Publishing response back to the callback queue
        self.channel.basic_publish(exchange='', routing_key=props.reply_to,
                                   properties=pika.BasicProperties(correlation_id=props.correlation_id),
                                   body=json.dumps(response))
        print("Sent response")

    def fetch_document(self, url):
        session = requests_retry_session()  # Initialize the retry session
        response = session.get(url)  # Use the session to make the request
        if response.status_code == 200:
            return response.text  # Return the document content
        else:
            logger.error(f"Failed to fetch document from {url}, status code: {response.status_code}")
            return "This document could not be retrieved."

    def process_data(self, urls):
        documents = []
        for url in urls:
            content = self.fetch_document(url)
            if content:
                documents.append(content)
            else:
                # Log error or handle the case where the document couldn't be fetched
                print(f"Failed to retrieve document from {url}")
        return documents
class VectorStoreAgent(BaseAgent):
    def __init__(self, name, embedder_model='all-MiniLM-L6-v2'):
        super().__init__(name)
        self.embedder = SentenceTransformer(embedder_model)
        self.vectorstore = {}  # Simplified as a dictionary for demonstration

    def process_data(self, documents):
        for doc in documents:
            # Generate embeddings for each document
            embedding = self.embedder.encode(doc, convert_to_tensor=True)
            # Store embeddings (consider using a more suitable storage solution)
            self.vectorstore[doc] = embedding

class DocumentProcessingAgent(BaseAgent):
    def process_data(self, documents):
        processed_docs = []
        for doc in documents:
            # Example cleaning step: removing excessive whitespaces
            clean_doc = ' '.join(doc.split())
            # Placeholder for splitting documents into chunks
            chunks = self.chunk_document(clean_doc)
            processed_docs.extend(chunks)
        return processed_docs
    
    def chunk_document(self, document, chunk_size=500):
        # Simple logic to chunk documents based on a fixed size
        return [document[i:i+chunk_size] for i in range(0, len(document), chunk_size)]


class QueryAnsweringAgent(BaseAgent):
    def __init__(self, name, vector_store, llm_model):
        super().__init__(name)
        self.vector_store = vector_store  # Assume this is an initialized vector store agent
        self.llm_model = llm_model  # This could be a language model like GPT-3
    
    def process_data(self, question):
        # Retrieve relevant document embeddings based on the question
        relevant_docs = self.retrieve_docs(question)
        # Generate an answer based on the relevant documents and the question
        answer = self.generate_answer(relevant_docs, question)
        return answer
    
    def retrieve_docs(self, question):
        # Placeholder for retrieving documents based on similarity to the question
        # Implement your retrieval logic here
        return ["Relevant document 1", "Relevant document 2"]
    
    def generate_answer(self, docs, question):
        # Placeholder for generating an answer using the language model
        # Combine the information from the documents with the question to generate an answer
        return "Generated answer based on the relevant documents."

