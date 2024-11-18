import tensorflow as tf
import numpy as np
import pandas as pd
import joblib 

class ItineraryGenerator:
    def __init__(self, model_path, encoder_location_path, encoder_category_path, scaler_path, data_path):

        self.model = tf.keras.models.load_model(model_path)
        self.encoder_location = joblib.load(encoder_location_path)
        self.encoder_category = joblib.load(encoder_category_path)
        self.scaler = joblib.load(scaler_path)
        

        self.df = pd.read_csv(data_path)
        

        self.id_to_label = {item_id: idx for idx, item_id in enumerate(sorted(self.df['id'].unique()))}
        self.label_to_id = {idx: item_id for item_id, idx in self.id_to_label.items()}

    def generate_itineraries(self, location, budget, duration, category=None, top_n=3):

        encoded_location = self.encoder_location.transform([[location]])
        if category:
            encoded_category = self.encoder_category.transform(np.array(category).reshape(-1, 1))
        else:
            encoded_category = np.zeros((1, self.encoder_category.categories_[0].size))

        if category and len(category) > 1:
            encoded_category = np.sum(encoded_category, axis=0).reshape(1, -1)
    

        normalized_price_duration = self.scaler.transform([[budget, duration]])
    

        user_features = np.hstack([encoded_location, encoded_category, normalized_price_duration])


        predictions = self.model.predict(user_features)[0]


        filtered_places = self.df[
            (self.df['price'] <= budget) & 
            (self.df['duration'] <= duration) & 
            (self.df['location'] == location)
        ]
    

        if category:
            filtered_places = filtered_places[filtered_places['category'].isin(category)]


        dining_places = filtered_places[filtered_places['category'] == 'dining']
        other_places = filtered_places[filtered_places['category'] != 'dining']


        if not category and duration >= 2 and dining_places.empty:
            print("Warning: No dining places available for this duration, please check your data!")
            return

        all_itineraries = []

        for _, dining_place in dining_places.iterrows():
            current_duration = dining_place['duration']
            current_budget = dining_place['price']
            selected_places = [dining_place]
        
            remaining_duration = duration - current_duration
            remaining_budget = budget - current_budget

            for _, place in other_places.iterrows():
                if current_duration + place['duration'] <= duration and current_budget + place['price'] <= budget:
                    selected_places.append(place)
                    current_duration += place['duration']
                    current_budget += place['price']
            
                if current_duration >= duration or current_budget >= budget:
                    break
        
            if current_duration <= duration and current_budget <= budget and selected_places:
                all_itineraries.append(selected_places)

        if category:
            all_itineraries = []
            for _, place in filtered_places.iterrows():
                current_duration = place['duration']
                current_budget = place['price']
                selected_places = [place]
            
                remaining_duration = duration - current_duration
                remaining_budget = budget - current_budget

                for _, other_place in other_places.iterrows():
                    if current_duration + other_place['duration'] <= duration and current_budget + other_place['price'] <= budget:
                        selected_places.append(other_place)
                        current_duration += other_place['duration']
                        current_budget += other_place['price']
                
                    if current_duration >= duration or current_budget >= budget:
                        break

                if current_duration <= duration and current_budget <= budget and selected_places:
                    all_itineraries.append(selected_places)

        itineraries_with_scores = []
        for itinerary in all_itineraries:
            itinerary_score = sum(predictions[self.df[self.df['id'] == place['id']].index[0]] for place in itinerary)
            itineraries_with_scores.append((itinerary, itinerary_score))
    

        itineraries_with_scores.sort(key=lambda x: x[1], reverse=True)


        recommendations = {}

        itineraryList = []

        for i, (itinerary, score) in enumerate(itineraries_with_scores[:top_n]):
            print(f"--- Itinerary {i+1} (Score: {score:.2f}) ---")
            total_duration = 0
            total_price = 0
        
            placeJson = {}
            placeList = []
            for place in itinerary:
                print(f"Place: {place['name']}, Category: {place['category']}, Duration: {place['duration']} hours, Price: {place['price']}")
                total_duration += place['duration']
                total_price += place['price']
                place_details = { "Name": place['name'], "Category": place['category'], "Duration": place['duration'], "Price": place['price']}
            
                placeList.append(place_details)
        
            placeJson['places'] = placeList
            placeJson["totalDuration"] = total_duration
            placeJson["totalPrice"] = total_price

            itineraryList.append(placeJson)

            print(f"Total Duration: {total_duration} hours")
            print(f"Total Price: {total_price}")
            print("------")

            recommendations["itineraries"] = itineraryList

        return recommendations


# Example usage
if __name__ == '__main__':

    itinerary_generator = ItineraryGenerator(
        model_path='models/content_model.h5',
        encoder_location_path='models/encoder_location.pkl',
        encoder_category_path='models/encoder_category.pkl',
        scaler_path='models/scaler.pkl',
        data_path='data/places_data.csv'
    )
    

    user_location = 'New Delhi'
    user_category = []
    max_budget = 1000  
    max_duration = 5 
    top_n_recommendations = 3 


    itinerary_generator.generate_itineraries(user_location, max_budget, max_duration, user_category, top_n=top_n_recommendations)








# import tensorflow as tf
# import numpy as np
# import pandas as pd
# import joblib  # For loading encoders and scaler

