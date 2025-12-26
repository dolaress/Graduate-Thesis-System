from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import db
from models import User, Role, University, Institute, ThesisType, Language, Subject, Keyword, Thesis, SupervisorThesis
from sqlalchemy import or_

main_bp = Blueprint('main', __name__)

# --- Auth Routes ---

@main_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()
    
    if not email or not password:
        return jsonify({'error': 'Email and Password are required'}), 400

    try:
        # Real Authentication Logic
        user = User.query.filter_by(email=email).first()

        if user and user.password == password:
            # Note: In production, password should be hashed (e.g. bcrypt). 
            # Current implementation uses plain text as per user SQL update.
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role_id': user.role_id,
                    'email': user.email 
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401

    except Exception as e:
        return jsonify({'error': f'Login processing error: {str(e)}'}), 500

@main_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()
    
    if not first_name or not last_name or not email or not password:
        return jsonify({'error': 'All fields (First Name, Last Name, Email, Password) are required'}), 400

    # Check if user already exists by email
    existing = User.query.filter_by(email=email).first()

    if existing:
        return jsonify({'error': 'User with this email already exists'}), 400

    try:
        # Create new user
        new_user = User(
            first_name=first_name, 
            last_name=last_name, 
            email=email,
            password=password, # Saving plain text as per current schema update
            role_id=1
        )
        db.session.add(new_user)
        db.session.commit()

        # Auto-login
        access_token = create_access_token(identity=new_user.id)
        return jsonify({
            'message': 'User created successfully',
            'access_token': access_token,
            'user': {
                'id': new_user.id,
                'first_name': new_user.first_name,
                'last_name': new_user.last_name,
                'role_id': new_user.role_id,
                'email': new_user.email 
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

# --- Data Routes ---

@main_bp.route('/api/metadata', methods=['GET'])
def get_metadata():
    universities = University.query.all()
    institutes = Institute.query.all()
    types = ThesisType.query.all()
    languages = Language.query.all()
    subjects = Subject.query.all()
    keywords = Keyword.query.all()

    return jsonify({
        'universities': [{'id': u.id, 'name': u.name} for u in universities],
        'institutes': [{'id': i.id, 'name': i.name, 'university_id': i.university_id} for i in institutes],
        'thesisTypes': [{'id': t.id, 'name': t.name} for t in types],
        'languages': [{'code': l.code, 'name': l.name} for l in languages],
        'subjects': [{'id': s.id, 'name': s.name} for s in subjects],
        'keywords': [{'id': k.id, 'text': k.text} for k in keywords]
    })

@main_bp.route('/api/theses', methods=['GET'])
def get_theses():
    query = Thesis.query

    # Search Text
    q = request.args.get('q')
    if q:
        search = f"%{q}%"
        query = query.filter(or_(
            Thesis.title.ilike(search),
            Thesis.abstract.ilike(search),
            Thesis.author.has(User.first_name.ilike(search)),
            Thesis.author.has(User.last_name.ilike(search))
        ))
    
    # Filters
    type_id = request.args.get('type')
    if type_id:
        query = query.filter_by(type_id=type_id)
        
    language_code = request.args.get('language')
    if language_code:
        query = query.filter_by(language_code=language_code)
        
    institute_id = request.args.get('institute')
    if institute_id:
        query = query.filter_by(institute_id=institute_id)
        
    university_id = request.args.get('university')
    if university_id:
        query = query.join(Institute).filter(Institute.university_id == university_id)
        
    subject_id = request.args.get('subject')
    if subject_id:
        query = query.filter(Thesis.subjects.any(id=subject_id))
        
    keyword_id = request.args.get('keyword_id')
    if keyword_id:
         query = query.filter(Thesis.keywords.any(id=keyword_id))

    year_min = request.args.get('year_min')
    if year_min:
        query = query.filter(Thesis.year >= int(year_min))
        
    year_max = request.args.get('year_max')
    if year_max:
         query = query.filter(Thesis.year <= int(year_max))

    # Calculate pagination or limit? For now, fetch all (or limit 100)
    theses = query.limit(100).all()
    
    results = []
    for t in theses:
        results.append({
            'id': t.id,
            'title': t.title,
            'abstract': t.abstract,
            'author_id': t.author_id,
            'year': t.year,
            'type_id': t.type_id,
            'institute_id': t.institute_id,
            'page_count': t.page_count,
            'language_code': t.language_code,
            'submission_date': t.submission_date.isoformat() if t.submission_date else None,
            'author': f"{t.author.first_name} {t.author.last_name}" if t.author else "Unknown",
            'supervisor_ids': [st.supervisor_id for st in t.supervisors],
            'subjects': [s.id for s in t.subjects],
            'keywords': [k.id for k in t.keywords]
        })
        
    return jsonify(results)

@main_bp.route('/api/my-theses', methods=['GET'])
@jwt_required()
def get_my_theses():
    current_user_id = get_jwt_identity()
    theses = Thesis.query.filter_by(author_id=current_user_id).all()
    
    results = []
    for t in theses:
        results.append({
            'id': t.id,
            'title': t.title,
            'abstract': t.abstract,
            'author_id': t.author_id,
            'year': t.year,
            'type_id': t.type_id,
            'institute_id': t.institute_id,
            'page_count': t.page_count,
            'language_code': t.language_code,
            'submission_date': t.submission_date.isoformat() if t.submission_date else None,
            'author': f"{t.author.first_name} {t.author.last_name}" if t.author else "Unknown",
            'supervisor_ids': [st.supervisor_id for st in t.supervisors],
            'subjects': [s.id for s in t.subjects],
            'keywords': [k.id for k in t.keywords]
        })
    return jsonify(results)
