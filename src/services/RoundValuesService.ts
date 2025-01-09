import Service from "./Service";
import NftRoundValueRepository from "../repositories/NftRoundValueRepository";
import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import { TGetRoundValuesParams } from "../types/nft-values.type";

export default class RoundValuesService extends Service {

    /**
     * Constructor
     *
     * @param {NftRoundValueRepository} [nftRoundValueRepository] - nft round value repository
     *
     * @constructor
     */
    constructor(
        private nftRoundValueRepository = new NftRoundValueRepository(),
    ) {
        super();
    }

    /**
     * Finds a RoundValue by its round_id and nft_id. If it doesn't exist, returns null.
     * @param {TGetRoundValuesParams} params - The parameters required to find a RoundValue, including round_id and nft_id.
     * @returns {Promise<INftRoundValue | null>} - A promise that resolves to the found RoundValue, or null if the RoundValue was not found.
     * @throws {MongoError} - If the operation fails, a MongoError is thrown.
     */
    getRoundValues({ round_id, nft_id }: TGetRoundValuesParams): Promise<INftRoundValue | null> {
        return this.nftRoundValueRepository.findOne({ round_id, nft_id });
    }
}