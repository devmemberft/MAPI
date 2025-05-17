import { FullImportStrategy } from './strategies/full-import.strategy';
export declare class ImportService {
    private readonly fullImportStrategy;
    constructor(fullImportStrategy: FullImportStrategy);
    importExcel(buffer: Buffer): Promise<void>;
}
