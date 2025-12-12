import { Router } from 'express';
import { ChapterController }  from '../controllers/ChapterController';

const router = Router();

    router.post('/create', ChapterController.createChapter);
    router.get('/getAll', ChapterController.getAllChapters);
    router.get('/:mangaId/getOneChapter/:chapterId', ChapterController.getChapterById);
    router.patch('/:mangaId/updateChapter/:chapterId' , ChapterController.updateChapter);
    router.delete('/:mangaId/deleteChapter/:chapterId' , ChapterController.deleteChapter);
    
export default router;