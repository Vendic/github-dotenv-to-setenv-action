# Github .env to actions environment variable [![Tests](https://github.com/Vendic/github-dotenv-to-setenv-action/actions/workflows/tests.yml/badge.svg)](https://github.com/Vendic/github-dotenv-to-setenv-action/actions/workflows/tests.yml)
GitHub action to export a .env file to environment variables (via `$GITHUB_ENV`)

### Usage
Create `.env`:
```dotenv
hello=world
foo=bar
bar=foo,bar,baz
```

Use in action:
```yml
jobs:
    read_dot_env:
        name: Read dot env
        runs-on: self-hosted
        steps:
            -   uses: actions/checkout@v2

            -   name: Read dot env
                uses: Vendic/github-dotenv-to-setenv-action@master
                id: dotenv
                with:
                    path: .env

            -   name: Test env
                run: |
                    echo ${{ env.hello }}
```
