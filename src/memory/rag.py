"""
Vector Search for Code Docs + Docs Loading
"""

from typing import List, Tuple
from .knowledge_base import KnowledgeBase
from sentence_transformers import SentenceTransformer, util
import numpy as np
import torch

class RAG:
    def __init__(self):
        self.knowledge_base = KnowledgeBase()
        self.model = SentenceTransformer('all-MiniLM-L6-v2')  # Example model

    def embed_and_index_knowledge(self):
        # Retrieve all knowledge entries from the database
        all_knowledge = self.knowledge_base.get_all_knowledge()
        # Create embeddings for all entries
        embeddings = self.model.encode([entry.contents for entry in all_knowledge], convert_to_tensor=True)
        # Save embeddings back to the knowledge base or a separate index, depending on your setup
        self.knowledge_base.save_embeddings({entry.tag: embedding for entry, embedding in zip(all_knowledge, embeddings)})

    def search_knowledge(self, query: str) -> List[Tuple[str, float]]:
        # Encode the query to get its embedding
        query_embedding = self.model.encode(query, convert_to_tensor=True)
        
        # Retrieve all embeddings from the knowledge base or index
        # Assuming get_all_embeddings now returns a dict with ID as key and embedding as value
        embeddings_dict = self.knowledge_base.get_all_embeddings()
         # Check if embeddings_dict is not empty
        if not embeddings_dict:
            print("No embeddings found in the knowledge base.")
            return []
        
        # Convert embeddings to tensors and stack
        embeddings_list = []
        for embedding in embeddings_dict.values():
            # Assuming embeddings are stored as lists of floats; adjust as needed
            tensor = torch.tensor(embedding, dtype=torch.float32)
            embeddings_list.append(tensor)
        
        # Proceed only if embeddings_list is not empty
        if not embeddings_list:
            print("No valid embeddings to process.")
            return []

        
        # Prepare embeddings for cosine similarity calculation
        # Convert embeddings into tensors and stack into a single tensor
        all_embeddings_tensor = torch.stack(embeddings_list)
        
        # Compute cosine similarities between query embedding and all knowledge base embeddings
        cosine_scores = util.pytorch_cos_sim(query_embedding, all_embeddings_tensor)[0]

        # Convert cosine scores to numpy array for easier manipulation
        cosine_scores_np = cosine_scores.cpu().numpy()

        # Retrieve the indices of the top 5 scores
        top_indices = np.argsort(-cosine_scores_np)[:5]

        # Extract the tags (IDs) for the top results (assuming keys of embeddings_dict are the IDs/tags)
        top_tags = list(embeddings_dict.keys())[top_indices]

        # Extract the tags and scores for the top results
        search_results = [(tag, float(cosine_scores_np[idx])) for idx, tag in enumerate(top_tags)]
        
        return search_results

    def augment_generation(self, prompt: str, top_k: int = 5) -> str:
        # Search for the top K relevant knowledge entries
        relevant_knowledge = self.search_knowledge(prompt)[:top_k]

        # Combine the contents of the top K entries to augment the prompt
        augmented_prompt = prompt + " " + " ".join([entry[0] for entry in relevant_knowledge])
        
        # Use the augmented prompt for further text generation or return it
        # In a full implementation, you would call your language model here
        return augmented_prompt

    # Implement additional methods as needed for RAG functionalities

# The following would be used to initialize and use the RAG component in your main application
if __name__ == "__main__":
    rag = RAG()
    rag.embed_and_index_knowledge()  # Call this once initially and periodically to update your index

    # Example usage
    user_query = "How do I implement a blockchain transaction?"
    print("Augmented Prompt: ", rag.augment_generation(user_query))