# class ItineraryGenerator:
#     def __init__(self, model_path, encoder_location_path, encoder_category_path, scaler_path, data_path):
#         # Load the saved model and preprocessing objects
#         self.model = tf.keras.models.load_model(model_path)
#         self.encoder_location = joblib.load(encoder_location_path)
#         self.encoder_category = joblib.load(encoder_category_path)
#         self.scaler = joblib.load(scaler_path)
        
#         # Load the places data
#         self.df = pd.read_csv(data_path)
        
#         # ID-to-label and label-to-ID mappings
#         self.id_to_label = {item_id: idx for idx, item_id in enumerate(sorted(self.df['id'].unique()))}
#         self.label_to_id = {idx: item_id for item_id, idx in self.id_to_label.items()}

#     def generate_itineraries_with_age_group(self, location, budget, duration, age_groups, category=None, top_n=3):
#         # Transform location and category based on user input
#         encoded_location = self.encoder_location.transform([[location]])
#         encoded_category = self.encoder_category.transform([[category]]) if category else np.zeros((1, self.encoder_category.categories_[0].size))
        
#         # Normalize budget and duration
#         normalized_price_duration = self.scaler.transform([[budget, duration]])
        
#         # Combine all features for user input
#         user_features = np.hstack([encoded_location, encoded_category, normalized_price_duration])

#         # Predict using the loaded model
#         predictions = self.model.predict(user_features)[0]

#         # Filter places based on budget, duration, location, and age group
#         filtered_places = self.df[
#             (self.df['price'] <= budget) &
#             (self.df['duration'] <= duration) &
#             (self.df['location'] == location) &
#             ((self.df['category'] == category) if category else True)  # Category is optional
#         ]
        
#         # Filter places by age group
#         filtered_places = filtered_places[filtered_places['age'].apply(
#             lambda x: any(group in x for group in age_groups))]

#         # Separate dining places from the rest
#         dining_places = filtered_places[filtered_places['category'] == 'dining']
#         other_places = filtered_places[filtered_places['category'] != 'dining']

#         # If duration is >= 2 hours, ensure at least one dining place is included
#         if duration >= 2 and dining_places.empty:
#             print("Warning: No dining places available for this duration, please check your data!")
#             return

#         all_itineraries = []

#         # Generate possible itineraries by including a dining place
#         for _, dining_place in dining_places.iterrows():
#             current_duration = dining_place['duration']
#             current_budget = dining_place['price']
#             selected_places = [dining_place]
            
#             remaining_duration = duration - current_duration
#             remaining_budget = budget - current_budget
            
#             # Loop over other places and fill the remaining duration and budget
#             for _, place in other_places.iterrows():
#                 if current_duration + place['duration'] <= duration and current_budget + place['price'] <= budget:
#                     selected_places.append(place)
#                     current_duration += place['duration']
#                     current_budget += place['price']
                
#                 if current_duration >= duration or current_budget >= budget:
#                     break
            
#             if current_duration <= duration and current_budget <= budget and selected_places:
#                 all_itineraries.append(selected_places)
        
#         # Sort itineraries by model predictions
#         itineraries_with_scores = []
#         for itinerary in all_itineraries:
#             itinerary_score = sum(predictions[self.df[self.df['id'] == place['id']].index[0]] for place in itinerary)
#             itineraries_with_scores.append((itinerary, itinerary_score))
        
#         # Sort itineraries by score and return the top N
#         itineraries_with_scores.sort(key=lambda x: x[1], reverse=True)

#         # Display the top itineraries

#         recommendations = {}

#         itineraryList = []

#         for i, (itinerary, score) in enumerate(itineraries_with_scores[:top_n]):
#             print(f"--- Itinerary {i+1} (Score: {score:.2f}) ---")
#             total_duration = 0
#             total_price = 0
            
#             placeJson = {}
#             placeList = []
#             for place in itinerary:
#                 print(f"Place: {place['name']}, Category: {place['category']}, Duration: {place['duration']} hours, Price: {place['price']}")
#                 total_duration += place['duration']
#                 total_price += place['price']
#                 place_details = { "Name": place['name'], "Category":  place['category'], "Duration": place['duration'], "Price":  place['price']}
                
#                 placeList.append(place_details)
            
#             placeJson['places'] = placeList
#             placeJson["totalDuration"] = total_duration
#             placeJson["totalPrice"] = total_price

#             itineraryList.append(placeJson)

#             print(f"Total Duration: {total_duration} hours")
#             print(f"Total Price: {total_price}")
#             print("------")

#             recommendations["itineraries"] = itineraryList

#         return recommendations


# # Example usage
# if __name__ == '__main__':
#     # Initialize the itinerary generator
#     itinerary_generator = ItineraryGenerator(
#         model_path='models/content_model.h5',
#         encoder_location_path='models/encoder_location.pkl',
#         encoder_category_path='models/encoder_category.pkl',
#         scaler_path='models/scaler.pkl',
#         data_path='data/places_data.csv'
#     )
    
#     # Example user inputs
#     user_location = 'New Delhi'  # Replace with user input
#     user_category = ''  # Replace with user input or None if no preference
#     user_age_groups = ['41-65', '65 and above']  # Replace with user input (multiple age groups can be selected)
#     max_budget = 1000  # Replace with user input
#     max_duration = 9  # Replace with user input (in hours)
#     top_n_recommendations = 3  # Number of itineraries to return

#     # Generate itineraries
#     itinerary_generator.generate_itineraries_with_age_group(user_location, max_budget, max_duration, user_age_groups, user_category, top_n=top_n_recommendations)
