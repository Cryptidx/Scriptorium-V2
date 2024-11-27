FROM rust:1.82.0
WORKDIR /app
COPY . /app
ENTRYPOINT /bin/sh -c "rustc /app/code.rs -o /app/code.out && /app/code.out"