# GitHub Workflow Dev Tools
More instruction: [GitHub Workflow(Actions)开发环境](https://zhuanlan.zhihu.com/p/691842634)  
Note: For AWS related content, assume you have already setup AWS credentials locally.

## Run local workflow using [act](https://github.com/nektos/act)
### Init
```
brew install act colima docker
colima start
```

### Sample commands
```
act -W ./.github/workflows/test.yml
act -W ./.github/workflows/test.yml -j show_inputs
act -W ./.github/workflows/dispatch.yml -e event.json
```

### AWS S3
Prepare `.secrets` locally
```
AWS_ACCESS_KEY_ID=XXXX
AWS_SECRET_ACCESS_KEY=XXXX
```

Using AWS CLI with the default medium docker image from act, you will get Error: aws command not found, because the image doesn't include AWS CLI.
We can build our own image locally based on their image and add AWS CLI.

Prepare the Dockerfile, and run:
```shell
docker build -t ubuntu-aws .
```
Then try:
```
act -P ubuntu-latest=ubuntu-aws --pull=false -W ./.github/workflows/test-aws-s3.yml
```

## Trigger workflow using [GitHub CLI](https://cli.github.com/)
### Init
```
brew install gh
```

### Sample commands
```
gh workflow list
echo '{"env": "prod"}' | gh workflow run dispatch.yml --ref 'v1.3.5'  --json
```

## FAQ
执行act时, 如果之前安装过 Docker Desktop, 会遇到一个Docker的报错. 把`~/.docker/config.json`里的`"credsStore": "desktop"`去掉即可.
