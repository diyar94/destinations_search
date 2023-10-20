import {Spin} from 'antd';
import {useRequest} from 'ahooks';
import {apiGet, apiUrl} from '@/api';
import {useEffect, useState} from 'react';
import {findNearbyLocations} from '@/utils/haversineDistance';
import {isEmptyObject} from '@/utils/isEmptyObject';
import {DataItem} from '@/types';


export const NearbyLocations = ({selectedCountry, handleTagClick}) =>
{
    const [nearByCountries, setAllCountries] = useState([]);
    const {data, loading, run: getAllCountries} = useRequest(() => apiGet(`${apiUrl}`),
        {manual: true, cacheKey: 'places'});

    useEffect(() =>
    {
        if (!isEmptyObject(selectedCountry))
        {
            getAllCountries();
        }

    }, [selectedCountry]);

    useEffect(() =>
    {
        if (data)
        {
            const nearBy = findNearbyLocations(selectedCountry.latitude, selectedCountry.longitude, data as unknown as DataItem[]);
            setAllCountries(nearBy);
        }
    }, [data]);


    return loading ? <div className={'loading'}><Spin size={'large'}/></div> : <div onClick={handleTagClick} className={'nearby-locations'}>
        {nearByCountries.map(country => <div className={'nearby-locations-tag'}
                                             data-country={JSON.stringify(country)}
                                             key={country.id}>
            {country.name}
        </div>)}
    </div>;
};
