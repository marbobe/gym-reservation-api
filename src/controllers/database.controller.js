import { dbRestauration } from "../services/database.service.js";

export const restauration = async (req, res) => {
    try {
        await dbRestauration();
        res.status(200).json({ message: 'Base de datos restablecida correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}