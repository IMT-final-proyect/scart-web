import React from 'react';

import ReportTable from './components/reportsTable';
import Filters from './components/filters';

const resources = [
    {
        'id':'1',
        'name':'Gonzalo Martinez',
        'contractor': 'Contratista 1',
        'type': 'Conductor'
    },
    {
        'id':'2',
        'name':'Wenceslao Mateos',
        'contractor': 'Contratista 2',
        'type': 'Conductor'
    },
    {
        'id':'3',
        'name':'Fiat 600',
        'contractor': 'Contratista 3',
        'type': 'Vehiculo'
    },
    {
        'id':'4',
        'name':'Ferrari SF21',
        'contractor': 'Contratista 4',
        'type': 'Vehiculo'
    },
]
const Reports = () => {

    return (
        <>
            <Filters/>
            <ReportTable resources={resources}/>
        </>
    )
}

export default Reports