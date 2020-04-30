import Cookies from 'js-cookie';

import { SuccessResponse, FailResponse } from '../../services/CallResponses';
import { authApi } from '../../services/api';

export const loginCall = async ({email, password, rememberMe}) => {
  try {
    const response = await authApi().post('/login', { email, password });
    const token = response.data.access_token; 
    if(rememberMe) Cookies.set('JWT',token, { expires: 365 });
    else Cookies.set('JWT',token); // Session cookie
    return SuccessResponse(token);
  }
  catch(e)
  {
    return FailResponse(['Invalid login']);
  }
};

