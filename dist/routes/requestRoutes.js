"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestController_1 = require("../controllers/requestController");
const router = express_1.default.Router();
router.post('/', requestController_1.createRequest);
router.post('/:id/in-progress', requestController_1.takeRequestInProgress);
router.post('/:id/complete', requestController_1.completeRequest);
router.post('/:id/cancel', requestController_1.cancelRequest);
router.get('/', requestController_1.getRequestList);
router.post('/cancel-in-progress', requestController_1.cancelInProgressRequests);
exports.default = router;
