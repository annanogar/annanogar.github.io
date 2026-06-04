find . -type f -name "*.jpg" ! -name "*_1x1.jpg" ! -name "*_2x1.jpg" ! -name "*_3x1.jpg" | while read -r file; do
    # Get dimensions
    width=$(magick identify -format "%w" "$file")
    height=$(magick identify -format "%h" "$file")

    if [ -n "$width" ] && [ -n "$height" ] && [ "$height" -ne 0 ]; then
        # Calculate the current floating-point ratio
        current_ratio=$(echo "scale=4; $width / $height" | bc)

        # Determine the closest target ratio
        closest_ratio=1
        min_diff=$(echo "scale=4; if (($current_ratio - 1) < 0) -1*($current_ratio - 1) else ($current_ratio - 1)" | bc)

        for target in 2 3; do
            diff=$(echo "scale=4; if (($current_ratio - $target) < 0) -1*($current_ratio - $target) else ($current_ratio - $target)" | bc)
            if (( $(echo "$diff < $min_diff" | bc -l) )); then
                min_diff=$diff
                closest_ratio=$target
            fi
        done

        # Crop to the closest target ratio centered (-gravity center)
        echo "Cropping $file (${width}x${height}) to ${closest_ratio}:1..."
        magick "$file" -gravity center -crop "${closest_ratio}:1" +repage "$file"
        
        # Rename the file to match your new system
        mv "$file" "${file%.jpg}_${closest_ratio}x1.jpg"
    fi
done

