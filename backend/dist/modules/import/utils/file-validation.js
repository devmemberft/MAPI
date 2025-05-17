"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerExcelOptions = exports.excelFileFilter = void 0;
const common_1 = require("@nestjs/common");
const excelFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new common_1.BadRequestException('Only .xlsx or .xls files are allowed'), false);
    }
    callback(null, true);
};
exports.excelFileFilter = excelFileFilter;
exports.multerExcelOptions = {
    fileFilter: exports.excelFileFilter,
};
//# sourceMappingURL=file-validation.js.map