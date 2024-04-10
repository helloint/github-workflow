FROM catthehacker/ubuntu:act-latest
ARG DEBIAN_FRONTEND=noninteractive

# 更新系统并安装 AWS CLI
RUN apt-get update && \
    apt-get install -y awscli

# 验证 AWS CLI 是否安装成功
RUN aws --version

# 设定默认的工作目录
WORKDIR /app

# 可选：将本地文件复制到容器中，如果有需要可以添加你的文件拷贝指令

# 定义默认的容器启动命令（例如可以启动一个交互式的 shell）
CMD ["/bin/bash"]
