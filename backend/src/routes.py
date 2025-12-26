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
            access_token = create_access_token(identity=str(user.id))
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
        access_token = create_access_token(identity=str(new_user.id))
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
    # --- Query Data ---
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

@main_bp.route('/api/theses', methods=['POST'])
@jwt_required()
def create_thesis():
    current_user_id = int(get_jwt_identity())
    data = request.get_json()
    
    # Required Fields
    title = data.get('title', '').strip()
    abstract = data.get('abstract', '').strip()
    year = data.get('year')
    page_count = data.get('page_count')
    type_id = data.get('type_id')
    language_code = data.get('language_code')
    institute_id = data.get('institute_id')
    subject_id = data.get('subject_id') # Single ID from dropdown
    keywords_str = data.get('keywords', '') # "AI, Data"
    
    if not title or not abstract or not year or not type_id or not institute_id:
        return jsonify({'error': 'Missing required fields (title, abstract, year, type, institute)'}), 400

    try:
        # Create Thesis
        new_thesis = Thesis(
            title=title,
            abstract=abstract,
            year=int(year),
            page_count=int(page_count) if page_count else None,
            type_id=int(type_id),
            language_code=language_code,
            institute_id=int(institute_id),
            author_id=current_user_id,
            submission_date=db.func.current_date() # Or use datetime.date.today()
        )
        
        # Handle Subject (Many-to-Many but getting single ID from simple dropdown)
        if subject_id:
            subject = Subject.query.get(subject_id)
            if subject:
                new_thesis.subjects.append(subject)
        
        # Handle Keywords
        if keywords_str:
            keyword_list = [k.strip() for k in keywords_str.split(',') if k.strip()]
            for k_text in keyword_list:
                # Check if exists (case-insensitive search ideally, but schema is simple)
                # Using ilike for better matching or just filter_by text
                keyword = Keyword.query.filter(Keyword.text.ilike(k_text)).first()
                if not keyword:
                    keyword = Keyword(text=k_text)
                    db.session.add(keyword) # Add to session to get ID after commit? 
                    # Actually valid to append new object to relationship
                
                if keyword not in new_thesis.keywords:
                    new_thesis.keywords.append(keyword)

        db.session.add(new_thesis)
        db.session.commit()
        
        return jsonify({'message': 'Thesis submitted successfully', 'id': new_thesis.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to suggest thesis: {str(e)}'}), 500

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
    current_user_id = int(get_jwt_identity())
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

@main_bp.route('/api/theses/<int:thesis_id>', methods=['DELETE'])
@jwt_required()
def delete_thesis(thesis_id):
    current_user_id = int(get_jwt_identity())
    
    thesis = Thesis.query.get(thesis_id)
    if not thesis:
        return jsonify({'error': 'Thesis not found'}), 404
    
    # Only allow deletion if the current user is the author
    if thesis.author_id != current_user_id:
        return jsonify({'error': 'Unauthorized: You can only delete your own theses'}), 403
    
    try:
        # Remove relationships first (many-to-many)
        thesis.subjects.clear()
        thesis.keywords.clear()
        
        # Delete supervisor associations
        SupervisorThesis.query.filter_by(thesis_id=thesis_id).delete()
        
        db.session.delete(thesis)
        db.session.commit()
        
        return jsonify({'message': 'Thesis deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to delete thesis: {str(e)}'}), 500
