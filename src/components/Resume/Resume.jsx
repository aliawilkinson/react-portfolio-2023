import React from 'react'
import { Document, Page } from 'react-pdf'
import Resume from '../../assets/Resume.pdf'

const Resume = () => {
    return (
        <div className='main-container'>
            <Document file={Resume}>
                <Page pageNumber={1} />
            </Document>
        </div>
    )
}