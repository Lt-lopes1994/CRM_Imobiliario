// Configuração do Neon para consultas diretas (opcional)
import { neon } from "@neondatabase/serverless";

// Para usar em Server Actions ou API Routes
export const sql = neon(process.env.DATABASE_URL!);

// Exemplo de uso:
// const data = await sql`SELECT * FROM users LIMIT 5`;
