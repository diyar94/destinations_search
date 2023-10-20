import {Card} from 'antd';
import {DestinationDetails} from '@/components/DestinationDetails';
import {NearbyLocations} from '@/components/NearbyLocations';
import {useAtom} from 'jotai';
import {selectedCountryAtom} from '@/atoms/selectedCountryAtom';
import DestinationSearch from '@/components/DestinationSearch';
import {isEmptyObject} from '@/utils/isEmptyObject';
import {DataItem} from '@/types';

const Page = () =>
{
    const [selectedCountryAtomValue, setSelectedCountryAtom] = useAtom(selectedCountryAtom);

    const handleTagClick = e =>
    {
        const dataRaw = e.target.getAttribute('data-country');
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
                <div className={'card-container-nearby'}>Nearby Locations: </div>
                <NearbyLocations selectedCountry={selectedCountryAtomValue}
                                 handleTagClick={handleTagClick}/>
            </>
            }
        </Card>
    </div>;

};

export default Page;

