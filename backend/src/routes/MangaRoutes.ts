import { Router } from 'express';
import { MangaController }  from '../controllers/MangaController';
import { upload } from '../middleware';

const router = Router();

    router.post('/create' , upload.single('coverUrl') , MangaController.createManga);
    router.get('/getAll', MangaController.getAllMangas);
    router.get('/getOneManga/:id', MangaController.getMangaById);
    router.patch('/updateManga/:id' , MangaController.updateManga);
    router.delete('/deleteManga/:id' , MangaController.deleteManga);

export default router;