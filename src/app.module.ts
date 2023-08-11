import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ExamsModule } from './modules/exams/exams.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PatientModule } from './modules/patient/patient.module';
import { AzureModule } from './modules/azure/azure.module';
import { ConfigModule } from '@nestjs/config';
import { UploadsModule } from './modules/uploads/uploads.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ReportsModule,
    ExamsModule,
    PrismaModule,
    PatientModule,
    AzureModule,
    ConfigModule.forRoot(),
    UploadsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
