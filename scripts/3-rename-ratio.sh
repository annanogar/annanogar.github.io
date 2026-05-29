find . -type f -name "*.jpg" | while read -r file; do
    # Skip files that already have the suffixes appended
    if [[ "$file" =~ _1x1\.jpg$|_2x1\.jpg$|_3x1\.jpg$ ]]; then continue; fi

    # Get width and height using sips
    width=$(sips -g pixelWidth "$file" | awk '/pixelWidth/ {print $2}')
    height=$(sips -g pixelHeight "$file" | awk '/pixelHeight/ {print $2}')

    # Ensure dimensions were read properly
    if [ -n "$width" ] && [ -n "$height" ] && [ "$height" -ne 0 ]; then
        # Check ratios (Width divided by Height)
        if [ "$width" -eq "$height" ]; then
            mv "$file" "${file%.jpg}_1x1.jpg"
        elif [ $((width / height)) -eq 2 ] && [ $((width % height)) -eq 0 ]; then
            mv "$file" "${file%.jpg}_2x1.jpg"
        elif [ $((width / height)) -eq 3 ] && [ $((width % height)) -eq 0 ]; then
            mv "$file" "${file%.jpg}_3x1.jpg"
        fi
    fi
done

