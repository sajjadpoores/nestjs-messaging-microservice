import * as path from 'path';
import * as fs from 'fs';

export function generateDestination(req, file, cb) {
  const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  cb(null, uploadPath);
}
