from flask import Flask, request, jsonify
from flask_cors import CORS
from newspaper import Article
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
import torch

app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": "http://localhost:8081"}})  # Allow frontend requests

# Load model & tokenizer once on server startup
model_name = "valhalla/longformer-base-4096-finetuned-squadv1"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

@app.route('/')
def home():
    return 'Welcome! Flask is running! 🎉'

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    url = data.get("url")
    question = data.get("question")

    if not url or not question:
        return jsonify({"error": "URL and question are required"}), 400

    try:
        article = Article(url)
        article.download()
        article.parse()
        context = article.text

        inputs = tokenizer(question, context, return_tensors="pt", truncation=True, max_length=4096)

        with torch.no_grad():
            outputs = model(**inputs)
            start_idx = torch.argmax(outputs.start_logits)
            end_idx = torch.argmax(outputs.end_logits)
            answer = tokenizer.decode(inputs['input_ids'][0][start_idx:end_idx + 1])

        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)