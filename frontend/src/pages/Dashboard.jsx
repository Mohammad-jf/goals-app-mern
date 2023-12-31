import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GoalForm from '../components/GoalForm';
import { getGoals, reset } from '../features/goals/goalsSlice';
import Spinner from './../components/Spinner';
import GoalItem from './../components/GoalItem';




const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const { isLoading, goals, isError, message } = useSelector((state) => state.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getGoals());
    }

    if (isError) {
      console.log(message);
    }


    return () => {
      dispatch(reset());
    }

  }, [user, navigate, dispatch, isError, message])




  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Wellcome {user && user.name}</h1>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => <GoalItem key={goal._id} goal={goal} />
            )}
          </div>
        ) : (<h3>you have not set any goals</h3>)}
      </section>

    </>
  )
}

export default Dashboard