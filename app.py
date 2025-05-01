from flask import Flask, request, jsonify
from flask_cors import CORS
from newspaper import Article, Config
from transformers import (
    AutoTokenizer,
    AutoModelForQuestionAnswering,
    T5Tokenizer,
    T5ForConditionalGeneration,
)
import torch
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# -------------------------------
# 🤖 1. Chargement des modèles
# -------------------------------

# QA model (Longformer)
qa_model_name = "valhalla/longformer-base-4096-finetuned-squadv1"
qa_tokenizer = AutoTokenizer.from_pretrained(qa_model_name)
qa_model = AutoModelForQuestionAnswering.from_pretrained(qa_model_name)

# Summarizer model (T5 fine-tuné)
summarizer_path = os.path.abspath("./t5-small-cnn")  # ← Ton dossier fine-tuné
summarizer_tokenizer = T5Tokenizer.from_pretrained(summarizer_path, local_files_only=True)
summarizer_model = T5ForConditionalGeneration.from_pretrained(summarizer_path, local_files_only=True)


# Newspaper config (user-agent)
user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
config = Config()
config.browser_user_agent = user_agent
config.request_timeout = 10

# -------------------------------
# 📌 2. Routes Flask
# -------------------------------

@app.route('/')
def home():
    return 'Welcome! Flask is running with T5 Summarizer and Longformer QA 🎉'

# Route QA
@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    url = data.get("url")
    question = data.get("question")

    if not url or not question:
        return jsonify({"error": "URL and question are required"}), 400

    try:
        article = Article(url, config=config)
        article.download()
        article.parse()
        context = article.text

        inputs = qa_tokenizer(question, context, return_tensors="pt", truncation=True, max_length=4096)

        with torch.no_grad():
            outputs = qa_model(**inputs)
            start_idx = torch.argmax(outputs.start_logits)
            end_idx = torch.argmax(outputs.end_logits)
            answer = qa_tokenizer.decode(inputs['input_ids'][0][start_idx:end_idx + 1])

        return jsonify({"answer": answer})

    except Exception as e:
        print("🔥 Error:", e)
        return jsonify({"error": str(e)}), 500

# Route Summarizer
@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        article = Article(url, config=config)
        article.download()
        article.parse()
        text = article.text

        # Inference T5
        input_text = "summarize: " + text
        inputs = summarizer_tokenizer(input_text, return_tensors="pt", truncation=True, max_length=512, padding="max_length")

        with torch.no_grad():
            summary_ids = summarizer_model.generate(inputs["input_ids"], max_length=150, min_length=40, do_sample=False)
            summary = summarizer_tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        return jsonify({"summary": summary})

    except Exception as e:
        print("🔥 Error:", e)
        return jsonify({"error": str(e)}), 500

# -------------------------------
# 🚀 3. Lancer le serveur
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
