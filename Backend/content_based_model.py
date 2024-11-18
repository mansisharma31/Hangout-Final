import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import tensorflow as tf
import numpy as np
import os
import joblib  

print("Loading data...")
data_path = 'data/FinalDatasetHangout.csv'
df = pd.read_csv(data_path)


print("Encoding categorical data...")
encoder_location = OneHotEncoder(sparse_output=False)
encoded_location = encoder_location.fit_transform(df[['location']])

encoder_category = OneHotEncoder(sparse_output=False)
encoded_category = encoder_category.fit_transform(df[['category']])


print("Normalizing numerical data...")
scaler = StandardScaler()
normalized_price_duration = scaler.fit_transform(df[['price', 'duration']])


print("Combining features...")
features = np.hstack([encoded_location, encoded_category, normalized_price_duration])


print("Mapping item IDs to sequential labels...")
unique_ids = sorted(df['id'].unique())
id_to_label = {item_id: idx for idx, item_id in enumerate(unique_ids)}
labels = df['id'].map(id_to_label).values


num_classes = len(unique_ids)
print("Defining the model with", num_classes, "output classes...")
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(features.shape[1],)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(num_classes, activation='softmax')
])

print("Compiling the model...")
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

print("Training the model...")
model.fit(features, labels, epochs=10, batch_size=8, validation_split=0.2)


print("Saving the model and preprocessing objects...")
os.makedirs("models", exist_ok=True)
model.save('models/content_model.h5')


joblib.dump(encoder_location, 'models/encoder_location.pkl')
joblib.dump(encoder_category, 'models/encoder_category.pkl')
joblib.dump(scaler, 'models/scaler.pkl')
print("Model and preprocessing objects saved.")


