import {
  ExpressErrorInterceptor,
  ExpressInterceptor,
  HttpRequest as Request,
  HttpResponse as Response,
  Next,
} from '@cbidigital/heron-express';
import {APIError, HttpResponseUtils, isString} from '@cbidigital/heron-common';
import {StatusCodes} from 'http-status-codes';

export const GlobalApiErrorInterceptor: ExpressErrorInterceptor = (err: Error, req: Request, res: Response, next: Next) => {
  if (err) {
    if (err instanceof APIError) {
      const cin = isString(err.code) ? parseInt(err.code) : err.code;
      return res.status(cin).send(HttpResponseUtils.error(err));
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: err.name,
        message: err.message,
      });
    }
  }
  return next();
};

export const CheckHeaderInterceptor: ExpressInterceptor = (req: Request, res: Response, next: Next) => {
  console.log(req.headers['x-ray-id']);
  return next();
};

export const RouteInterceptor: ExpressInterceptor = (req: Request, res: Response, next: Next) => {
  console.log('route' + req.headers['route' + req.url]);
  return next();
};

export const ControllerInterceptor: ExpressInterceptor = (req: Request, res: Response, next: Next) => {
  console.log('controller' + req.headers['controller' + req.url]);
  return next();
};
