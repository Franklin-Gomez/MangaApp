import { Router } from 'express';
import { UserController} from '../controllers/UserController';

const router = Router();

    router.post('/create', UserController.createUser);

    router.post('/login', UserController.loginUser);

    router.post('/logout', UserController.logoutUser);

    router.get('/profile/:id', UserController.getUserProfile);

    router.patch('/update-profile/:id', UserController.updateUserProfile);

    router.post('/change-password', UserController.changePassword);
    
    router.delete('/deleteProfile/:id', UserController.deleteUser);

export default router;
