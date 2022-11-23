import { Router } from "express";
import {
    listAction,
    removeAction,
    formAction,
    getOneAction,
    saveAction,
} from './controller.js'

const router = Router();

router.get('/', listAction);
router.get('/delete/:id?', removeAction);
router.get('/form/:id?', formAction);
router.get('/:id?', getOneAction);
router.post('/save', saveAction);

export { router }

