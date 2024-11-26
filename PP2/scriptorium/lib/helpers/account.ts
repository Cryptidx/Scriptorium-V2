import bcrypt from 'bcrypt';

// Hash password function helper
export default async function hashPassword(password: string, saltRounds: number) {
    return await bcrypt.hash(password, saltRounds);
  }