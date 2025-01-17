import { Response, NextFunction, Request } from "express";
import { IExtendedCustomerRequest } from "../interfaces/request.interface";



export default function checkCustomer(req: Request | IExtendedCustomerRequest, res: Response, next: NextFunction) {
    // try {
    //     if (
    //       req.headers.authorization &&
    //       req.headers.authorization.startsWith("Bearer")
    //     ) {
    //       token = req.headers.authorization.split(" ")[1];
    //     } else if (req.cookies.auth) {
    //       token = req.cookies.auth;
    //     }
    //     let { _id } = jwt.verify(token, process.env.JWT_SECRET);
    
    //     let customer = await Models.Customer.findOne({ _id });
    //     if (!customer) {
    //       // return res.status(400).json({
    //       //   success: false,
    //       //   message: "Customer is Not Logged In",
    //       // });
    //       req.customer = { _id: new ObjectId(), first_name: "", email: "" }
    //       next();
    //     } else {
    //       // if (!customer.active) {
    //       //   return res.status(400).json({
    //       //     success: false,
    //       //     message: "Your Account is Deactivated",
    //       //   });
    //       // }
    
    //       req.customer = customer;
    
    //       next();
    //     }
    
    //   } catch (err) {
    //     // return res.status(400).json({
    //     //   success: false,
    //     //   message: "Not Logged In",
    //     // });
    //     req.customer = { _id: new ObjectId(), first_name: "", email: "" }
    //     next();
    //   }

}