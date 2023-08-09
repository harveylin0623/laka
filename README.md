# 專安名稱
```

```

## node js版本
```
18.16.0
```

## init
```sh
cp .env.production
```

## deploy
```sh
npm install

# build ....
npm run build

# nginx 配置(只有在production環境下設置)
location / {
  index index.html index.htm;
  try_files $uri $uri/ /index.html;
}
```

## local start
```sh
npm install

npm run dev
```