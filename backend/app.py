from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "host": "localhost",
    "user": "estoque_user",
    "password": "estoque123",
    "database": "estoque_switches"
}

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

@app.route('/')
def index():
    return jsonify({"status": "API rodando com banco"})


@app.route('/register', methods=['POST'])
def register():
    data = request.json

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Dados incompletos'}), 400

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed_password)
        )
        conn.commit()
    except mysql.connector.Error:
        return jsonify({'error': 'Usuário ou email já existe'}), 409
    finally:
        cursor.close()
        conn.close()

    return jsonify({'message': 'Usuário cadastrado com sucesso'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT id, username, password FROM users WHERE email = %s",
        (email,)
    )
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user and check_password_hash(user["password"], password):
        return jsonify({
            "id": user["id"],
            "username": user["username"],
            "email": email
        }), 200

    return jsonify({'error': 'Email ou senha inválidos'}), 401



@app.route('/switches', methods=['POST'])
def add_switch():
    data = request.json

    modelo = data.get('modelo')
    marca = data.get('marca')
    numero_portas = data.get('numero_portas')
    serial = data.get('serial')
    status = data.get('status')
    localizacao = data.get('localizacao')

    if not modelo or not marca or not numero_portas or not serial:
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO switches (modelo, marca, numero_portas, serial, status, localizacao)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (modelo, marca, numero_portas, serial, status, localizacao)
        )
        conn.commit()
    except mysql.connector.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

    return jsonify({'message': 'Switch cadastrado com sucesso'}), 201


@app.route('/switches', methods=['GET'])
def get_switches():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
    SELECT
        id,
        modelo,
        marca,
        numero_portas,
        serial,
        localizacao,
        status,
        created_at
    FROM switches
    """)
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(rows), 200



@app.route('/switches/<int:id>', methods=['PUT'])
def update_switch(id):
    data = request.json

    modelo = data.get('modelo')
    marca = data.get('marca')
    numero_portas = data.get('numero_portas')
    status = data.get('status')
    localizacao = data.get('localizacao')

    if not modelo or not marca or not numero_portas:
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE switches
        SET modelo = %s,
            marca = %s,
            numero_portas = %s,
            status = %s,
            localizacao = %s
        WHERE id = %s
        """,
        (modelo, marca, numero_portas, status, localizacao, id)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Switch não encontrado'}), 404

    cursor.close()
    conn.close()

    return jsonify({'message': 'Switch atualizado com sucesso'}), 200


@app.route('/switches/<int:id>', methods=['DELETE'])
def delete_switch(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM switches WHERE id = %s", (id,))
    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Switch não encontrado'}), 404

    cursor.close()
    conn.close()

    return jsonify({'message': 'Switch removido com sucesso'}), 200

if __name__ == '__main__':
    app.run(debug=True)
