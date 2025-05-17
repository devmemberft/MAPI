import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ClientsModule } from '../clients/clients.module';
import { FullImportStrategy } from './strategies/full-import.strategy';

@Module({
  imports:[ClientsModule],
  controllers: [ImportController],
  providers: [ImportService,FullImportStrategy],
})
export class ImportModule {}
