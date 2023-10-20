import {readFileSync} from 'fs';
import {DataItem} from '@/types';
import {findNearbyLocations} from './utils/findNearbyLocations';

// this will behave as a handler for requests
/*
* Request from FE must be sent to /api/places?search={searchQuery}
*/
export default {
    'GET /api/places': (req, res) =>
    {
        // reading mock data
        const dataRaw = readFileSync('mock/data.json', 'utf-8');
        const {query} = req;
        const {search} = query;

        try
        {
            let data = JSON.parse(dataRaw);


            if (search)
            {
                // countries that match our `${searchQuery}`
                const rx = new RegExp(search, 'igu');
                data = data.filter((el: DataItem) => el.name.match(rx));
            }
            // no searchQuery returns all countries used to get nearbyCountries
            res.status(200).json(data);
        }
        catch (e)
        {
            res.status(400).json({
                error: {
                    message: e.message
                }
            });
        }

    },
    'POST /api/places/nearby': (req, res) =>
    {
        const {query} = req;
        const dataRaw = readFileSync('mock/data.json', 'utf-8');
        const {latitude, longitude} = req.body;
        try
        {
            let nearby: DataItem[] = [];
            if (latitude && longitude)
            {
                 nearby = findNearbyLocations(latitude, longitude, JSON.parse(dataRaw));
            }
            res.status(200).json({
                message: 'all good for nearby',
                nearCountries: nearby
            });


        }
        catch (e)
        {
            res.status(400).json({
                error: {
                    message: e.message
                }
            });
        }

    }
};
