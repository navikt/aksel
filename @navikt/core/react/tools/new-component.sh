#!/bin/bash


TEMPLATE_DIR="$(pwd)/tools/.templates"
COLOR_RED='\033[0;31m'
CLEAR='\033[0m'
WELCOME=$(cat "$TEMPLATE_DIR/welcome.txt")
echo -e "${COLOR_RED}$WELCOME${CLEAR}"

read -p "Enter component name: " COMPONENT_NAME
read -p "Enter folder name (none for lowercase of component name): " FOLDER_NAME

# If folder name is not defined, use lowercase of component name
if [ -z "$FOLDER_NAME" ]; then
	FOLDER_NAME=$(echo "$COMPONENT_NAME" | tr '[:upper:]' '[:lower:]')
fi

# Exit if none of these are defined
if [ -z "$FOLDER_NAME" ] || [ -z "$COMPONENT_NAME" ]; then
	echo "You must enter a folder name and a component name"
	exit 1
fi

ROOT_DIR=$(pwd)/src/$FOLDER_NAME

REPLACE_PATTERN_FOLDER_NAME=s/"<FOLDER_NAME>"/$FOLDER_NAME/g
REPLACE_PATTERN_COMPONENT_NAME=s/"<COMPONENT_NAME>"/$COMPONENT_NAME/g







mkdir $ROOT_DIR

cd $ROOT_DIR

replace()  {
		sed "$REPLACE_PATTERN_FOLDER_NAME" "$1" | sed "$REPLACE_PATTERN_COMPONENT_NAME"  > "$2"
}
# Creates the component 
replace "$TEMPLATE_DIR/component.txt" "$COMPONENT_NAME.tsx"

# Creates the stories file
replace "$TEMPLATE_DIR/index.txt" "index.ts"

# Creates the index file
replace "$TEMPLATE_DIR/stories.txt" "$FOLDER_NAME.stories.tsx"

# Append the export in the components barrel file
echo "export * from './$FOLDER_NAME';" >> "../index.ts"

echo "Successfully created the component $COMPONENT_NAME in $ROOT_DIR"

