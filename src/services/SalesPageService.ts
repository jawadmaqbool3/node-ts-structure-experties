import NftTypeRepository from "../repositories/NftTypeRepository";
import Service from "./Service";
import { relations as nftTypesRelations } from "../models/nft-type.model";
import { calculateDurationTillNowInSeconds } from "../utils/time";
import { INftType, INftTypeExtendedForInitialSalesPage } from "../interfaces/models/nft-types.interface";
import FirstRoundLandingRepository from "../repositories/FirstRoundLandingRepository";

export default class SalesPageService extends Service {

    /**
     * Constructor for SalesPageService
     *
     * @param {NftTypeRepository} nftTypeRepository - Repository for NFT types
     * @param {FirstRoundLandingRepository} firstRoundLadingRepository - Repository for first round landings
     */
    constructor(
        private nftTypeRepository = new NftTypeRepository(),
        private firstRoundLadingRepository = new FirstRoundLandingRepository(),
    ) {
        super();
    }

    /**
     * Prepare initial sales page parameters
     *
     * @param {string} ip - ip address of the user
     *
     * @returns {Promise<INftTypeExtendedForInitialSalesPage[]>} - promise that resolves to an array of NftType objects extended with activeRound and consumedTime properties
     */
    public async prepareInitialSalesPageParams(ip: string): Promise<INftTypeExtendedForInitialSalesPage[]> {


        const nftTypes: INftType[] = await this.nftTypeRepository.applyPipeline([
            nftTypesRelations.withNfts,
            nftTypesRelations.withLatestRound,
        ]);

        const params = nftTypes.map((nftType: INftTypeExtendedForInitialSalesPage): INftTypeExtendedForInitialSalesPage => {
            return {
                ...nftType,
                latestRound: nftType.latestRound.length ? nftType.latestRound[0] : null,
            };
        });

        await Promise.all(
            params.map(async (param: INftTypeExtendedForInitialSalesPage): Promise<void> => {
                if (param.latestRound) {
                    const firstRoundLanding = await this.firstRoundLadingRepository.findOrCreate({
                        ip,
                        round_id: param.latestRound._id,
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