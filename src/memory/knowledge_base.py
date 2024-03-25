from typing import List, Dict, Optional
from sqlmodel import Field, Session, SQLModel, create_engine
from src.config import Config
import numpy as np
import json

"""
TODO: The tag check should be a BM25 search, it's just a simple equality check now.
"""

class Knowledge(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tag: str
    contents: str
    embedding: Optional[str] = Field(default=None)  # Storing embeddings as serialized JSON for simplicity

class KnowledgeBase:
    def __init__(self):
        config = Config()
        sqlite_path = config.get_sqlite_db()
        self.engine = create_engine(f"sqlite:///{sqlite_path}")
        SQLModel.metadata.create_all(self.engine)

    def add_knowledge_with_embedding(self, tag: str, contents: str, embedding: np.ndarray):
        # Serialize the numpy array to a JSON string for storage
        embedding_json = json.dumps(embedding.tolist())
        knowledge = Knowledge(tag=tag, contents=contents, embedding=embedding_json)
        with Session(self.engine) as session:
            session.add(knowledge)
            session.commit()

    def get_knowledge(self, tag: str) -> str:
        with Session(self.engine) as session:
            knowledge = session.query(Knowledge).filter(Knowledge.tag == tag).first()
            if knowledge:
                return knowledge.contents
            return None

    def get_all_knowledge(self) -> List[Knowledge]:
        with Session(self.engine) as session:
            return session.query(Knowledge).all()
        
    def save_embeddings(self, embeddings_dict: Dict[str, np.ndarray]):
        with Session(self.engine) as session:
            for tag, embedding in embeddings_dict.items():
                knowledge = session.query(Knowledge).filter(Knowledge.tag == tag).first()
                if knowledge:
                    # Serialize numpy array to JSON string
                    knowledge.embedding = json.dumps(embedding.tolist())
                    session.add(knowledge)
            session.commit()

    def get_all_embeddings(self) -> Dict[str, np.ndarray]:
        with Session(self.engine) as session:
            knowledge_items = session.query(Knowledge).all()
            embeddings = {}
            for item in knowledge_items:
                if item.embedding:
                    # Deserialize the JSON string back to a numpy array
                    embeddings[item.tag] = np.array(json.loads(item.embedding))
            return embeddings