The components of our project:

- A UI frontent that accepts user input
    - This will use Gradio Components
    - A chat window, an agent workspace, and a dropdown to select the desired model(s)
- Function to process urls into LangChain Document objects
- Function to create a vector database (vectorstore) from a list of Documents using an embedding model
- A RAG pipeline (Using a LangChain LCEL chain)
    - Retriever uses your vectorstore + prompt to retrieve the most relevant Documents: This is the "context"
    - Chain to a LLM (Claude Opus) to generate response based on the context
    - Parse the output if the format should follow specific JSON, or if a specific schema is needed for the next step

Helpful links:
1. https://python.langchain.com/docs/expression_language/cookbook/retrieval - Super helpful for RAG
2. https://python.langchain.com/docs/modules/data_connection/ - high level overview
3. https://python.langchain.com/docs/integrations/text_embedding/together
4. https://python.langchain.com/docs/integrations/chat/anthropic
5. https://python.langchain.com/docs/integrations/chat/anthropic_functions