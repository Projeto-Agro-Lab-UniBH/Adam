import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnimalModule } from './modules/animal/animal.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ExamsModule } from './modules/exams/exams.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AnimalModule,
    ReportsModule,
    ExamsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
