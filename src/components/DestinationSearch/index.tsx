import React, {useEffect, useState} from 'react';
import {useRequest} from 'ahooks';
import {apiGet, apiUrl} from '@/api';
import {DataItem} from '../../../mock/fake-api';
import {Select, Spin} from 'antd';
import {useAtom} from 'jotai';
import {selectedCountryAtom} from '@/atoms/selectedCountryAtom';

const DestinationSearch: React.FC = () =>
{
    const [options, setOptions] = useState<any>([]);
    const [, setSelectedCountryAtom] = useAtom(selectedCountryAtom);
    const {data, loading, run} = useRequest((search) => apiGet(`${apiUrl}?search=${search}`), {
        manual: true,
        debounceWait: 300
    });

    useEffect(() =>
    {
        if (Array.isArray(data) && !loading)
        {
            setOptions(data.map(el => ({label: el.name, value: el.name, ...el})));
        }
    }, [data]);

    const handleSearch = (text: string) =>
    {
        if (text)
        {
            run(text);
        }
    };

    const handleSelect = (_value: string, option: DataItem) => setSelectedCountryAtom(option);

    return <div className={'destination-search-container'}>
        <div className={'inner-container'}>
        <span className={'location'}>Location</span>
        <Select showSearch
                placeholder={'Search for a location...'}
                className={'destination-search'}
                defaultActiveFirstOption={false}
                options={options}
                suffixIcon={null}
                loading={loading}
                onSearch={handleSearch}
                onSelect={handleSelect}
                notFoundContent={loading ? <Spin size={'small'}/> : null}
        />
        </div>
    </div>
};

export default DestinationSearch;
