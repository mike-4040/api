import { CONFIG } from '../constants';

export const appListening = () =>
  console.log(`App listening at http://localhost:${CONFIG.port}`);
