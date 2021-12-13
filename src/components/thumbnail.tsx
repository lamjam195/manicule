import React from 'react'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip, Button, Glyphicon } from 'react-bootstrap'

import { EditionName, Page } from '../utils/metadata'
import { getImageUrl } from './page-image'
import styles from '../styles/Thumbnail.module.css'
import { EditionContext } from '../containers/SiteContainer'

interface ThumbnailProps {
    pageData: Page
    page: number
}
const Thumbnail = ({ pageData, page }: ThumbnailProps) => {
    const { index, color, signatures, category } = pageData
    const edition = React.useContext(EditionContext).edition as EditionName
    const pos = index % 2 === 0 ? 'recto' : 'verso'
    const img = getImageUrl(edition, index, true)

    const cls = `${styles.navThumbnail} thumbnail-${index} ${pos} ${
        index === page || index === page + 1 ? styles.isCurrent : ''
    }`
    const tour = pageData.tourItem

    const tourLabel = tour ? (
        <label className={`metadata-label tour-label has-tour ${styles.hasTour}`}>
            <span style={{ color: `${color}` }}>
                <Glyphicon glyph="bookmark" className={styles.bookmark} />
            </span>
        </label>
    ) : null

    return (
        <div className={cls} style={{ borderBottom: `10px solid ${color}` }}>
            <OverlayTrigger
                key={pageData.index}
                placement="top"
                overlay={
                    <Tooltip id={index as unknown as string}>
                        {signatures} - {category}
                    </Tooltip>
                }>
                <Link to={`/reader/${edition}/${index}`}>
                    <Button
                        id={`page-${index}`}
                        bsClass={styles.thumbnailImage}
                        style={{ backgroundImage: `url(${img})` }}></Button>
                    {tourLabel}
                </Link>
            </OverlayTrigger>
        </div>
    )
}

export default Thumbnail
