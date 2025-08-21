#!/bin/bash

# feature_img_resizer.sh
# Resizes a PNG image into 3 different sizes + @2x versions for each
# Sizes: 158x344 (small), 212x461 (medium), 295x644 (large)

# Check if an image file was provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <input_image.png>"
    exit 1
fi

INPUT_IMAGE="$1"

# Check if the input file exists
if [ ! -f "$INPUT_IMAGE" ]; then
    echo "Error: File '$INPUT_IMAGE' not found!"
    exit 1
fi

# Check if the input file is a PNG
if [[ ! "$INPUT_IMAGE" =~ \.png$ ]]; then
    echo "Error: Input file must be a PNG image!"
    exit 1
fi

# Get the base filename without extension
BASENAME=$(basename "$INPUT_IMAGE" .png)
DIRNAME=$(dirname "$INPUT_IMAGE")

# Define the sizes with their labels
declare -a SIZES=(
    "158:344:small"
    "212:461:medium"
    "296:644:large"
)

echo "Resizing image: $INPUT_IMAGE"
echo "Output directory: $DIRNAME"
echo ""

# Process each size
for SIZE_CONFIG in "${SIZES[@]}"; do
    WIDTH=$(echo $SIZE_CONFIG | cut -d: -f1)
    HEIGHT=$(echo $SIZE_CONFIG | cut -d: -f2)
    LABEL=$(echo $SIZE_CONFIG | cut -d: -f3)
    
    # Calculate @2x dimensions
    WIDTH_2X=$((WIDTH * 2))
    HEIGHT_2X=$((HEIGHT * 2))
    
    # Generate output filenames
    OUTPUT_1X="${DIRNAME}/${BASENAME}_${LABEL}.png"
    OUTPUT_2X="${DIRNAME}/${BASENAME}_${LABEL}@2x.png"
    
    # Create 1x version
    echo "Creating ${LABEL} (${WIDTH}x${HEIGHT})..."
    sips -z $HEIGHT $WIDTH "$INPUT_IMAGE" --out "$OUTPUT_1X" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "  ✓ Created: $OUTPUT_1X"
    else
        echo "  ✗ Failed to create: $OUTPUT_1X"
    fi
    
    # Create @2x version
    echo "Creating ${LABEL}@2x (${WIDTH_2X}x${HEIGHT_2X})..."
    sips -z $HEIGHT_2X $WIDTH_2X "$INPUT_IMAGE" --out "$OUTPUT_2X" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "  ✓ Created: $OUTPUT_2X"
    else
        echo "  ✗ Failed to create: $OUTPUT_2X"
    fi
    
    echo ""
done

echo "Resizing complete!"