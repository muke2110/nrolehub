// import React, { useState } from 'react';
// import { Award, Download, IndianRupee, Users, CheckCircle } from 'lucide-react';
// import { useAuth } from '../../../contexts/AuthContext';
// import { useRegistration } from '../../../lib/hooks/useRegistration';
// import { useWinners } from '../../../lib/hooks/useWinners';
// import { formatCurrency } from '../../../lib/utils';
// import WinnersModal from '../../shared/Modal/WinnersModal';
// import LoadingSpinner from '../../shared/LoadingSpinner';

// function SubEventCard({ subevent, eventId, onUpdate }) {
//   const { user } = useAuth();
//   const { handleRegistration, registering, isRegistered, loading } = useRegistration(eventId, subevent.id);
//   const { winners } = useWinners(eventId, subevent.id);
//   const [showWinners, setShowWinners] = useState(false);

//   const handleRegister = () => {
//     handleRegistration({
//       student_id: user.id,
//       student_name: user.username,
//       student_email: user.email,
//       event_id: eventId,
//       subevent_id: subevent.id,
//       event_name: subevent.title,
//       fee: subevent.fee
//     }, onUpdate);
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <>
//       <div className="glass-card">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h3 className="text-xl font-bold">{subevent.title}</h3>
//             <p className="text-gray-600 dark:text-gray-300 mt-1">{subevent.description}</p>
//             <div className="flex items-center space-x-4 mt-2">
//               <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
//                 <Users className="h-4 w-4 text-primary" />
//                 <span>{subevent.participants_count || 0} participants</span>
//               </div>
//               <div className="flex items-center space-x-1 text-primary font-bold">
//                 <span>{formatCurrency(subevent.fee)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {isRegistered ? (
//           <div className="flex space-x-3">
//             <button 
//               onClick={() => setShowWinners(true)}
//               className="btn btn-secondary flex-1"
//             >
//               <Award className="h-4 w-4 mr-2" />
//               View Leaderboard
//             </button>
            
//           </div>
//         ) : (
//           <button
//             onClick={handleRegister}
//             disabled={registering || isRegistered}
//             className={`btn w-full ${isRegistered ? 'btn-success' : 'btn-primary'}`}
//           >
//             {isRegistered ? (
//               <div className="flex items-center justify-center">
//                 <CheckCircle className="h-4 w-4 mr-2" />
//                 Registered
//               </div>
//             ) : registering ? (
//               'Processing...'
//             ) : (
//               'Register Now'
//             )}
//           </button>
//         )}
//       </div>

//       <WinnersModal 
//         isOpen={showWinners}
//         onClose={() => setShowWinners(false)}
//         winners={winners}
//         subEventId={subevent.id}
//       />
//     </>
//   );
// }

// export default SubEventCard;
import React, { useState } from 'react';
import { Award, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRegistration } from '../../../lib/hooks/useRegistration';
import { useWinners } from '../../../lib/hooks/useWinners';
import { formatCurrency } from '../../../lib/utils';
import WinnersModal from '../../shared/Modal/WinnersModal';
import LoadingSpinner from '../../shared/LoadingSpinner';

function SubEventCard({ subevent, eventId, onUpdate }) {
  const { user } = useAuth();
  const { handleRegistration, registering, isRegistered, loading } = useRegistration(eventId, subevent.id);
  const { winners } = useWinners(eventId, subevent.id);
  const [showWinners, setShowWinners] = useState(false);

  const handleRegister = () => {
    handleRegistration(
      {
        student_id: user.id,
        student_name: user.username,
        student_email: user.email,
        event_id: eventId,
        subevent_id: subevent.id,
        event_name: subevent.title,
        fee: subevent.fee,
      },
      onUpdate
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="glass-card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{subevent.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{subevent.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4 text-primary" />
                <span>{subevent.participants_count || 0} participants</span>
              </div>
              <div className="flex items-center space-x-1 text-primary font-bold">
                <span>{formatCurrency(subevent.fee)}</span>
              </div>
            </div>
          </div>
        </div>

        {isRegistered ? (
          <button
            disabled
            className="btn w-full btn-success"
          >
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Registered
            </div>
          </button>
        ) : (
          <button
            onClick={handleRegister}
            disabled={registering}
            className="btn w-full btn-primary"
          >
            {registering ? 'Processing...' : 'Register Now'}
          </button>
        )}

        <div className="flex space-x-3 mt-4">
          <button 
            onClick={() => setShowWinners(true)} 
            className="btn btn-secondary flex-1"
          >
            <Award className="h-4 w-4 mr-2" />
            View Leaderboard
          </button>
        </div>
      </div>

      <WinnersModal
        isOpen={showWinners}
        onClose={() => setShowWinners(false)}
        winners={winners}
        subEventId={subevent.id}
      />
    </>
  );
}

export default SubEventCard;
