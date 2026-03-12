import { Router } from 'express';
import { ChapterController }  from '../controllers/ChapterController';
import { upload } from '../middleware';

const router = Router();

    router.post('/create', upload.array('pages') ,  ChapterController.createChapter);
    router.get('/:mangaId/getAllChapter', ChapterController.getAllChapters);
    router.get('/:mangaId/getOneChapter/:chapterId', ChapterController.getChapterById);
    router.patch('/:mangaId/updateChapter/:chapterId' , ChapterController.updateChapter);
    router.delete('/:mangaId/deleteChapter/:chapterId' , ChapterController.deleteChapter);
    
export default router;