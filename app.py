from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

CORS(app)

messages_db = []

@app.route('/submit', methods=['POST'])
def submit_message():
    data = request.json
    print(f'Received data: {data}')

    if not data or 'name' not in data or 'message' not in data:
        return jsonify({'status': 'error', 'message': 'Invalid data format'}), 400

    messages_db.append({
        'name': data.get('name'),
        'message': data.get('message')
    })

    return jsonify({'status': 'success', 'message': 'Data received successfully!'}), 200

@app.route('/messages', methods=['GET'])
def get_messages():
    return jsonify(messages_db)

if __name__ == '__main__':
    app.run(debug=True, port=5000)