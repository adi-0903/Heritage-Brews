#!/bin/bash
echo "=========================================="
echo "  Heritage Brews Backend Setup"
echo "  विरासत चाय - API Server"
echo "=========================================="
echo ""

echo "[1/4] Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "[2/4] Installing dependencies..."
pip install -r requirements.txt

echo "[3/4] Running migrations..."
python manage.py makemigrations accounts catalog orders reservations blends rewards content
python manage.py migrate

echo "[4/4] Seeding database..."
python manage.py seed_data

echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "  Admin:  http://localhost:8000/admin/"
echo "  API:    http://localhost:8000/api/"
echo "  Login:  admin / heritage2026"
echo "=========================================="
echo ""
echo "Starting development server..."
python manage.py runserver
