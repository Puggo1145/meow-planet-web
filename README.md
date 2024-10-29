# 猫猫星球 Web

这是一个使用 [Next.js](https://nextjs.org) 构建的猫猫星球 Web 应用。

## 技术栈

- **框架**: [Next.js 14](https://nextjs.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI组件**: [shadcn/ui](https://ui.shadcn.com/)
- **状态管理**: [Zustand](https://zustand-demo.pmnd.rs/)
- **后端服务**: [Appwrite](https://appwrite.io/)
- **表单处理**: [React Hook Form](https://react-hook-form.com/)
- **类型检查**: [TypeScript](https://www.typescriptlang.org/)

## 核心功能设计

### 用户认证

用户认证使用 Zustand 进行状态管理，结合 Appwrite 的认证服务实现。

#### 状态管理 (`store/use-user.ts`)

```typescript
type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface UserState {
  user: Models.User<Models.Preferences> | null
  status: AuthStatus
  error: Error | null
  
  initialize: () => Promise<void>    // 初始化用户状态
  fetchUser: () => Promise<void>     // 获取用户信息
  setUser: (user: User | null) => void  // 设置用户信息
  logout: () => Promise<void>        // 用户登出
}
```

#### 认证流程

1. **应用初始化**
   - 通过 `UserProvider` 在应用根级别初始化用户认证状态
   - 确保所有子组件都能访问到认证状态

2. **状态同步**
   - 登录成功后自动更新用户状态
   - 登出时清除用户信息
   - 认证状态改变时自动重定向到相应页面

3. **使用示例**

```typescript
// 在组件中使用
const { user, status } = useUserStore()

// 处理登录
const handleLogin = async () => {
  await login()
  await fetchUser()
}

// 处理登出
const handleLogout = async () => {
  await logout()
}
```

## 开发指南

### 环境配置

1. 克隆项目并安装依赖:

```bash
git clone <repository-url>
cd meow-planet
npm install
```

2. 配置环境变量:

创建 `.env.local` 文件并添加必要的环境变量:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

3. 启动开发服务器:

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
meow-planet/
├── app/                    # Next.js 应用路由
├── components/            # 可复用组件
│   ├── providers/        # 全局 providers
│   └── ui/               # UI 组件
├── store/                # Zustand 状态管理
├── lib/                  # 工具函数和配置
└── public/               # 静态资源
```

## 部署

项目可以部署到任何支持 Next.js 的平台。推荐使用 [Vercel](https://vercel.com)。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

[MIT](LICENSE)