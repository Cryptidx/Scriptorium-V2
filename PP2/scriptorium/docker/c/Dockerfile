FROM gcc:14.2
WORKDIR /app
COPY . /app
ENTRYPOINT /bin/sh -c "gcc /app/code.c -o /app/code.out && /app/code.out"