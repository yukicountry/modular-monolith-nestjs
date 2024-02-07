FROM node:20.11.1-bullseye-slim

RUN apt update && \
    apt -y install wget procps && \
    wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - && \
    . /root/.bashrc && \
    pnpm config set store-dir /root/.local/share/pnpm/store

# RUN locale-gen ja_JP.UTF-8
# RUN localedef -f UTF-8 -i ja_JP ja_JP
# ENV LANG=ja_JP.UTF-8
# ENV TZ=Asia/Tokyo

WORKDIR /workspace

EXPOSE 5173
EXPOSE 3000
