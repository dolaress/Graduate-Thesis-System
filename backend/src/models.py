from extensions import db

# Association Object for Supervisor-Thesis (Many-to-Many with extra column)
class SupervisorThesis(db.Model):
    __tablename__ = 'supervisor_thesis'
    id = db.Column(db.Integer, primary_key=True)
    supervisor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    thesis_id = db.Column(db.Integer, db.ForeignKey('thesis.id'))
    is_main = db.Column(db.Boolean, default=False)

    # Relationships are defined in User and Thesis models for easier access

# Junction Tables
subject_thesis = db.Table('subject_thesis',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('subject_id', db.Integer, db.ForeignKey('subject.id')),
    db.Column('thesis_id', db.Integer, db.ForeignKey('thesis.id'))
)

keyword_thesis = db.Table('keyword_thesis',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('keyword_id', db.Integer, db.ForeignKey('keyword.id')),
    db.Column('thesis_id', db.Integer, db.ForeignKey('thesis.id'))
)

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))

    role = db.relationship('Role', backref='users')

class University(db.Model):
    __tablename__ = 'university'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

class Institute(db.Model):
    __tablename__ = 'institute'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    university_id = db.Column(db.Integer, db.ForeignKey('university.id'))

    university = db.relationship('University', backref='institutes')

class ThesisType(db.Model):
    __tablename__ = 'thesis_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

class Language(db.Model):
    __tablename__ = 'language'
    code = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(100))

class Subject(db.Model):
    __tablename__ = 'subject'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

class Keyword(db.Model):
    __tablename__ = 'keyword'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255))

class Thesis(db.Model):
    __tablename__ = 'thesis'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500))
    abstract = db.Column(db.String(5000))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    year = db.Column(db.Integer)
    type_id = db.Column(db.Integer, db.ForeignKey('thesis_type.id'))
    institute_id = db.Column(db.Integer, db.ForeignKey('institute.id'))
    page_count = db.Column(db.Integer)
    language_code = db.Column(db.String(10), db.ForeignKey('language.code'))
    submission_date = db.Column(db.Date)

    # Relationships
    author = db.relationship('User', foreign_keys=[author_id], backref='theses_authored')
    type = db.relationship('ThesisType')
    institute = db.relationship('Institute')
    language = db.relationship('Language')
    
    # Many-to-Many
    subjects = db.relationship('Subject', secondary=subject_thesis, backref='theses')
    keywords = db.relationship('Keyword', secondary=keyword_thesis, backref='theses')
    
    # Association Object Relationship
    supervisors = db.relationship('SupervisorThesis', backref='thesis')
