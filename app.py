from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("planet.html")

@app.route("/<planet>")
def planet_page(planet):
    try:
        return render_template(f"{planet}.html")
    except:
        return "<h1>Page not found</h1>", 404

if __name__ == "__main__":
    app.run(debug=True)
