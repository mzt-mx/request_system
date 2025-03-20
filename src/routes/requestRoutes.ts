import express from 'express';
import { 
    createRequest, 
    takeRequestInProgress, 
    completeRequest, 
    cancelRequest, 
    getRequestList,
    cancelInProgressRequests 
} from '../controllers/requestController';

const router = express.Router();

router.post('/', createRequest);
router.post('/:id/in-progress', takeRequestInProgress);
router.post('/:id/complete', completeRequest);
router.post('/:id/cancel', cancelRequest);
router.get('/', getRequestList);
router.post('/cancel-in-progress', cancelInProgressRequests);

export default router;
