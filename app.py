from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    data = request.json

    # Get data from website
    name = data["name"]
    city = data["city"]
    dob = data["dob"]
    favourite_word = data["favourite_word"]

    # Clean input
    name = name.strip().title()
    city = city.strip().lower()
    favourite_word = favourite_word.strip().upper()

    # Extract birth year from DD/MM/YYYY
    birth_year = dob[-4:]

    # String operations
    first_character = name[0]
    last_character = name[-1]

    name_length = len(name)

    reversed_name = name[::-1]

    last_two_digits = birth_year[-2:]

    # String checks
    a_in_name = "a" in name.lower()
    e_in_word = "e" in favourite_word.lower()
    x_not_in_city = "x" not in city.lower()

    # Comparison
    birth_year_check = birth_year > "2000"
    name_length_check = name_length > 5

    # Logical operators
    age_check = birth_year_check and name_length_check
    city_check = x_not_in_city or city == "delhi"

    # Username
    first_name = name.split()[0].lower()

    username = first_name + city + last_two_digits

    # Password suggestion
    password = favourite_word + last_two_digits

    # Send everything back to website
    return jsonify({
        "username": username,
        "password": password,

        "first_character": first_character,
        "last_character": last_character,
        "name_length": name_length,
        "reversed_name": reversed_name,
        "last_two_digits": last_two_digits,

        "a_in_name": a_in_name,
        "e_in_word": e_in_word,
        "x_not_in_city": x_not_in_city,

        "birth_year_check": birth_year_check,
        "name_length_check": name_length_check,

        "age_check": age_check,
        "city_check": city_check
    })


if __name__ == "__main__":
    app.run(debug=True)