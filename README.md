# "沉浸式翻译" 自定义Workers Ai翻译接口

- 基于[Cloudflare Workers Ai](https://developers.cloudflare.com/workers-ai/models/translation/)实现的[沉浸式翻译-自定义接口](https://immersivetranslate.com/docs/services/custom/)
- 使用模型为:`@cf/meta/m2m100-1.2b`

## 鉴权方式

- 部署时添加环境变量,键名为 `URL_PREFIX`
  - 例如: `URL_PREFIX` = `/translate`
  - 此时API URL填写为https://[Workers域名]/translate

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hidenull/translate-cloudflare-ai)

![image-20231220163155438](./assets/image-20231220163155438.png)

![image-20231220163200124](./assets/image-20231220163200124.png)

