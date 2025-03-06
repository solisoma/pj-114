"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("multer");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
let UploadService = class UploadService {
    constructor() { }
    getUploadMiddleware(location, multerFields, formats) {
        if (!fs_1.default.existsSync(location)) {
            fs_1.default.mkdirSync(location, { recursive: true });
        }
        const multerInstance = (0, multer_1.default)({
            storage: (0, multer_2.diskStorage)({
                destination: (_, __, cb) => {
                    cb(null, location);
                },
                filename: (_, file, cb) => {
                    const fileExtName = (0, path_1.extname)(file.originalname);
                    const fileFormat = file.mimetype.split('/')[1];
                    if (!formats.includes(fileFormat)) {
                        return cb(new Error(`Invalid file format. Please upload files in one of the following formats: ${formats.join(', ')}`), undefined);
                    }
                    const randomName = Array(4)
                        .fill(null)
                        .map(() => Math.random().toString(36).substring(2, 15))
                        .join('');
                    cb(null, `${randomName}${fileExtName}`);
                },
            }),
            fileFilter: (_, file, cb) => {
                const fileFormat = file.mimetype.split('/')[1];
                if (!formats.includes(fileFormat)) {
                    return cb(null, false);
                }
                cb(null, true);
            },
            limits: { fileSize: 10 * 1024 * 1024 },
        });
        return (req, res) => {
            return new Promise((resolve, reject) => {
                multerInstance.fields(multerFields)(req, res, (err) => {
                    if (err) {
                        console.error(err);
                        reject(res.status(502).json({ error: err.message }));
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map