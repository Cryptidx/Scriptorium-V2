#!/bin/bash

# run ./startup.sh
# special thanks to gpt

set -e

# Step 1: Install required packages in the scriptorium directory
echo "Installing npm packages in the scriptorium directory..."
cd scriptorium
npm install

# Step 2: Check for Node.js installation
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found. Please install Node.js before running this script."
    exit 1
fi

# Check for Python installation
# if ! command -v python3 &> /dev/null
# then
#     echo "Python3 could not be found. Please install Python3 to continue."
#     exit 1
# fi

# # Check for C compiler (gcc)
# if ! command -v gcc &> /dev/null
# then
#     echo "GCC (C compiler) could not be found. Please install GCC to continue."
#     exit 1
# fi

# # Check for C++ compiler (g++)
# if ! command -v g++ &> /dev/null
# then
#     echo "G++ (C++ compiler) could not be found. Please install G++ to continue."
#     exit 1
# fi

# # Check for Java compiler (javac)
# if ! command -v javac &> /dev/null
# then
#     echo "Java compiler (javac) could not be found. Please install the Java JDK to continue."
#     exit 1
# fi

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

# docker rmi runtime-java

docker build --no-cache -t runtime-c "$BASE_DIR/docker/c"
docker build --no-cache -t runtime-cpp "$BASE_DIR/docker/cpp"
docker build --no-cache -t runtime-go "$BASE_DIR/docker/go"
docker build --no-cache -t runtime-java "$BASE_DIR/docker/java"
docker build --no-cache -t runtime-javascript "$BASE_DIR/docker/javascript"
docker build --no-cache -t runtime-perl "$BASE_DIR/docker/perl"
docker build --no-cache -t runtime-python "$BASE_DIR/docker/python"
docker build --no-cache -t runtime-ruby "$BASE_DIR/docker/ruby"
docker build --no-cache -t runtime-rust "$BASE_DIR/docker/rust"
docker build --no-cache -t runtime-swift "$BASE_DIR/docker/swift"

docker images

# Step 3: Check for SQLite installation
if ! command -v sqlite3 &> /dev/null
then
    echo "SQLite could not be found. Please install SQLite before running this script."
    exit 1
fi

# Generate a timestamped migration name
MIGRATION_NAME="init_migration$(date +%Y%m%d_%H%M%S)"

# Step 4: Run Prisma migrations (still assuming migrations are in scriptorium)
echo "Running Prisma migrations..."
npx prisma generate
npx prisma migrate dev --name "$MIGRATION_NAME"

# Step 5: Run the script to create the admin user
echo "Creating an admin user..."
node ./seed.js

echo "Startup preparation complete."
