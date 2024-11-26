import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import multer from 'multer';
import { authMiddleware } from '@/lib/auth'; 

export const config = {
  api: {
    bodyParser: false,
  },
};

import {AuthRequest, FileUploadRequest, FileUploadResponse} from '@/types/user';

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const runMulter = (req: any, res: any): Promise<void> =>
  new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });

const handler = async (req: FileUploadRequest, res: FileUploadResponse) => {
  if (req.method === 'POST') {
    try {
      // Authenticate the user
      const user = await authMiddleware(req as AuthRequest, res) as number;
      if (!user) return; // Authentication failed, response already sent

      // Use Multer to parse the multipart form data
      await runMulter(req, res);

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const buffer = req.file.buffer;

      // Validate and process the image with sharp
      let processedBuffer;
      try {
        processedBuffer = await sharp(buffer)
          .toFormat('jpeg') // Ensure format matches the detected MIME type
          .toBuffer();
      } catch (error) {
        return res.status(400).json({ error: 'Invalid or corrupted image file' });
      }

      // Save the processed file in a user-specific directory
      const uploadDir = path.join(process.cwd(), 'avatar_uploads', String(req.userId));
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, `uploaded-file-${Date.now()}.jpg`);
      fs.writeFileSync(filePath, processedBuffer);

      res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: `/avatar_uploads/${req.userId}/${path.basename(filePath)}`,
      });
    } catch (error:unknown) {
      res.status(422).json({ error: `Failed to upload file: ${error}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
