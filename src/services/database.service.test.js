import { describe, it, expect, vi, beforeEach } from "vitest";
import { dbRestauration } from "./database.service";
import { restoreDatabase } from "../repositories/database.repository.js";

vi.mock('../repositories/database.repository.js');

describe('Database Service', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('dbRestauration', () => {

        it('Debería limpiar y rellenar la base de datos con el mockData', async () => {

            vi.mocked(restoreDatabase).mockResolvedValue(1);
            const restoredDB = await dbRestauration();

            expect(restoreDatabase).toHaveBeenCalledOnce();
            expect(restoredDB).toBe(1);

        })
    })
})