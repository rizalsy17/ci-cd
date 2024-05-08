import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import TimeAgo from '../../src/components/common/TimeAgo';

const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
const invalidDate = 'invalid date';

describe('TimeAgo component', () => {
    it('should render time ago', () => {
        const { getByText } = render(<TimeAgo date={threeHoursAgo} />);
        expect(getByText('3 hours ago')).toBeInTheDocument();
    });

    it('should render date from props if date is invalid', () => {
        const { getByText } = render(<TimeAgo date={invalidDate} />);
        expect(getByText(invalidDate)).toBeInTheDocument();
    });
});