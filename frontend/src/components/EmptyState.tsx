import React, { FC, ReactElement } from 'react';

interface EmptyStateProps {
    title: string,
    subTitle: string,
    submitButton: JSX.Element,
}

const EmptyState: FC<EmptyStateProps> = ({ title, subTitle, submitButton }): ReactElement => {
    return (
        <div className="text-center">
            <h4>{title}</h4>
            <h5>{subTitle}</h5>
            {submitButton}
            <img className="d-block m-auto" height="300" src="/images/empty.svg" alt="empty" />
        </div>
    );
};

export default EmptyState;