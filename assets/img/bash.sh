count=1
for file in *.jpg; do
    newname=$(printf "%03d.jpg" $count)
    mv "$file" "$newname"
    ((count++))
done