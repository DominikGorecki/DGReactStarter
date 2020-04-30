import Cookies from 'js-cookie';

import { SuccessResponse, FailResponse } from '../../services/CallResponses';

export const loginCall = async ({email, password, rememberMe}) => {
  await timeout(400);
  if(email === 'test@test.com')
  {
    const token = 'Made up token from FE';
    if(rememberMe) Cookies.set('JWT',token, { expires: 365 });
    else Cookies.set('JWT',token); // Session cookie
    return SuccessResponse(token);
  }
  else 
  {
    return FailResponse(['Invalid login']);
  }
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}