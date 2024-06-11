import {Config, CONFIG_TYPE} from "@/app/models";

const dataConfig = [
    {
        type: CONFIG_TYPE.MAX_TIME_CANCEL_BOOKING,
        value: {
            time: 0,
            limit: 10
        }
    },
    {
        type: CONFIG_TYPE.TERMS_OF_USE,
        value: ""
    }
];

export default async function configSeeder(){
    for (const item of dataConfig) {
        const {type, ...rest} = item;
        await Config.findOneAndUpdate(
            {type},
            {
                $set: {
                    ...rest,
                    type,
                }
            },
            {upsert: true}
        );
    }
}
