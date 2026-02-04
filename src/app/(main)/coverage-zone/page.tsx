import React from 'react'

import ListOfCoveredZone from '@/components/main/coverage-zone/ListOfCoveredZone'

function page() {
    return (
        <div className='min-h-screen bg-white py-8 md:py-16'>
            <ListOfCoveredZone />
        </div>
    )
}

export default page