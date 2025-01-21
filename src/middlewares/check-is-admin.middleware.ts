import { Response, NextFunction, Request } from "express";
import { IExtendedAdminRequest } from "../interfaces/request.interface";
import { verifyAccessToken } from "../utils/jwt";
import { getBearerToken } from "../utils/request.utils";
import AdminRepository from "../repositories/AdminRepository";
import AccessTokenNotFoundException from "../exceptions/middlewares/AccessTokenNotFoundException";
import InvalidAccessTokenProvidedException from "../exceptions/middlewares/InvalidAccessTokenProvidedException";
import { IAdmin } from "../interfaces/models/admin.interface";



export default async function checkIsAdmin(req: Request | IExtendedAdminRequest, res: Response, next: NextFunction) {
    try {
        const token = getBearerToken(req);
        if (!token) throw new AccessTokenNotFoundException();
        let { _id } = verifyAccessToken(token);
        let admin = await (new AdminRepository()).findById(_id);
        if (!admin)throw new InvalidAccessTokenProvidedException();
        const extendedRequest: IExtendedAdminRequest = req;
        const requestAdmin: IAdmin = admin;
        extendedRequest.admin = requestAdmin;
        next();
    } catch (err) {
        next(err);
    }

}