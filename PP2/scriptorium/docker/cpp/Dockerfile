FROM gcc:14.2
WORKDIR /app
COPY . /app
ENTRYPOINT /bin/sh -c "g++ /app/code.cpp -o /app/code.out && /app/code.out"