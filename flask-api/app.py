
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/user', methods=['GET'])
def get_user():
    return jsonify({
        "fullName": "Jane Doe",
        "email": "jane@example.com",
        "bio": "Frontend dev from Manila",
        "avatar": "https://i.pravatar.cc/150?img=3"
    })

@app.route('/api/user', methods=['PUT'])
def update_user():
    return jsonify(request.json)

if __name__ == '__main__':
    app.run(debug=True)
