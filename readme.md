# ScreenshareAPI

.
├── env.example
├── fluxo_api_screenshot_share.excalidraw
├── LICENSE
├── package.json
├── package-lock.json
├── readme.md
├── src
│   ├── configs
│   │   ├── redisConfigs.ts
│   │   ├── supabase.ts
│   │   └── uploadConfigs.ts
│   ├── jobs
│   │   └── cronDeleteExpItem.ts
│   ├── middlewares
│   │   └── errorHandler.ts
│   ├── routes
│   │   └── uploads.routes.ts
│   ├── server.ts
│   ├── services
│   │   ├── createUploadService.ts
│   │   └── getUploadService.ts
│   └── utils
│   └── AppError.ts
└── tsconfig.json

### Tecnologias

- zod
- redis
- supabase
- node-cron
- express
- multer
- typescript

### Do que se trata?

Uma API para compartilhamento de screenshots que desaparecem em 24 horas. Cada foto tem um identificador que garante que apenas as pessoas que receberam o link poderão acessar sua screenshot
