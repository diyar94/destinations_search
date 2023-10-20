import {Card} from 'antd';
import {DestinationDetails} from '@/components/DestinationDetails';
import {NearbyLocations} from '@/components/NearbyLocations';
import {useAtom} from 'jotai';
import {selectedCountryAtom} from '@/atoms/selectedCountryAtom';
import DestinationSearch from '@/components/DestinationSearch';
import {isEmptyObject} from '@/utils/isEmptyObject';
import {DataItem} from '@/types';
import React from 'react';

const Page = () =>
{
    const [selectedCountryAtomValue, setSelectedCountryAtom] = useAtom(selectedCountryAtom);
    const handleTagClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
    {
        const target = e.target as HTMLElement;

        const dataRaw = target.getAttribute('data-country');
        if (dataRaw)
        {
            const dataJson = JSON.parse(dataRaw);
            setSelectedCountryAtom(dataJson);
        }
    };

    return <div className={'card-container'}>
        <Card className={'card'}>
            <DestinationSearch/>
            {!isEmptyObject(selectedCountryAtomValue) && <>
                <DestinationDetails country={selectedCountryAtomValue as DataItem}/>
                <div className={'card-container-nearby'}>Nearby Locations:</div>
                <NearbyLocations selectedCountry={selectedCountryAtomValue as DataItem}
                                 handleTagClick={handleTagClick}/>
            </>
            }
        </Card>
    </div>;

};
export default Page;

