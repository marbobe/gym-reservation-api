import { restoreDatabase } from '../repositories/database.repository.js';


/**
 * Reestaura la base de datos con los datos originales del mockData
 * @returns 
 */
export const dbRestauration = async () => {
    return await restoreDatabase();
}