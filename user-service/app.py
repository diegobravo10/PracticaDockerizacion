from flask import Flask, jsonify
import os
import psycopg2

app = Flask(__name__)

# Conexión a PostgreSQL
conn = psycopg2.connect(os.environ['DATABASE_URL'])
cur = conn.cursor()

# Crear tabla si no existe
cur.execute("""
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
)
""")
conn.commit()

# Insertar datos iniciales si la tabla está vacía
cur.execute("SELECT COUNT(*) FROM users")
count = cur.fetchone()[0]
if count == 0:
    cur.execute("INSERT INTO users (name) VALUES (%s), (%s), (%s)", ('Alice', 'Bob', 'Charlie'))
    conn.commit()

# Endpoint para listar usuarios
@app.route('/api/v1/users', methods=['GET'])
def get_users():
    cur.execute("SELECT * FROM users")
    rows = cur.fetchall()
    users = [{"id": r[0], "name": r[1]} for r in rows]
    return jsonify({"users": users})

# Endpoint para un usuario específico
@app.route('/api/v1/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cur.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    row = cur.fetchone()
    if row:
        return jsonify({"id": row[0], "name": row[1]})
    return jsonify({"error": "User not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
