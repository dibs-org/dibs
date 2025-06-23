# Stage 1: Build the JAR using Maven
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copy your project files
COPY . .

# Make the wrapper executable (optional, only if you have ./mvnw)
RUN chmod +x mvnw

# Build the project and install dependencies
RUN ./mvnw clean install -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre AS run
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the app port
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
