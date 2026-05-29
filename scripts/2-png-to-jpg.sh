find . -type f -name "*.png" -exec sh -c 'for f; do magick "$f" "${f%.png}.jpg" && rm "$f"; done' _ {} +

