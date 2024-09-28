export function generateFileName(req, file, cb) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
}
