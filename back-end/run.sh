#!/bin/bash

# Step 1: Build the project
echo "📦 Building the project..."
./mvnw clean package -DskipTests

# Step 2: Run the JAR with environment variables
echo "🚀 Running the application..."
SPRING_DATASOURCE_URL="jdbc:postgresql://db.rzyewzzhgowrtrqqlksm.supabase.co:5432/postgres?sslmode=require" \
SPRING_DATASOURCE_USERNAME="postgres" \
SPRING_DATASOURCE_PASSWORD="DavidsPoolIsNice1234" \
java -jar target/pool-1.0.0.jar