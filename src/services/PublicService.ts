import NftTypeRepository from "../repositories/NftTypeRepository";
import Service from "./Service";
import { relations as nftTypesRelations } from "../models/nft-type.model";
import NftRoundValueRepository from "../repositories/NftRoundValueRepository";
import { calculateDurationTillNowInSeconds } from "../utils/time";
import { INftTypeExtendedForInitialSalesPage } from "../interfaces/models/nft-types.interface";
import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import { INft, INftExtendedForInitialSalesPage } from "../interfaces/models/nft.interface";

export default class PublicService extends Service {

    constructor(
        private nftTypeRepository = new NftTypeRepository(),
        private nftRoundValueRepository = new NftRoundValueRepository(),
        private firstRoundLadingRepository = new NftRoundValueRepository(),
    ) {
        super();
    }

    public async prepareInitialSalesPageParams(ip: string): Promise<INftTypeExtendedForInitialSalesPage[]> {

        const [nftTypes, roundValues] = await Promise.all([ 
            this.nftTypeRepository.applyPipeline([
                nftTypesRelations.withNfts,
                nftTypesRelations.withLatestRound,
            ]),
            this.nftRoundValueRepository.findAll(),
        ]);

        

        const params = nftTypes.map((nftType: INftTypeExtendedForInitialSalesPage): INftTypeExtendedForInitialSalesPage => {
            const activeRound = nftType.latestRound;
            const nfts = nftType.nfts.map((nft: INft): INftExtendedForInitialSalesPage => { 
                const roundValue = activeRound ? roundValues.find(
                    (roundValue: INftRoundValue): boolean =>
                        roundValue.nft_id === nft._id && roundValue.round_id === activeRound._id
                ) : null;

                return {
                    ...nft,
                    roundValue, 
                };
            });

            return {
                ...nftType,
                activeRound,  
                nfts,
            };
        });

        await Promise.all(
            params.map(async (param: INftTypeExtendedForInitialSalesPage): Promise<void> => {
                if (param.activeRound) {
                    const firstRoundLanding = await this.firstRoundLadingRepository.findOrCreate({
                        ip,
                        round_id: param.activeRound._id,
                    });
                    const consumedTime = firstRoundLanding.createdAt
                        ? calculateDurationTillNowInSeconds(firstRoundLanding.createdAt)
                        : 0;
                    param.consumedTime = consumedTime;
                }
            })
        );

        return params;
    }
}