import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

function MetaTags({title, description, children}) {
    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description}/>}
            {children}
        </Helmet>
    );
}

MetaTags.defaultProps = {
    title: undefined,
    description: undefined,
    children: null,
};
MetaTags.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
};

export default memo(MetaTags);
