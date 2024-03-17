from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage
from langchain_core.runnables import RunnablePassthrough
from rag import get_rag_template, format_docs

def get_prompt_template():
    """
    This template expects to be passed a question value.
    """
    template = """{question}"""
    prompt_template = ChatPromptTemplate.from_template(template)
    prompt_template.messages.insert(0, 
        SystemMessage(
            content="You are a helpful AI assistant. Respond to the best of your ability."
        )
    )
    return prompt_template

def get_chain(llm, retriever = None):
    """
    
    """
    chain = None
    # Get prompt template
    if retriever is None:
        prompt_template = get_prompt_template()
        chain = (
            {"question": RunnablePassthrough()}
            | prompt_template
            | llm
            # | StrOutputParser()
        )
    else:
        rag_prompt_template = get_rag_template()
        chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | rag_prompt_template
        | llm
    )
    return chain
