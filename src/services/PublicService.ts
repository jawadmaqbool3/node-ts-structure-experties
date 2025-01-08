import { Document } from "mongoose";
import NftTypeRepository from "../repositories/NftTypeRepository";
import Service from "./Service";
import { relations as nftTypesRelations } from "../models/nft-type.model";
import NftRoundValueRepository from "../repositories/NftRoundValueRepository";
import { calculateDurationTillNowInSeconds } from "../utils/time";

export default class PublicService extends Service {

    constructor(
        private nftTypeRepository = new NftTypeRepository(),
        private nftRoundValueRepository = new NftRoundValueRepository(),
        private firstRoundLadingRepository = new NftRoundValueRepository(),
    ) {
        super();
    }

    public async getInitialSalesPageParams(): 
    Promise<any>
    // Promise<Document[]>
     {

        const nftTypes = await this.nftTypeRepository.applyPipeline([
            nftTypesRelations.withNfts,
            nftTypesRelations.withLatestRound,
        ]);

        const roundValues = await this.nftRoundValueRepository.findAll();

        const params = [];
        for (const nftType of nftTypes) {

            const activeRound = nftTypes[0] ? nftTypes[0].latest_round : null;


            const nfts = [];

            for (const nft of nftType.nfts) {

                const currentRoundValue = roundValues.find(roundValue => roundValue.nft_id === nft._id && roundValue.round_id === activeRound._id);

                nfts.push({
                    _id: nft._id,
                    name: nft.name,
                    booths: nft.booths,
                    contract_address: nft.contract_address,
                    round_values: currentRoundValue
                });


            }

            params.push({
                _id: nftType._id,
                name: nftType.name,
                active_round: activeRound,
                nfts: nfts
            });

        }

        // for (let index = 0; index < nftTypes.length; index++) {
        //     let timeConsumed = 0;

        //     const nftType = nftTypes[index];

        //     if (nftType.active_round) {

        //         const firstRoundLanding = await this.firstRoundLadingRepository.findOrCreate({ ip, round_id: nftType.active_round._id });

        //         const initialTime = firstRoundLanding.createdAt;

        //         timeConsumed = initialTime ? calculateDurationTillNowInSeconds(initialTime) : 0;

        //     }

        //     nftTypes[index].time_consumed = timeConsumed;
        // }

        return params;
    }
}