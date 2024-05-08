import ReactTimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function TimeAgo({ date, ...props }) {
    const [validDate, setValidDate] = useState(false);

    useEffect(() => {
        if (date) {
            try {
                const parsedDate = new Date(date);
                if (parsedDate.toString() === 'Invalid Date') {
                    throw new Error('Invalid Date');
                }
                setValidDate(parsedDate);
            } catch (error) {
                setValidDate(false);
            }
        }
    }, [date]);

    return (
        validDate ? (<ReactTimeAgo date={validDate} {...props} />) : date
    );
}

TimeAgo.propTypes = {
    date: PropTypes.string.isRequired,
};

export default TimeAgo;