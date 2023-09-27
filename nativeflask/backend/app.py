from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# Instância do flask
app = Flask(__name__) 
CORS(app)

# Configuração do SQLAlchemy (indicação do servidor de Banco)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask_native_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Instância do SQLAlchemy relacionada ao app
db = SQLAlchemy(app)

# Instância do Marshmallow relacionada ao app
ma = Marshmallow(app)


# Criação do Model da base de dados
class Article(db.Model):
    # Instância das colunas, indicação dos tipos de dados
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    text = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    # Método construtor da classe
    def __init__(self, title, text):
        self.title=title
        self.text=text


# Classe construtora do Schema com o marshmallow
class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'text', 'date')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


# Rotas da aplicação

# Rota GET
@app.route('/get', methods= ['GET'])
def get_articles():
    # GET de todos os registros
    all_articles = Article.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)

# Rota GET único com id de argumento
@app.route('/get/<id>/', methods= ['GET'])
def get_article(id):
    # GET de registro único com id de argumento
    article = Article.query.get(id)
    return article_schema.jsonify(article)


# Rota POST
@app.route('/add', methods= ['POST'])
def add_article():
    # Referência aos argumentos do pedido POST
    title = request.json['title']
    text = request.json['text']

    # Armazenamento dos args na Classe
    articles = Article(title, text)
    
    # Adição e commit do objeto na base de dados
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

# Rota PUT
@app.route('/update/<id>/', methods= ['PUT'])
def update_article(id):
    article = Article.query.get(id)

    title = request.json['title']
    text = request.json['text']
    date = datetime.datetime.now()


    article.title = title
    article.text = text
    article.date = date

    db.session.commit()
    return article_schema.jsonify(article)

# Rota DELETE
@app.route('/delete/<id>/', methods= ['DELETE'])
def delete_article(id):
    article = Article.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)


# Início da aplicação
if __name__=="__main__":
    app.run(host = '0.0.0.0', port=5000, debug=True)