"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerExcelOptions = exports.FileFilterExcel = void 0;
const FileFilterExcel = (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new Error('Only .xlsx files are allowed'), false);
    }
    callback(null, true);
};
exports.FileFilterExcel = FileFilterExcel;
exports.multerExcelOptions = {
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: exports.FileFilterExcel,
};
//# sourceMappingURL=file-validation.js.map