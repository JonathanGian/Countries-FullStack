# Instructions:

1. Plan the Project Structure

Separate the backend and frontend into distinct folders for easy management:

```shell
project-root/
├── backend/   # NestJS application
└── frontend/  # React application
```

2. Initialize the Backend

3. Set Up the Backend (NestJS)

a. Create a NestJS Application

Install the NestJS CLI globally if you haven't already:

```shell
npm install -g @nestjs/cli
```

Create a new NestJS project:

```shell
nest new backend
```

b. Add supabase to the backend

```shell
npm install @supabase/supabase-js
```

c. Add class-validator and class-transformer

```shell
npm install class-validator class-transformer
```

class-validator example:

```typescript
import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

class-transformer example:

```typescript
import { plainToInstance } from "class-transformer";

const plain = { name: "John Doe", email: "john.doe@example.com" };
const user = plainToInstance(CreateUserDto, plain);
```

d. Add environment support

```shell
npm install @nestjs/config
```

e. Configure the env file and add the supabase url and key

```env
SUPABASE_URL=https://your-supabase-instance.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

f. Update app.module.ts to include the config module

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

g. Add cors to the backend for local react development

```typescript
app.enableCors({
  origin: "http://localhost:5180",
  credentials: true,
});
```

4. Set Up the Frontend (React + Vite)

a. Create a new Vite project:

```shell
npm create vite@latest frontend -- --template react-ts
cd frontend
```

b. Install dependencies:

```shell
npm install
```

c. Configure Vite (vite.config.ts):

```typescript
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
  },
});
```

5. Running the Applications

a. Start the backend:

```shell
cd backend
npm run start:dev
```

b. Start the frontend (in a new terminal):

```shell
cd frontend
npm run dev
```

The applications will be available at:

- Frontend: http://localhost:5180
- Backend: http://localhost:5001

6. Development Notes

- The backend includes CORS configuration for the frontend port (5180)
- TypeScript is configured for both frontend and backend
- ESLint and Prettier are set up for code formatting
- Both applications include hot-reload functionality for development
