find . -type f -name "*.jpg" | while read -r f; do
    # Strip the extension to easily build the new filenames
    base="${f%.jpg}"

    # Handle 1x1 Images
    if [[ "$base" =~ _1x1$ ]]; then
        echo "Processing 1x1: $f"
        magick "$f" -resize 400x400\!   -quality 75 -define webp:method=6 -strip "${base}_400w.webp"
        magick "$f" -resize 640x640\!   -quality 75 -define webp:method=6 -strip "${base}_640w.webp"
        magick "$f" -resize 854x854\!   -quality 75 -define webp:method=6 -strip "${base}_854w.webp"
        magick "$f" -resize 1280x1280\! -quality 75 -define webp:method=6 -strip "${base}_1280w.webp"

    # Handle 2x1 Images
    elif [[ "$base" =~ _2x1$ ]]; then
        echo "Processing 2x1: $f"
        magick "$f" -resize 800x400\!   -quality 75 -define webp:method=6 -strip "${base}_800w.webp"
        magick "$f" -resize 1280x640\!  -quality 75 -define webp:method=6 -strip "${base}_1280w.webp"
        magick "$f" -resize 1707x853\!  -quality 75 -define webp:method=6 -strip "${base}_1707w.webp"
        magick "$f" -resize 2560x1280\! -quality 75 -define webp:method=6 -strip "${base}_2560w.webp"

    # Handle 3x1 Images
    elif [[ "$base" =~ _3x1$ ]]; then
        echo "Processing 3x1: $f"
        magick "$f" -resize 800x267\!   -quality 75 -define webp:method=6 -strip "${base}_800w.webp"
        magick "$f" -resize 1920x620\!  -quality 75 -define webp:method=6 -strip "${base}_1920w.webp"
        magick "$f" -resize 2560x853\!  -quality 75 -define webp:method=6 -strip "${base}_2560w.webp"
        magick "$f" -resize 3840x1280\! -quality 75 -define webp:method=6 -strip "${base}_3840w.webp"
    fi
done

