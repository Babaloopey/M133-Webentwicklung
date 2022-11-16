import { Router } from "express";
import {
    listAction,
    removeAction,
    formAction,
    saveAction,
} from './controller.js'

const router = Router();

router.get('/', listAction);
router.get('/delete/id', removeAction);
router.get('/form/:id?', formAction);
router.get('/save', saveAction);

export { router }

