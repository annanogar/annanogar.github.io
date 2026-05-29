find . -type f -iname "*.jpeg" -exec sh -c 'for f; do mv "$f" "${f%.*}.jpg"; done' _ {} +
