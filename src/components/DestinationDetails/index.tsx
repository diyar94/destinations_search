import {DataItem} from '@/types';

export const DestinationDetails = ({country}: { country: DataItem }) => <div className={'destination-details'}>
    <div className={'name'}>{country.name}</div>
    <div>{country.description}</div>
    <div><span className={'bold-font'}>Country:</span> {country.country}</div>
    <div><span className={'bold-font'}>Climate:</span> {country.climate}</div>
    <div><span className={'bold-font'}>Currency: </span> {country.currency}</div>
</div>;

