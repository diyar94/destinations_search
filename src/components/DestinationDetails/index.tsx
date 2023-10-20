import {DataItem} from '@/types';
import React from 'react';

type DestinationDetailsPropsType = {
    country: DataItem;
}
export const DestinationDetails: React.FC<DestinationDetailsPropsType> = ({country}) =>
    <div className={'destination-details'}>
        <div className={'name'}>{country.name}</div>
        <div>{country.description}</div>
        <div><span className={'bold-font'}>Country:</span> {country.country}</div>
        <div><span className={'bold-font'}>Climate:</span> {country.climate}</div>
        <div><span className={'bold-font'}>Currency: </span> {country.currency}</div>
    </div>;

