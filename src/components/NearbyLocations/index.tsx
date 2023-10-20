import {Spin, Tag} from 'antd';
import {useRequest} from 'ahooks';
import {apiGet} from '@/api';
import {useEffect, useState} from 'react';
import {findNearbyLocations} from '../../../utils/haversineDistance';
import {DataItem} from '../../../mock/fake-api';
import {isEmptyObject} from '@/utils/isEmptyObject';


export const NearbyLocations = ({selectedCountry, handleTagClick}) =>
{
    const [nearByCountries, setAllCountries] = useState([]);
    const {data, loading, run: getAllCountries} = useRequest(() => apiGet(`/api/places`),
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


    return loading ? <Spin size={'large'}/> : <div onClick={handleTagClick} className={'nearby-locations'}>
        {nearByCountries.map(country => <div className={'nearby-locations-tag'}
                                             data-country={JSON.stringify(country)}
                                             key={country.id}>
            {country.name}
        </div>)}
    </div>;
};
