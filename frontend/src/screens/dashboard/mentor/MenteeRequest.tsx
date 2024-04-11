import React, { useEffect } from 'react';

interface MenteeRequest {
  id: number;
  menteeName: string;
  requestDetails: string;
}

interface MenteeRequestCardProps {
  requests: MenteeRequest[];
  onRefresh: () => void;
}

const MenteeRequest: React.FC<MenteeRequestCardProps> = ({
  requests,
  onRefresh,
}) => {
  useEffect(() => {
    const interval = setInterval(
      () => {
        onRefresh(); // Fetch new data every 45 minutes
      },
      45 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [onRefresh]);

  return (
    <div>
      <h2>Mentee Requests</h2>
      {requests.map((request: any) => (
        <div key={request?.requestId} className='mentee-request-card'>
          <h3 className='text-black'>Mentee Request</h3>
          <p className='text-black'>Topic: {request?.topic ?? ''}</p>
          <p className='text-black'>Id: {request?.requestId}</p>
          <p className='text-black'>
            Description: {request?.description ?? ''}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MenteeRequest;
