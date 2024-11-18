from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from recommendation_test import ItineraryGenerator

itinerary_generator = ItineraryGenerator(
    model_path='models/content_model.h5',
    encoder_location_path='models/encoder_location.pkl',
    encoder_category_path='models/encoder_category.pkl',
    scaler_path='models/scaler.pkl',
    data_path='data/places_data.csv'
)

app = Flask(__name__)


CORS(app)

@app.route('/plan_activity', methods=['GET'])
def plan_activity():
    location = request.args.get('location', default="New Delhi")
    budget = int(request.args.get('budget', default=912))
    duration = int(request.args.get('duration', default=12))
    categories = request.args.get('categories', '').split(',')  
    if categories == ['']:
        categories = None

    print(f"Location: {location}, Budget: {budget}, Duration: {duration}, Category: {categories}")


    if not location or not budget or not duration:
        return jsonify({"error": "Missing required parameters"}), 400
    

    recommendations = itinerary_generator.generate_itineraries(location, budget, duration, categories)
    

    return jsonify({
        "recommendations": recommendations
    })

if __name__ == '__main__':
    app.run(debug=True)




