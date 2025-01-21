import { NODE_ENV } from "../constants/env.constant";
import { ApplicationModes } from "../enums/application-modes.enum";

export const isDevMode: boolean = (NODE_ENV === ApplicationModes.DEV);
