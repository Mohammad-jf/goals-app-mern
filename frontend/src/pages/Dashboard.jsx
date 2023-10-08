import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GoalForm from '../components/GoalForm';
import { getGoals, reset } from '../features/goals/goalsSlice';
import Spinner from './../components/Spinner';
const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const { isLoading, goals, isError, message } = useSelector((state) => state.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login');
    }


    dispatch(getGoals());
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

    </>
  )
}

export default Dashboard