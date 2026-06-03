find . -type f -name "*.jpg" ! -name "*_1x1.jpg" ! -name "*_2x1.jpg" ! -name "*_3x1.jpg" | while read -r file; do
    # Get width and height using sips
    width=$(sips -g pixelWidth "$file" | awk '/pixelWidth/ {print $2}')
    height=$(sips -g pixelHeight "$file" | awk '/pixelHeight/ {print $2}')

    # Calculate X:1 ratio using bc for decimals
    if [ -n "$width" ] && [ -n "$height" ] && [ "$height" -ne 0 ]; then
        #ratio=$(echo "scale=2; $width / $height" | bc)
        ratio=$(echo "scale=6; $width / $height" | bc | sed 's/\(\.[0-9]*[1-9]\)0*$/\1/; s/\.0*$//')
        echo "$file - ${width}x${height} - ${ratio}:1"
    fi
done

