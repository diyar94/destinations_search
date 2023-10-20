import React, {useEffect, useState} from 'react';
import {useRequest} from 'ahooks';
import {apiGet, apiUrl} from '@/api';
import {notification, Select, Spin} from 'antd';
import {useAtom} from 'jotai';
import {selectedCountryAtom} from '@/atoms/selectedCountryAtom';
import {DataItem} from '@/types';

const DestinationSearch: React.FC = () =>
{
    const [options, setOptions] = useState<DataItem[]>(null);
    const [, setSelectedCountryAtom] = useAtom(selectedCountryAtom);
    const {data, loading, run} = useRequest((search) => apiGet(`${apiUrl}?search=${search}`), {
        manual: true,
        debounceWait: 300
    });

    useEffect(() =>
    {
        const ifDataIsArray = Array.isArray(data);

        if (ifDataIsArray && !loading)
        {
            if (data.length === 0)
            {
                notification.info({
                    placement: 'bottom',
                    message: 'Nothing found for given query'
                });
                return;
            }
            else
            {
                setOptions(data.map(el => ({label: el.name, value: el.name, ...el})));
            }
        }

    }, [data, loading]);
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
                    notFoundContent={loading && <div className={'loading'}><Spin size={'small'}/></div>}
            />
        </div>
    </div>;
};

export default DestinationSearch;
