echo "Enter release version: " 

read VERSION

npm --git-tag-version version $VERSION -m "release: v$VERSION"

npm publish --access public

git push origin v$VERSION
