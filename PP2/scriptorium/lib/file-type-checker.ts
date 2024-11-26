export function isAllowedFileType(file: { mimetype: any; }, allowedMimeTypes: string | any[]) {
    return allowedMimeTypes.includes(file.mimetype);
  }
  