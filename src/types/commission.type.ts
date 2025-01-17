import { ICustomer } from "../interfaces/models/customer.interface";


export type TParentAndGrandParent = {
  parent: ICustomer | null,
  grandParent: ICustomer | null
}
