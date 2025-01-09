import Service from "./Service";
import TrunkHolderRepository from "../repositories/TrunkHolderRepository";

export default class TrunkHolderService extends Service {

    /**
     * Constructor for TrunkHolderService
     * 
     * @param {TrunkHolderRepository} trunkHolderRepository - The repository to interact with trunk holder data
     */

    /**
     * Constructor for TrunkHolderService
     * 
     * @param {TrunkHolderRepository} [trunkHolderRepository = new TrunkHolderRepository()] - The repository to interact with trunk holder data
     */
    constructor(
        private trunkHolderRepository = new TrunkHolderRepository(),
    ) {
        super();
    }

    isTrunkHolder(wallet_address: string): Promise<boolean> {
        return this.trunkHolderRepository.isTrunkHolder(wallet_address);
    }
}