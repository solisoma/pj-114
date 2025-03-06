export declare class UploadService {
    constructor();
    getUploadMiddleware(location: string, multerFields: {
        name: string;
        maxCount: number;
    }[], formats: string[]): (req: any, res: any) => Promise<void>;
}
