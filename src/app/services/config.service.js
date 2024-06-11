import {Config} from "@/app/models";


export async function getListConfig() {
    const result = await Config.aggregate([]).group({
        _id: null,
        data: {
            $push: {
                type: "$type",
                value: "$value"
            }
        }
    }).project({
        data: {
            $arrayToObject: {
                $map: {
                    input: "$data",
                    as: "item",
                    in: {
                        k: "$$item.type",
                        v: "$$item"
                    }
                }
            }
        }
    });

    return result[0].data;
}

export async function updateConfig(config) {
    const updates = [];

    if (config.MAX_TIME_CANCEL_BOOKING) {
        updates.push({
            updateOne: {
                filter: {type: config.MAX_TIME_CANCEL_BOOKING.type},
                update: config.MAX_TIME_CANCEL_BOOKING
            }
        });
    }

    if (config.TERMS_OF_USE) {
        updates.push({
            updateOne: {
                filter: {type: config.TERMS_OF_USE.type},
                update: config.TERMS_OF_USE
            }
        });
    }

    await Config.bulkWrite(updates);

}
