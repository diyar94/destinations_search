import {Spin} from 'antd';
import {useRequest} from 'ahooks';
import {apiPost, apiUrl} from '@/api';
import {useEffect, useState} from 'react';
import {isEmptyObject} from '@/utils/isEmptyObject';


export const NearbyLocations = ({selectedCountry, handleTagClick}) =>
{
    const [nearByCountries, setAllNearByCountries] = useState([]);
    const {data, loading, run: getNearbyCountries} = useRequest(
        (payload: Record<string, any>) => apiPost(`${apiUrl}/nearby`, {
            getResponse: true,
            data: payload},),
        {manual: true, cacheKey: 'places'});

    useEffect(() =>
    {
        if (!isEmptyObject(selectedCountry))
        {
            const values = {
                latitude: selectedCountry.latitude,
                longitude: selectedCountry.longitude
            }
            getNearbyCountries(values);
        }

    }, [selectedCountry]);

    useEffect(() =>
    {
        if (data)
        {
            const {nearCountries} = data.data;
            setAllNearByCountries(nearCountries);
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
