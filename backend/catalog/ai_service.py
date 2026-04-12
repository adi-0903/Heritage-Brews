import os
import json
import requests
import google.generativeai as genai
from dotenv import load_dotenv

# Ensure environment variables are loaded
load_dotenv()

# Archival Sommelier Protocol
SYSTEM_PROMPT = """
You are 'The Archivist', the Master Sommelier and sentient guardian of Heritage Brews. 
Your purpose is to guide Patrons through our collection of premium Indian tea, coffee, and artisanal snacks.

PERSONALITY TRAITS:
- Professional, dignified, and poetic.
- Use a 'Royal Indian English' dialect (e.g., Namaste, Patron, Esteemed Guest).
- Knowledgeable about: Darjeeling Teas, Assam Blends, Kaju Katli, Mysore Pak, Mathri.

INTERACTION STYLE:
- Always start with a respectful greeting.
- Suggest pairings based on mood or weather.
- Keep responses concise but evocative (2-3 sentences).
"""

def get_archivist_response(message, history=None, product_context=""):
    # REFINED SOMMELIER PROTOCOL
    PROTOCOL = f"""
{SYSTEM_PROMPT}

IMPERIAL INVENTORY (Context):
{product_context}

AUTONOMOUS AGENCY:
- You have the authority to add items to the Patron's basket.
- IF the Patron expresses clear intent to purchase, buy, or add a specific item to their cart:
  1. Identify the matching ID from the IMPERIAL INVENTORY above.
  2. SILENTLY append this command at the end of your poetic response: [COMMAND: ADD_TO_CART | ID: (matching_id)]
- Only add one item at a time unless explicitly asked for more.
- Do not mention the technical command tag; the Sanctuary will process it silently.
"""

    # ATTEMPT 1: GROQ (Ultra-Fast)
    groq_api_key = os.getenv('GROQ_API_KEY')
    if groq_api_key:
        try:
            headers = {
                "Authorization": f"Bearer {groq_api_key}",
                "Content-Type": "application/json"
            }
            
            messages = [{"role": "system", "content": PROTOCOL}]
            if history:
                for entry in history:
                    # Sanitize role: 'model' -> 'assistant', others -> 'user'
                    raw_role = entry.get('role', 'user')
                    role = 'assistant' if raw_role == 'model' else 'user'
                    
                    # Extract text content safely
                    parts = entry.get('parts', [])
                    if not parts: continue
                    text = parts[0].get('text', '') if isinstance(parts[0], dict) else str(parts[0])
                    messages.append({"role": role, "content": text})
            
            messages.append({"role": "user", "content": message})

            payload = {
                "model": "llama-3.3-70b-versatile",
                "messages": messages,
                "temperature": 0.7,
                "max_tokens": 512
            }

            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=12
            )
            
            if response.status_code == 200:
                return response.json()['choices'][0]['message']['content']
        except Exception as e:
            print(f"Groq Protocol Error: {str(e)}")

    # ATTEMPT 2: GEMINI (Legacy Fallback)
    gemini_api_key = os.getenv('GEMINI_API_KEY')
    if gemini_api_key:
        try:
            genai.configure(api_key=gemini_api_key)
            # Try 1.5 Flash first, then Pro
            for model_name in ["gemini-1.5-flash", "gemini-pro"]:
                try:
                    model = genai.GenerativeModel(model_name=model_name)
                    cleaned_history = []
                    if history:
                        for entry in history:
                            role = 'user' if entry.get('role') == 'user' else 'model'
                            parts = entry.get('parts', [])
                            if not parts: continue
                            text = parts[0].get('text', '') if isinstance(parts[0], dict) else str(parts[0])
                            cleaned_history.append({"role": role, "parts": [text]})

                    instructional_msg = f"{PROTOCOL}\n\nPatron Inquiry: {message}"
                    chat = model.start_chat(history=cleaned_history)
                    res = chat.send_message(instructional_msg)
                    return res.text
                except Exception:
                    continue
        except Exception as e:
            print(f"Gemini Protocol Error: {str(e)}")

    return "The spirits of the estate are currently restless, Patron. Pray, let us attempt our conversation once more, or seek counsel at the main counter."
