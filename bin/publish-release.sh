#!/bin/sh
set -e

source ./bin/generate-npm-tag.sh

# Check npm tag looks as expected
# https://npm.github.io/publishing-pkgs-docs/updating/using-tags.html#publishing-with-tags
echo "This will publish the package with the following npm tag:"
echo $NPM_TAG
echo " "

read -r -p "Does this look correct? [y/N] " continue_prompt

if [[ $continue_prompt != 'y' ]]; then
    read -r -p "What should the npm tag be: " NPM_TAG
fi

echo "Starting a release..."
echo " "
echo "This will:"
echo "- check that you're logged in to npm as the correct user"
echo "- publish the package to npm if it has not been published already"
echo "- tag the package on npm with '$NPM_TAG'"
echo "- check that there is not already a Github tag published"
echo "- create a new Github tag"
echo "- push the Github tag to remote origin"
echo "- create a zip file of the 'dist/' directory locally"
echo " "

read -r -p "Do you want to continue? [y/N] " continue_prompt

if [[ $continue_prompt != 'y' ]]; then
    echo "Cancelling release, if this was a mistake, try again and use 'y' to continue."
    exit 0
fi


echo "📦  Publishing package..."

NPM_ARGS=( --workspace @cautionyourblast/govuk-frontend )
[ $NPM_TAG = "latest" ] || NPM_ARGS+=( --tag $NPM_TAG )

# Try publishing
npm publish "${NPM_ARGS[@]}"
echo "🗒 Package published!"

# Extract tag version from ./packages/govuk-frontend/package.json
ALL_PACKAGE_VERSION=$(npm run version --silent --workspace @cautionyourblast/govuk-frontend)
TAG="v$ALL_PACKAGE_VERSION"

if [ $(git tag -l "$TAG") ]; then
    echo "⚠️ Tag $TAG already exists"
    exit 1
else
    echo "🗒 Tagging repo using tag version: $TAG ..."
    git tag $TAG -m "GOV.UK Frontend release $TAG"
    git push --tags
    echo "🗒 Tag $TAG created and pushed to remote."

    echo "🗒 Creating a release artifact..."
    git archive -o ./release-$TAG.zip HEAD:dist
    echo "🗒 Artifact created. Now create a release on GitHub and attach this."
fi
