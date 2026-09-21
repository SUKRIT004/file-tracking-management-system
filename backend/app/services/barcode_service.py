import os
import barcode
from barcode.writer import ImageWriter

# Folder where barcode images will be stored
BARCODE_FOLDER = "barcodes"

# Create the folder if it doesn't exist
os.makedirs(BARCODE_FOLDER, exist_ok=True)


def generate_barcode(barcode_number: str):
    code128 = barcode.get_barcode_class("code128")

    barcode_obj = code128(barcode_number, writer=ImageWriter())

    filename = os.path.join(BARCODE_FOLDER, barcode_number)

    barcode_obj.save(filename)

    return filename + ".png"
