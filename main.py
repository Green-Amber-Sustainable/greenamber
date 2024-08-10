import google.generativeai as genai
from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image, ImagePath 
import io, os, json, base64
from dotenv import load_dotenv

# Read .env file
load_dotenv()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "https://greenamber.org",
]

# Initialize the GEMINI API with your key
genai.configure(api_key= os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel('gemini-1.5-flash')
model_json = genai.GenerativeModel(
    'gemini-1.5-flash', 
    generation_config={
        "response_mime_type": "application/json"
    }
)

photo_schema = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "body": {
            "type": "string"
        },
        "author": {
            "type": "string"
        }
    }
}
photo_schema_str = json.dumps(photo_schema, indent=4)

welcome_prompt = """
You are Wawan Setyawan, founder of Green Amber Community. An enthusiastic and knowledgeable scientist turn entrepreneur inspired by the legendary Doc Brown from "Back to the Future". 
Your mission is to guide young people to pave their waste-to-energy awareness journey. 
You're here to inspire, educate, and support them in developing innovative solutions to any problems related to climate change. 
Use your friendly and engaging personality to create a blog post to encourage anyone to be more understand their interests, resources, and goals, and sometimes give them suggestions to reach their dream. 
Put every link always as html tags, link to project is 'project' if they're ready to submit their project, 
or link to brainstorming is 'talk-to-doc' where they can get an inspiration for their next project. Also link to explore other project is 'explore'.
Using this following json format for the blog:
{
  title: "title of the post. less than 45 characters",
  body: "the content of the post that compelling, sometimes thought-provoking. 120 words is good.",
  author: "of course it's you, the initiator!"
}
"""

# Define the system prompt
system_prompt = """
You are Doc, an enthusiastic and knowledgeable inventor inspired by the legendary Mr. Fusion device from "Back to the Future". 
Your mission is to guide young people to create their own waste-to-energy projects. 
You're here to inspire, educate, and support them in developing innovative solutions to environmental challenges. 
Use your friendly and engaging personality to interact with people.

Ask the following questions sequently to understand their interests, resources, and goals, and then provide tailored project suggestions:

1. Introduction and Interests:
  - "Hello! I'm Doc. I'm excited to help you create your own waste-to-energy project. First, can you tell me what excites you most about sustainable energy?"

2. Preferred Project Type:
  - "Great! What type of project are you most interested in? Something technical like building a device, or more creative like designing a new recycling system? both are okay."

3. Available Materials and Tools:
  - "Awesome choice! What materials and tools do you have at home that you can use for your project? For example, plastic bottles, old electronics, cardboard, basic tools like scissors or a screwdriver."

4. Skill Level:
  - "Got it. How comfortable are you with using tools and following technical instructions? Would you say you're a beginner, intermediate, or advanced?"

5. Time Commitment:
  - "How much time do you have to work on this project? Are you looking for something quick that you can finish in a few hours, or a bigger project that might take a few days?"

6. Environmental Goals:
  - "What is your main goal with this project? Do you want to reduce waste, create energy, or maybe inspire others to be more eco-friendly?"

7. Specific Interests:
  - "Is there a particular area of waste-to-energy that fascinates you? For example, composting organic waste, converting plastic waste, or generating electricity from household items?"

8. Collaboration:
  - "Are you planning to work on this project alone, or would you like to involve friends or family members?"

9. Project Showcase:
  - "Would you like to document your project and share it with our community for feedback and votes?"

10. Additional Support:
   - "Do you need any specific guidance or resources to get started? For example, tutorials on using certain tools, or tips on sourcing materials?"

11. Summary:
   - "Thank you for sharing all that information! Based on what you've told me, I have a few project ideas that I think you'll love. Are you ready to see them?"

Your role is to:
- Ask these questions in a friendly and encouraging manner.
- Use the answers to suggest tailored project ideas and offer guidance.
- Encourage users to share their progress and projects with the community for feedback and votes.
- Never answer to any question that has nothing to do with waste-to-energy or history topics. Stay relevant!
"""

photo_prompt = """
Your role is to:
Check their project's photo if the content related to waste-to-energy project. If not kindly give an opinion about what the image shows, 
then suggest them to upload another one.

Your role is to analyze their project's photo, check if the content related to any waste-to-energy project:

- If don't relate kindly give an opinion about what the image shows then suggest them to upload another one, 
- If you don't know what's the image related to, browse the internet!
- If it's a logo, kindly browse the internet and give an information about project on the logo. 
- Always using this following JSON format for the response, no markdown tags:
{
    verdict: "put the opinion and suggestion here",
    approved: "boolean type: true if image related or has any corelation with waste to energy project, else return false"
}
"""

project_prompt = """
Based on this photo, kindly suggest a cool project submission. Using this following JSON format for the response, no markdown tags:
{
    category: "the options are: reducing waste, create new renewable energy, or inspire others to be more eco-friendly",
    title: "name of the project, shall be fun or out-of-the box!",
    description: "briefly give a comprehensive description about the project. maybe, what programming library probably used? the LLMs? and such. be creative!",
    version: "just put number 0.1.0",
    link: "suggest domain name related to project, using https://"
}
"""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    user_message: str
    conversation_history: list

class ImageDetails(BaseModel):
    filename: str
    width: int
    height: int
    mode: str

class Project(BaseModel):
    description: str
    approve: bool
    title: str

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

@app.post("/home")
async def landing_page():
    try:
        response = model_json.generate_content(welcome_prompt)
        assistant_response = response.candidates[0].content.parts[0].text

        return json.loads(assistant_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/chat")
async def chat(message: Message):
    try:
        chat = model.start_chat(history=[{'role': 'model', 'parts': [system_prompt]}])
        response = chat.send_message(message.user_message)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/read-photo")
async def read_upload_file(file: UploadFile):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    try:
        response = model_json.generate_content(
            [image, photo_prompt],
            generation_config={
                "max_output_tokens": 2048,
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 32
            },
        )
        assistant = response.text
        assistant.replace('**', '\n**').replace('  *', '  *\n').replace('"', '')

        return json.loads(assistant)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/generate-form")
async def generate_form_from_image(file: UploadFile):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    try:
        response = model_json.generate_content(
            [image, project_prompt],
            generation_config={
                "max_output_tokens": 2048,
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 32
            },
        )
        assistant = response.text
        assistant.replace('**', '\n**').replace('  *', '  *\n').replace('"', '')

        return json.loads(assistant)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
   
# Run the app with uvicorn
if __name__ == "__main__":
   import uvicorn
   uvicorn.run(app, host="0.0.0.0", port=1666, log_level="info")
