import jsonwebtoken from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';

const jwt = {
  signAccessToken(payload: { email:string, name:string }) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign({ payload }, accessTokenSecret, {}, (err: unknown, token: unknown) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, accessTokenSecret, (err: any, payload: unknown) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
    });
  },
};
export default jwt;
