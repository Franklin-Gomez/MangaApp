import { Router } from 'express';
import { MangaController }  from '../controllers/MangaController';

const router = Router();

    router.post('/create', MangaController.createManga);
    router.get('/getAll', MangaController.getMangaList);
    router.get('/getforId/:id', MangaController.getMangaById);
    router.get('/updateManga/:id' , MangaController.updateManga);
    router.get('/deleteManga/:id' , MangaController.deleteManga);

export default router;