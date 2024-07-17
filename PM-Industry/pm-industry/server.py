from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'  # Specify the upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def pixels_to_feet(length_pixels, scale_factor):
    # Convert pixel length to feet
    length_feet = length_pixels * scale_factor
    # Convert feet to inches
    length_inches = length_feet * 12
    return length_feet, length_inches

def calculate_wall_area(wall_lengths_feet, wall_height):
    # Calculate the area of each wall and sum them up
    total_area = sum(length * wall_height for length in wall_lengths_feet)
    return total_area

def detect_walls(image_path, scale_factor, thickness_threshold):
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        return None

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Use Canny edge detection to find edges
    edges = cv2.Canny(blurred, 30, 100)

    # Use Hough Line Transform to detect lines
    lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=20, minLineLength=50, maxLineGap=0)

    if lines is None:
        return None

    # Calculate the length of each wall in pixels
    wall_lengths = []
    for line in lines:
        x1, y1, x2, y2 = line[0]
        # Calculate length of the line segment
        length_pixels = np.sqrt((x2 - x1)**2 + (y2 - y1)**2)
        # Check if the line segment length exceeds the threshold
        if length_pixels >= thickness_threshold:
            wall_lengths.append(length_pixels)

    # Convert pixel lengths to feet using the scale factor
    wall_lengths_feet = [pixels_to_feet(length_pixels, scale_factor)[0] for length_pixels in wall_lengths]

    return wall_lengths_feet

def detect_floor(image_path, scale_factor):
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        return None

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Use Canny edge detection to find edges
    edges = cv2.Canny(blurred, 30, 100)

    # Find contours
    contours, _ = cv2.findContours(edges.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filter out contours based on area to get the floor contour
    floor_contour = max(contours, key=cv2.contourArea)

    # Get the bounding rectangle of the floor contour
    x, y, w, h = cv2.boundingRect(floor_contour)

    # Calculate length and width of the floor in pixels
    length_pixels = w
    width_pixels = h

    # Convert length and width from pixels to feet
    length_feet, _ = pixels_to_feet(length_pixels, scale_factor)
    width_feet, _ = pixels_to_feet(width_pixels, scale_factor)

    return length_feet, width_feet

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        # Save the uploaded file to the specified upload folder
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        wall_lengths_feet = detect_walls(filename, 0.1, 20)  # Adjust scale factor and threshold as needed
        length_feet, width_feet = detect_floor(filename, 0.1)  # Adjust scale factor as needed
        if wall_lengths_feet is not None:
            wall_height = 8  # Standard wall height in feet
            total_wall_area = calculate_wall_area(wall_lengths_feet, wall_height)
            floor_area = length_feet * width_feet
            return jsonify({'total_wall_area': total_wall_area, 'floor_area': floor_area}), 200
        else:
            return jsonify({'error': 'Failed to detect walls in the image'}), 400

if __name__ == '__main__':
    app.run(debug=True)
