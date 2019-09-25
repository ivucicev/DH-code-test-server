import Router from 'express';
import { signUp, signIn, signOut } from '../actions/auth';
import { authorization } from '../middleware/authorization';
import { encodeSequence } from '../actions/encode';

export const apiRoutes = Router();

// region - user
apiRoutes.post('/sign-up', signUp);
apiRoutes.post('/sign-in', signIn);
apiRoutes.patch('/sign-out', signOut);

// region encoder
apiRoutes.post('/encode', authorization, encodeSequence);
