FROM openjdk:24-jdk-slim
WORKDIR /app
COPY . /app
ENTRYPOINT [ "/bin/sh", "-c", "javac /app/code.java && java -cp /app code" ]